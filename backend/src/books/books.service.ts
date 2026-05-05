import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { QueryBooksDto } from './dto/query-books.dto';
import { CreateBookDto } from './dto/create-book.dto';

const bookInclude = {
  author: true,
  publisher: true,
  inventory: true,
  images: { orderBy: { sortOrder: 'asc' as const } },
  categories: { include: { category: true } },
  tags: { include: { tag: true } },
} satisfies Prisma.BookInclude;

type BookRow = Prisma.BookGetPayload<{ include: typeof bookInclude }>;

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  private static readonly DEFAULT_AUTHOR_NAME = 'Unknown';

  private async findOrCreateAuthorId(name?: string | null) {
    const normalized = name?.trim()
    if (!normalized) return this.ensureDefaultAuthorId()

    const author = await this.prisma.author.upsert({
      where: { name: normalized },
      update: {},
      create: { name: normalized },
      select: { id: true },
    })

    return author.id
  }

  private async findOrCreatePublisherId(name?: string | null) {
    const normalized = name?.trim()
    if (!normalized) return null

    const publisher = await this.prisma.publisher.upsert({
      where: { name: normalized },
      update: {},
      create: { name: normalized },
      select: { id: true },
    })

    return publisher.id
  }

  private async ensureDefaultAuthorId() {
    const existing = await this.prisma.author.findFirst({
      orderBy: { id: 'asc' },
      select: { id: true },
    });
    if (existing) return existing.id;

    const author = await this.prisma.author.upsert({
      where: { name: BooksService.DEFAULT_AUTHOR_NAME },
      update: {},
      create: { name: BooksService.DEFAULT_AUTHOR_NAME },
      select: { id: true },
    });
    return author.id;
  }

  private async assertCategoriesExist(ids: number[]) {
    if (!ids?.length) return;

    const rows = await this.prisma.category.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });
    const existingIds = new Set(rows.map((r) => r.id));
    const missing = ids.filter((id) => !existingIds.has(id));
    if (missing.length) {
      throw new BadRequestException(`Danh mục không tồn tại: ${missing.join(', ')}`);
    }
  }

  private mapPrismaError(error: unknown): Error {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const targets = Array.isArray((error.meta as any)?.target)
          ? ((error.meta as any).target as string[])
          : [];
        if (targets.includes('sku')) {
          return new BadRequestException('SKU đã tồn tại') as any;
        }
        return new BadRequestException('Dữ liệu bị trùng (unique constraint)') as any;
      }

      if (error.code === 'P2025') {
        return new BadRequestException('Dữ liệu liên kết không tồn tại (author/category)') as any;
      }

      if (error.code === 'P2003') {
        return new BadRequestException(
          'Không thể xóa sản phẩm vì còn dữ liệu liên quan (giỏ hàng, đơn hàng, đánh giá hoặc wishlist).',
        ) as any;
      }
    }

    return error instanceof Error ? error : new Error('Internal server error');
  }

  async findPage(dto: QueryBooksDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 12;
    const skip = (page - 1) * limit;

    const where: Prisma.BookWhereInput = { isActive: true };
    if (dto.q?.trim()) {
      const q = dto.q.trim();
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { sku: { contains: q, mode: 'insensitive' } },
      ];
    }
    if (dto.categorySlug?.trim()) {
      where.categories = { some: { category: { slug: dto.categorySlug.trim() } } };
    }

    if (dto.minPrice !== undefined || dto.maxPrice !== undefined) {
      where.price = {};
      if (dto.minPrice !== undefined) (where.price as any).gte = dto.minPrice;
      if (dto.maxPrice !== undefined) (where.price as any).lte = dto.maxPrice;
    }

    let orderBy: Prisma.BookOrderByWithRelationInput = { createdAt: 'desc' };
    if (dto.sort === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (dto.sort === 'price_desc') {
      orderBy = { price: 'desc' };
    } else if (dto.sort === 'best_seller') {
      orderBy = { reviewCount: 'desc' };
    }

    const [total, rows] = await this.prisma.$transaction([
      this.prisma.book.count({ where }),
      this.prisma.book.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: bookInclude,
      }),
    ]);

    return {
      data: rows.map((b) => this.serialize(b)),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findBySlug(slug: string) {
    const book = await this.prisma.book.findFirst({
      where: { slug, isActive: true },
      include: bookInclude,
    });
    if (!book) throw new NotFoundException('Book not found');
    return this.serialize(book);
  }

  private serialize(book: BookRow) {
    return {
      id: book.id,
      sku: book.sku,
      slug: book.slug,
      title: book.title,
      author: book.author.name,
      price: book.price.toNumber(),
      compareAtPrice: book.compareAtPrice?.toNumber() ?? null,
      imageUrl: book.imageUrl,
      description: book.description,
      longDescription: book.longDescription,
      stock: Math.max(0, (book.inventory?.stock ?? 0) - (book.inventory?.reserved ?? 0)),
      format: book.format,
      publisher: book.publisher?.name ?? null,
      language: book.language,
      pageCount: book.pageCount,
      isbn10: book.isbn10,
      dimensions: book.dimensions,
      ratingAvg: book.ratingAvg?.toNumber() ?? null,
      reviewCount: book.reviewCount,
      images: book.images.map((i) => ({ id: i.id, url: i.url, sortOrder: i.sortOrder })),
      categories: book.categories.map((c) => ({ id: c.category.id, name: c.category.name, slug: c.category.slug })),
      tags: book.tags.map((t) => ({ id: t.tag.id, name: t.tag.name, slug: t.tag.slug })),
    };
  }

  async create(dto: CreateBookDto) {
    const slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const authorId = dto.authorId ?? (await this.findOrCreateAuthorId(dto.authorName));
    const publisherId = await this.findOrCreatePublisherId(dto.publisherName);

    await this.assertCategoriesExist(dto.categoryIds ?? []);

    const data: Prisma.BookCreateInput = {
      title: dto.title,
      sku: dto.sku,
      slug: slug,
      price: dto.price,
      description: dto.description || '',
      format: 'Paperback',
      imageUrl: dto.imageUrl || '',
      author: { connect: { id: authorId } },
      inventory: { create: { stock: dto.stock } },
    };

    if (publisherId) {
      data.publisher = { connect: { id: publisherId } };
    }

    if (dto.categoryIds && dto.categoryIds.length > 0) {
      data.categories = {
        create: dto.categoryIds.map((id) => ({
          category: { connect: { id } },
        })),
      }
    }

    let book: BookRow;
    try {
      book = await this.prisma.book.create({
        data,
        include: bookInclude,
      });
    } catch (error) {
      throw this.mapPrismaError(error);
    }
    
    return this.serialize(book);
  }

  async update(id: number, dto: any) {
    const data: Prisma.BookUpdateInput = {
      title: dto.title,
      sku: dto.sku,
      price: dto.price,
      description: dto.description,
      imageUrl: dto.imageUrl,
    };

    if (dto.stock !== undefined) {
      data.inventory = {
        update: { stock: dto.stock },
      }
    }

    if (dto.authorName !== undefined) {
      const authorId = await this.findOrCreateAuthorId(dto.authorName)
      data.author = { connect: { id: authorId } }
    }

    if (dto.publisherName !== undefined) {
      const publisherId = await this.findOrCreatePublisherId(dto.publisherName)
      data.publisher = publisherId ? { connect: { id: publisherId } } : { disconnect: true }
    }

    if (dto.categoryIds) {
      await this.assertCategoriesExist(dto.categoryIds);
      data.categories = {
        deleteMany: {},
        create: dto.categoryIds.map((id: number) => ({
          category: { connect: { id } },
        })),
      };
    }

    try {
      const book = await this.prisma.book.update({
        where: { id },
        data,
        include: bookInclude,
      });
      return this.serialize(book);
    } catch (error) {
      throw this.mapPrismaError(error);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.book.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      throw this.mapPrismaError(error);
    }
  }

  async findById(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: bookInclude,
    });
    if (!book) throw new NotFoundException('Book not found');
    return this.serialize(book);
  }
}

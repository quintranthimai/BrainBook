import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const slug = createCategoryDto.slug || createCategoryDto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const category = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        slug: slug,
        // Prisma schema for Category: id, name, slug, createdAt, books.
        // It doesn't have image and description in the database schema!
        // We'll ignore them for now.
      }
    });

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      productCount: 0,
      isActive: true,
    };
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: {
        _count: {
          select: { books: true }
        }
      }
    });

    return categories.map(c => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      productCount: c._count.books,
      isActive: true, // Mock property if not present in schema
    }));
  }

  async findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: CreateCategoryDto) {
    const slug = dto.slug || dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return this.prisma.category.update({
      where: { id },
      data: {
        name: dto.name,
        slug,
      }
    });
  }

  async remove(id: number) {
    return this.prisma.category.delete({
      where: { id }
    });
  }
}

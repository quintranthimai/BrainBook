import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import axios from 'axios'
import { PrismaService } from '../prisma/prisma.service'
import { CloudinaryService } from '../cloudinary/cloudinary.service'

@Injectable()
export class BookImportService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async importByISBN(isbn: string) {
    const normalizedIsbn = isbn.trim()
    if (!normalizedIsbn) throw new BadRequestException('ISBN is required')

    const sku = `SKU-${normalizedIsbn}`
    const existing = await this.prisma.book.findUnique({ where: { sku } })
    if (existing) throw new BadRequestException('Book already exists')

    // 🔥 1. Lấy data
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${normalizedIsbn}&format=json&jscmd=data`
    const res = await axios.get(url)

    const data = res.data[`ISBN:${normalizedIsbn}`]

    if (!data) {
      throw new NotFoundException('Không tìm thấy sách')
    }

    // 🔥 2. Parse dữ liệu
    const title = data.title
    const author = data.authors?.[0]?.name || 'Unknown'
    const description =
      typeof data.notes === 'string'
        ? data.notes
        : data.notes?.value || ''

    const language = data.languages?.[0]?.key?.split('/').pop() || 'en'
    const publishDate = data.publish_date || ''
    const publisher = data.publishers?.[0]?.name || ''

    // 🔥 3. Ảnh
    const coverUrl = `https://covers.openlibrary.org/b/isbn/${normalizedIsbn}-L.jpg`

    let finalImageUrl = coverUrl
    let finalImagePublicId: string | undefined = undefined

    // If Cloudinary isn't configured (common in local/dev), fall back to using the public cover URL.
    if (this.cloudinary.isConfigured()) {
      const upload: any = await this.cloudinary.uploadFromUrl(coverUrl)
      finalImageUrl = upload.secure_url
      finalImagePublicId = upload.public_id
    }

    // 🔥 4. PRICE (USD)
    const price = this.generateUsdPrice()

    // 🔥 5. Tạo author nếu chưa có
    let authorRecord = await this.prisma.author.findUnique({
      where: { name: author },
    })

    if (!authorRecord) {
      authorRecord = await this.prisma.author.create({
        data: { name: author },
      })
    }

    // 🔥 6. Tạo publisher nếu chưa có
    let publisherRecord = null

    if (publisher) {
      publisherRecord = await this.prisma.publisher.upsert({
        where: { name: publisher },
        update: {},
        create: { name: publisher },
      })
    }

    // 🔥 7. Lưu book
    const baseSlug = this.slugify(title)
    const slug = `${baseSlug}-${normalizedIsbn}`
    const book = await this.prisma.book.create({
      data: {
        title,
        slug,
        price,
        imageUrl: finalImageUrl,
        imagePublicId: finalImagePublicId,
        description,
        language,
        authorId: authorRecord.id,
        publisherId: publisherRecord?.id,
        sku,
        format: 'Paperback',
        isbn10: normalizedIsbn.length === 10 ? normalizedIsbn : undefined,
      },
    })

    return book
  }

  generateUsdPrice() {
    const min = 5
    const max = 50
    const value = Math.random() * (max - min) + min
    return Number(value.toFixed(2))
  }

  slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
  }
}
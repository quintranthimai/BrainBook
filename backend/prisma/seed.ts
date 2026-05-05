import 'dotenv/config'

import { PrismaService } from '../src/prisma/prisma.service'
import { CloudinaryService } from '../src/cloudinary/cloudinary.service'
import { BookImportService } from '../src/books/book-import.service'

const prisma = new PrismaService()

async function main() {
  await prisma.$connect()

  const romance = await prisma.category.upsert({
    where: { slug: 'romance' },
    update: {},
    create: { name: 'Romance', slug: 'romance' },
  });
  const fiction = await prisma.category.upsert({
    where: { slug: 'fiction' },
    update: {},
    create: { name: 'Fiction', slug: 'fiction' },
  });

  const bestseller = await prisma.tag.upsert({
    where: { slug: 'bestseller' },
    update: {},
    create: { name: 'Bestseller', slug: 'bestseller' },
  });

  const laurenAsher = await prisma.author.upsert({
    where: { name: 'Lauren Asher' },
    update: {},
    create: { name: 'Lauren Asher' },
  });

  const piatkus = await prisma.publisher.upsert({
    where: { name: 'Piatkus Books' },
    update: {},
    create: { name: 'Piatkus Books' },
  });

  const cloudinary = new CloudinaryService()
  const importer = new BookImportService(prisma, cloudinary)

  const isbns = [
    '0349433441',
    '0385472579',
    '0143127799',
    '0062316095',
    '0307277674',
    '0061120081',
    '0062457713',
    '0140177396',
    '0140449132',
    '0142437204',
    '0143105981',
    '0307387895',
    '0307474275',
    '0307743659',
    '0374533555',
    '038549081X',
    '0399590501',
    '0439023521',
    '0446310786',
    '0446675539',
    '0451524934',
    '0486280616',
    '0525566157',
    '0553213113',
    '0553296981',
    '059035342X',
    '0618640150',
    '067973452X',
    '0743273567',
    '0747532699',
    '081298160X',
    '1400031702',
    '1451673310',
    '1501124021',
    '1524763136',
  ]

  const importedBooks = [] as { id: number }[]
  for (const isbn of isbns) {
    try {
      const book = await importer.importByISBN(isbn)
      importedBooks.push(book)
    } catch (e) {
      const status = (e as any)?.status ?? (e as any)?.response?.statusCode
      if (status === 404) continue

      const sku = `SKU-${isbn}`
      const existingBook = await prisma.book.findUnique({ where: { sku } })
      if (!existingBook) throw e
      importedBooks.push(existingBook)
    }

    if (importedBooks.length >= 20) break
  }

  if (importedBooks.length === 0) throw new Error('Seed failed: no books imported')

  for (let i = 0; i < importedBooks.length; i++) {
    const book = importedBooks[i]

    await prisma.book.update({
      where: { id: book.id },
      data: {
        categories: {
          connectOrCreate: [
            {
              where: {
                bookId_categoryId: { bookId: book.id, categoryId: romance.id },
              },
              create: { categoryId: romance.id },
            },
            {
              where: {
                bookId_categoryId: { bookId: book.id, categoryId: fiction.id },
              },
              create: { categoryId: fiction.id },
            },
          ],
        },
        tags: {
          connectOrCreate: [
            {
              where: { bookId_tagId: { bookId: book.id, tagId: bestseller.id } },
              create: { tagId: bestseller.id },
            },
          ],
        },
      },
    })

    const stock = 10 + i * 2
    await prisma.inventory.upsert({
      where: { bookId: book.id },
      update: { stock, reserved: 0 },
      create: { bookId: book.id, stock },
    })
  }

  await prisma.coupon.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      type: 'PERCENT',
      value: 10,
      minSubtotal: 20,
      maxUses: 1000,
      isActive: true,
    },
  });

  const bookIds = importedBooks.map((b) => b.id)
  const booksForImages = await prisma.book.findMany({
    where: { id: { in: bookIds } },
    select: { id: true, imageUrl: true },
  })

  await prisma.bookImage.deleteMany({ where: { bookId: { in: bookIds } } });
  await prisma.bookImage.createMany({
    data: booksForImages.flatMap((b) => [
      { bookId: b.id, url: b.imageUrl, sortOrder: 0 },
      { bookId: b.id, url: b.imageUrl, sortOrder: 1 },
    ]),
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

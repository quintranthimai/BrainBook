import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AddressesModule } from './addresses/addresses.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { CartModule } from './cart/cart.module';
import { ContactModule } from './contact/contact.module';
import { HealthController } from './health.controller';
import { JwtSharedModule } from './jwt/jwt-shared.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { CouponsModule } from './coupons/coupons.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'backend/.env'],
    }),
    JwtSharedModule,
    PrismaModule,
    AuthModule,
    BooksModule,
    CartModule,
    OrdersModule,
    ContactModule,
    AddressesModule,
    CloudinaryModule,
    CategoriesModule,
    PostsModule,
    UsersModule,
    ReviewsModule,
    WishlistModule,
    CouponsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}

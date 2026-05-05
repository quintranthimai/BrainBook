import { Controller, Get, Param, Query, Post, Body, Patch, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { BooksService } from './books.service';
import { QueryBooksDto } from './dto/query-books.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('books')
export class BooksController {
  constructor(private readonly books: BooksService) {}

  @Get()
  list(@Query() query: QueryBooksDto) {
    return this.books.findPage(query);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.books.findById(id);
  }

  @Get('slug/:slug')
  bySlug(@Param('slug') slug: string) {
    return this.books.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateBookDto) {
    return this.books.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    return this.books.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.books.remove(id);
  }
}

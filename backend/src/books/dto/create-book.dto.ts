import { IsString, IsNumber, IsOptional, Min, IsArray } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  sku: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsArray()
  @IsOptional()
  categoryIds?: number[];

  @IsNumber()
  @IsOptional()
  authorId?: number;

  @IsString()
  @IsOptional()
  authorName?: string;

  @IsString()
  @IsOptional()
  publisherName?: string;
}

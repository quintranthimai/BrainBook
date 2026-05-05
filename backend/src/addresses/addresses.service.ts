import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { updatedAt: 'desc' }],
    });
  }

  async create(userId: string, dto: CreateAddressDto) {
    if (dto.isDefault) await this.clearDefault(userId);
    return this.prisma.address.create({
      data: {
        userId,
        label: dto.label,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        countryCode: dto.countryCode,
        city: dto.city,
        addressLine1: dto.addressLine1,
        addressLine2: dto.addressLine2,
        isDefault: dto.isDefault ?? false,
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateAddressDto) {
    const existing = await this.prisma.address.findFirst({ where: { id, userId } });
    if (!existing) throw new NotFoundException();
    if (dto.isDefault) await this.clearDefault(userId);
    const data: Prisma.AddressUpdateInput = {};
    if (dto.label !== undefined) data.label = dto.label;
    if (dto.firstName !== undefined) data.firstName = dto.firstName;
    if (dto.lastName !== undefined) data.lastName = dto.lastName;
    if (dto.phone !== undefined) data.phone = dto.phone;
    if (dto.countryCode !== undefined) data.countryCode = dto.countryCode;
    if (dto.city !== undefined) data.city = dto.city;
    if (dto.addressLine1 !== undefined) data.addressLine1 = dto.addressLine1;
    if (dto.addressLine2 !== undefined) data.addressLine2 = dto.addressLine2;
    if (dto.isDefault !== undefined) data.isDefault = dto.isDefault;
    if (Object.keys(data).length === 0) return existing;
    return this.prisma.address.update({ where: { id }, data });
  }

  async remove(userId: string, id: string) {
    const existing = await this.prisma.address.findFirst({ where: { id, userId } });
    if (!existing) throw new NotFoundException();
    await this.prisma.address.delete({ where: { id } });
    return { deleted: true };
  }

  private async clearDefault(userId: string) {
    await this.prisma.address.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }
}

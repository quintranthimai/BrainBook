import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateRole(id: string, role: UserRole) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { role },
        select: { id: true, role: true },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async remove(id: string) {
    try {
      // Soft delete
      return await this.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './jwt.strategy';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private readonly googleClient = new OAuth2Client(
    '1016805497943-jffnkdsrck1k8vseu2sn03elq426i6fv.apps.googleusercontent.com',
    process.env.GOOGLE_CLIENT_SECRET,
  );

  async googleLogin(code: string) {
    try {
      const { tokens } = await this.googleClient.getToken({
        code,
        redirect_uri: 'postmessage',
      });
      const ticket = await this.googleClient.verifyIdToken({
        idToken: tokens.id_token!,
        audience: '1016805497943-jffnkdsrck1k8vseu2sn03elq426i6fv.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();
      if (!payload || !payload.email) throw new UnauthorizedException('Invalid Google token');

      let user = await this.prisma.user.findUnique({ where: { email: payload.email } });
      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email: payload.email,
            firstName: payload.given_name || '',
            lastName: payload.family_name || '',
            passwordHash: '',
          },
        });
      }

      await this.ensureUserCart(user.id);
      const tokensRes = await this.generateTokens(user.id, user.email, user.role);
      return { ...tokensRes, user };
    } catch (e) {
      throw new UnauthorizedException('Google authentication failed');
    }
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (existing) throw new ConflictException('Email already registered');
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        birthday: dto.birthday ? new Date(dto.birthday) : null,
        gender: dto.gender,
        newsletter: dto.newsletter ?? false,
      },
      select: { id: true, email: true, firstName: true, lastName: true, role: true },
    });
    await this.ensureUserCart(user.id);
    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return { ...tokens, user };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    await this.ensureUserCart(user.id);
    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async refresh(refreshToken: string) {
    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      if (tokenRecord) await this.prisma.refreshToken.delete({ where: { id: tokenRecord.id } });
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const tokens = await this.generateTokens(tokenRecord.userId, tokenRecord.user.email, tokenRecord.user.role);
    
    // Revoke old token
    await this.prisma.refreshToken.delete({ where: { id: tokenRecord.id } });

    return tokens;
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const accessToken = this.sign(userId, email, role);
    const refreshToken = crypto.randomBytes(64).toString('hex');
    
    // Store refresh token with 7 days expiry
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async profile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, firstName: true, lastName: true, phone: true, role: true, createdAt: true },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const firstName = dto.firstName?.trim() || null;
    const lastName = dto.lastName?.trim() || null;

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
      },
      select: { id: true, email: true, firstName: true, lastName: true, phone: true, role: true, createdAt: true },
    });

    return user;
  }

  private sign(sub: string, email: string, role: string) {
    const payload: JwtPayload = { sub, email, role };
    return this.jwt.sign(payload);
  }

  /** One cart row per user (schema: userId @unique). */
  private async ensureUserCart(userId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId, status: 'ACTIVE' },
      orderBy: { updatedAt: 'desc' },
    });
    if (!cart) {
      await this.prisma.cart.create({ data: { userId, status: 'ACTIVE' } });
    }
  }
}

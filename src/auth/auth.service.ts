import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Compare } from 'src/types/bcrypt-adapter';
import { UsersService } from 'src/users/users.service';
import { CustomError } from 'src/common/erros/custom-error';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('COMPARE') private readonly compare: Compare,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(payload: object): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verifyToken<T>(token: string): Promise<T> {
    try {
      return this.jwtService.verifyAsync(token) as T;
    } catch (error) {
      throw new CustomError('Invalid token', 401);
    }
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const token = await this.generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });
    return {
      ...user,
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    const isPasswordValid = await this.compare(
      loginDto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new CustomError('Invalid Credentials', 401);
    }
    const token = await this.generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token,
    };
  }

  async refreshToken(token: string) {
    const payload = await this.verifyToken<{ id: string }>(token);
    const user = await this.usersService.findOne(payload.id);
    const newToken = await this.generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: newToken,
    };
  }
}

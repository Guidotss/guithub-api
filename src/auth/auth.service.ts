import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Compare } from 'src/types/bcrypt-adapter';
import { UsersService } from 'src/users/users.service';
import { CustomError } from 'src/common/erros/custom-error';

@Injectable()
export class AuthService {
  constructor(
    @Inject('COMPARE') private readonly compare: Compare,
    private readonly usersService: UsersService,
  ) {}

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
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

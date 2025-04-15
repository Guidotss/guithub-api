import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { CustomError } from 'src/common/erros/custom-error';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private handleError(error: unknown, response: Response) {
    if (error instanceof CustomError) {
      return response
        .status(error.statusCode)
        .json({ ok: false, message: error.message });
    }
    return response
      .status(500)
      .json({ ok: false, message: 'Internal server error' });
  }

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.authService.register(createUserDto);
      return response
        .status(201)
        .json({ ok: true, message: 'User created successfully', result });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    try {
      const result = await this.authService.login(loginDto);
      return response
        .status(200)
        .json({ ok: true, message: 'Login successful', result });
    } catch (error) {
      return this.handleError(error, response);
    }
  }
}

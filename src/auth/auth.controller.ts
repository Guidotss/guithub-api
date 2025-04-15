import { Controller, Post, Body, Res, Req, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CustomError } from 'src/common/erros/custom-error';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  private handleError(error: unknown, response: Response) {
    if (error instanceof CustomError) {
      return response
        .status(error.statusCode)
        .json({ ok: false, message: error.message });
    }
    this.logger.error(error);
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

  @Post('refresh-token')
  @ApiBearerAuth('access-token')
  async refreshToken(@Req() request: Request, @Res() response: Response) {
    try {
      const authHeader = request.headers['authorization'];
      const refreshToken = authHeader?.split(' ')[1];

      if (!refreshToken) {
        throw new CustomError('Refresh token is required', 401);
      }
      const result = await this.authService.refreshToken(refreshToken);
      return response
        .status(200)
        .json({ ok: true, message: 'Token refreshed successfully', result });
    } catch (error) {
      return this.handleError(error, response);
    }
  }
}

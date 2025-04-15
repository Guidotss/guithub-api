import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Logger,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CustomError } from 'src/common/erros/custom-error';
import { Response } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  private handleError(error: unknown, response: Response) {
    if (error instanceof CustomError) {
      return response
        .status(error.statusCode)
        .json({ ok: false, message: error.message });
    } else {
      this.logger.error(error);
      return response
        .status(500)
        .json({ ok: false, message: 'Internal server error' });
    }
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.remove(id);
  }
}

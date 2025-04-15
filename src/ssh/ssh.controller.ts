import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SshKeysService } from './ssh.service';
import { CreateSshKeyDto } from './dto/create-ssh.dto';

@Controller('ssh')
export class SshController {
  constructor(private readonly sshKeysService: SshKeysService) {}

  @Post()
  create(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() createSshKeyDto: CreateSshKeyDto,
  ) {
    return this.sshKeysService.addKey(userId, createSshKeyDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sshKeysService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sshKeysService.remove(+id);
  }
}

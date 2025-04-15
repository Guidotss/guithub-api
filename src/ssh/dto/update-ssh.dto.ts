import { PartialType } from '@nestjs/swagger';
import { CreateSshKeyDto } from './create-ssh.dto';

export class UpdateSshDto extends PartialType(CreateSshKeyDto) {}

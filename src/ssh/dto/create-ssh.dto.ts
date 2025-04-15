import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSshKeyDto {
  @ApiProperty({
    description: 'The title of the SSH key',
    example: 'My SSH Key',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  title: string;

  @ApiProperty({
    description: 'The public key of the SSH key',
    example: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC1234567890',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  publicKey: string;
}

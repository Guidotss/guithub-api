import {
  Inject,
  Injectable,
  Logger,
  NotImplementedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { SshKey } from './entities/ssh.entity';
import { CreateSshKeyDto } from './dto/create-ssh.dto';
import { promises as fs } from 'fs';
import { envs } from 'src/config/envs';
import { CustomError } from 'src/common/erros/custom-error';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SshKeysService {
  private readonly AUTH_KEYS_PATH = envs.app.AUTH_KEYS_PATH;
  private readonly logger = new Logger(SshKeysService.name);

  constructor(
    @Inject('SSH_KEYS_REPOSITORY')
    private readonly keyRepo: Repository<SshKey>,
    private readonly userService: UsersService,
  ) {}

  async addKey(userId: string, dto: CreateSshKeyDto): Promise<SshKey> {
    const user = await this.userService.findOne(userId);
    if (!user) throw new CustomError('User not found', 404);

    const newKey = this.keyRepo.create({
      user,
      title: dto.title,
      publicKey: dto.publicKey.trim(),
      active: true,
    });

    await this.keyRepo.save(newKey);
    await this.syncAuthorizedKeys();
    return newKey;
  }

  private async syncAuthorizedKeys(): Promise<void> {
    const keys = await this.keyRepo.find({
      where: { active: true },
      relations: ['user'],
    });

    const content = keys
      .map((k) => {
        return `command=\"GIT_USER=${k.user.username} git-shell -c \"$SSH_ORIGINAL_COMMAND\"\",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty ${k.publicKey}`;
      })
      .join('\n');

    await fs.writeFile(this.AUTH_KEYS_PATH, content + '\n');
  }

  async remove(keyId: number): Promise<void> {
    this.logger.log(`Removing key ${keyId}`);
    throw new NotImplementedException();
  }

  async findOne(keyId: number): Promise<SshKey> {
    this.logger.log(`Finding key ${keyId}`);
    throw new NotImplementedException();
  }
}

import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Hash } from 'src/types/bcrypt-adapter';
import { CustomError } from 'src/common/erros/custom-error';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('HASHER')
    private readonly hasher: Hash,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.findByEmail(createUserDto.email);
    if (checkUser) {
      throw new CustomError('User already exists', 400);
    }
    const hashedPassword = await this.hasher(createUserDto.password);
    const user = this.userRepository.create({
      ...createUserDto,
      passwordHash: hashedPassword,
    });
    const newUser = await this.userRepository.save(user);
    return {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    return this.userRepository.delete(id);
  }
}

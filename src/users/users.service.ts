import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/interfaces/user.interface';
import { CreateUser } from '@/users/interfaces/create-user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
  }

  create(payload: CreateUser): Promise<User> {
    return this.userRepository.save(payload);
  }

  findByProviderId(providerId: string): Promise<User> {
    return this.userRepository.findOne({ where: { providerId } });
  }
}
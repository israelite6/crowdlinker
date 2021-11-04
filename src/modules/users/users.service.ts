import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/model/users.entity';
import { UsersRepository } from 'src/repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(users: UsersEntity) {
    this.usersRepository.create(users);
  }
}

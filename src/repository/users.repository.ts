import { UsersEntity } from 'src/model/users.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {}

import { injectable, inject } from 'tsyringe';
// import { instanceToInstance } from 'class-transformer';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import { instanceToInstance } from 'class-transformer';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    // let users = null;

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      // console.log('A query no banco foi feita!');

      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        instanceToInstance(users),
      );
    }

    return users;
  }
}

export default ListProvidersService;

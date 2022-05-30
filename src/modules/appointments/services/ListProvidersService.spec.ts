import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the profile', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Shirou Emiya',
      email: 'shirou@exemple.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Archer',
      email: 'archer@exemple.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Rin Tohsaka',
      email: 'rintohsaka@exemple.com',
      password: '123456',
    });

    const porviders = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(porviders).toEqual([user1, user2]);
  });
});

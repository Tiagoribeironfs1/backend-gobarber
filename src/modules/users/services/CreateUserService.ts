import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import HidePasswordUserService from './HidePasswordUserService';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: Request): Promise<Omit<User, 'password'>> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    const mappedUser = HidePasswordUserService.toDTO(user);

    return mappedUser;
  }
}

export default CreateUserService;

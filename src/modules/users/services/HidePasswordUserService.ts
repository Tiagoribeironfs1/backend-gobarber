import User from '@modules/users/infra/typeorm/entities/User';

class HidePasswordUserService {
  public static toDTO({
    id,
    name,
    email,
    avatar,
    created_at,
    updated_at,
  }: User): Omit<User, 'password'> {
    return {
      id: id,
      name: name,
      email: email,
      avatar: avatar,
      created_at: created_at,
      updated_at: updated_at,
    };
  }
}

export default HidePasswordUserService;

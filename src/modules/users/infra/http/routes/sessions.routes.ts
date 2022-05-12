import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import HidePasswordUserService from '@modules/users/services/HidePasswordUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const userDataSession = HidePasswordUserService.toDTO(user);
  return response.json({ userDataSession, token });
});

export default sessionsRouter;

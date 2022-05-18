import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe';

import UsersController from '../controllers/UsersController';
import UserAvatarControler from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);
const userscontroller = new UsersController();
const userAvatarControler = new UserAvatarControler();

usersRouter.post('/', userscontroller.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarControler.update,
);

export default usersRouter;

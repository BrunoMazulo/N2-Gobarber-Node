import { Router, request, response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated  from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {

  const { name, email, password } = request.body;

  // Instanciando a classe do service para utilizar os métodos lá de dentro
  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password
  });

  // Para deletar o password e não retornar no response. (Não vai deletar do banco e sim da variavel)
  delete user.password;

  return response.json(user);

});

// Usamos essa rota patch quando necessitamos atualizar apenas 1 campo, ex: avatar, senha, etc.
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response)=> {

  const updateUserAvatar =  new UpdateUserAvatarService();
  const user = await updateUserAvatar.execute({
    user_id: request.user.id,
    avatarFilename: request.file.filename,
  });

  delete user.password;

  return response.json(user);

});

export default usersRouter;

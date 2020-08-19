import { getRepository } from 'typeorm';
import User from '../models/user';
import uploadConfig from '../config/upload';
import path from 'path';
import fs from 'fs';
import AppError from '../errors/AppError';

interface Request{
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User>{

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user){
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if(user.avatar){
      // Deletar avatar anterior.

      // path.join une dois "caminhos", no caso a pasta do arquivo e o nome que vem do database
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath) // Deltar o arquivo com o path completo
      }
    }

    user.avatar = avatarFilename;
    await usersRepository.save(user); // Vai salvar as informações alteradas do usuario
    return user;

  }

}

export default UpdateUserAvatarService;

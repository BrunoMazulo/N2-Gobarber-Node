import User from '../models/user';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';

interface Request{
  name: string;
  email: string;
  password: string;
}

class CreateUserService {

  public async execute({ name, email, password }: Request): Promise<User>{

    // Atribuindo getRepository a var userRepository (Para usar os métodos do type Orm)
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email adress already used.');
    }

    const hashpassword = await hash(password, 8);

    const user = usersRepository.create({
       name,
       email,
       password: hashpassword,
    });

    await usersRepository.save(user);

    return user;
  }


}


export default CreateUserService;

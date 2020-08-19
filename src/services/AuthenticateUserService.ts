import { getRepository } from 'typeorm';
import User from '../models/user';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request{
  email: string;
  password: string;
}

interface ResponseDTO{
  user: User;
  token: String;
}

class AuthenticateUserService{

  public async execute({ email, password }: Request):Promise<ResponseDTO>{

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email }
    });

    if(!user){
      throw new AppError('Invalid email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new AppError('Invalid email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    // 48ce04134a63363036d0b8d9d0e329cc -> Chave de segurança gerada através de site que gera hash md5.
    // Essa informação de forma alguma pode ir para o front end.
    // Em seguida criaremos o middleware para verificar se o token foi gerado usando essa chave.
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    return { user, token }
  }

}

export default AuthenticateUserService;

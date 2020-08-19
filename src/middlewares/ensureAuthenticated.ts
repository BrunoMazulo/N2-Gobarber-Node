import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';


interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
  ):void {

    // Validação do token jwt
    const authHeader = request.headers.authorization;

    // Valida se o token existe
    if(!authHeader) {
      throw new AppError ('JWT token is missing', 401);
    }

    // Baerer asdjaklsdjkasjdl -> O token vem em uma array separado por espaço,
    // 1º a palavra Baerer depois o restante do token (ex: asdjaklsdjkasjdl)

    const [, token] = authHeader.split(' '); // Get o token (antes da virgula sería o type, mas como nao vamos utilizar pode deixar vazio)



    try{
      // Esse método verify, verifica se um token é valido ou não,
      // recebe o token e chave de segurança (Que foi criada no service)
      // verify retorna iat(Quando token foi gerado),exp(Quando expira), sub(Subject Quem gerou)
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded as TokenPayload; // Força decoded a ser do tupo TokenPayload (Interface)

      // Dessa forma, todas as rotas que utilizarem esse middleware, teremos a informação do usuario.
      // É só usar um request.user na rota que a informação do usuário será apresentada
      request.user = {
        id: sub
      }

      return next();

    } catch {
      throw new AppError('Invalid JWT token', 401);
    }



  }

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import './database';
import 'reflect-metadata';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();
app.use(express.json()); // Para aplicação entender formato Json nas requisições

// Ao acessar a rota /files/nomedoarquivo, o express irá buscar nesse diretório e servir a imagem
app.use('/files', express.static(uploadConfig.directory));
app.use(routes); // Está lendo a classe routes (index.ts que está na pasta ./routes)

// Rota para Global Exception Handler
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

  // Valida se foi um erro conhecido (Que foi gerado pela aplicação)
  if (err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  // Se ele não entrou no primeiro if, é um erro "desconhecido"/Inesperado.
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });

})


app.listen(3333, () => {
    console.log('Server started on port 3333');
});


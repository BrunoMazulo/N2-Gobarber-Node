// Dessa forma, definimos mais tipos para a biblioteca (No caso Express)
// Vamos sobrescrever uma tipagem do express em Request.
// Dessa forma é possível informar que o Request tem um user e o user tem um id
// Será utilizado para o middleware de autenticação

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    }
  }
}

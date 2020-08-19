class AppError {

  public readonly message: string;
  public readonly statusCode: number; // Readonly não deixa setar um valor a variavel.

  constructor(message: string, statusCode = 400){

    this.message = message;
    this.statusCode = statusCode;
  }

}

export default AppError;

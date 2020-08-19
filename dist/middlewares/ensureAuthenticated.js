"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
function ensureAuthenticated(request, response, next) {
    // Validação do token jwt
    var authHeader = request.headers.authorization;
    // Valida se o token existe
    if (!authHeader) {
        throw new Error('JWT token is missing');
    }
    // Baerer asdjaklsdjkasjdl -> O token vem em uma array separado por espaço,
    // 1º a palavra Baerer depois o restante do token (ex: asdjaklsdjkasjdl)
    var _a = authHeader.split(' '), token = _a[1]; // Get o token (antes da virgula sería o type, mas como nao vamos utilizar pode deixar vazio)
    try {
        // Esse método verify, verifica se um token é valido ou não,
        // recebe o token e chave de segurança (Que foi criada no service)
        // verify retorna iat(Quando token foi gerado),exp(Quando expira), sub(Subject Quem gerou)
        var decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        var sub = decoded.sub; // Força decoded a ser do tupo TokenPayload (Interface)
        // Dessa forma, todas as rotas que utilizarem esse middleware, teremos a informação do usuario.
        // É só usar um request.user na rota que a informação do usuário será apresentada
        request.user = {
            id: sub
        };
        return next();
    }
    catch (_b) {
        throw new Error('Invalid JWT token');
    }
}
exports.default = ensureAuthenticated;

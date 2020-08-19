"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
require("./database");
require("reflect-metadata");
var app = express_1.default();
app.use(express_1.default.json()); // Para aplicação entender formato Json nas requisições
app.use(routes_1.default); // Está lendo a classe routes (index.ts que está na pasta ./routes)
app.listen(3333, function () {
    console.log('Server started on port 3333');
});

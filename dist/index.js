"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const tweets_routes_1 = __importDefault(require("./routes/tweets.routes"));
const like_routes_1 = __importDefault(require("./routes/like.routes"));
const seguidores_routes_1 = __importDefault(require("./routes/seguidores.routes"));
const respostas_routes_1 = __importDefault(require("./routes/respostas.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/usuarios', (0, usuario_routes_1.default)());
app.use('/tweets', (0, tweets_routes_1.default)());
app.use('/likes', (0, like_routes_1.default)());
app.use('/seguidores', (0, seguidores_routes_1.default)());
app.use('/respostas', (0, respostas_routes_1.default)());
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}...`);
});

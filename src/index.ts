import express from 'express';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuario.routes';
import tweetsRoutes from './routes/tweets.routes';
import likeRoutes from './routes/like.routes';
import seguidoresRoutes from './routes/seguidores.routes';
import respostasRoutes from './routes/respostas.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/usuarios', usuarioRoutes());
app.use('/tweets', tweetsRoutes());
app.use('/likes', likeRoutes());
app.use('/seguidores', seguidoresRoutes());
app.use('/respostas', respostasRoutes());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}...`);
});

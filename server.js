import express from 'express';
import startServer from './libs/boot';
import appRoutes from './routes';
import injectMiddlewares from './libs/middlewares';

const server = express();

injectMiddlewares(server);
Routes(server);
startServer(server);

export default server;

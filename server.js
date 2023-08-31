import express from 'express';
import startServer from './libs/boot';
import Routes from './routes';
import injectMiddlewares from './libs/middlewares';

const server = express();

injectMiddlewares(server);
Routes(server);
startServer(server);

export default server;

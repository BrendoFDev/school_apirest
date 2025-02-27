/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

import './database'
import express from "express";
import {resolve} from 'path';

import alunoRoutes from './routes/aluno';
import userRoutes from './routes/user';
import tokenRoutes from './routes/token';
import fotosRoutes from './routes/foto';

class App {
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.urlencoded({ extended:true }));
    this.app.use( express.json() );
    this.app.use('/images/', express.static(resolve(__dirname,'..','uploads')));
  }

  routes(){
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/fotos/', fotosRoutes);
  }
}

export default new App().app;

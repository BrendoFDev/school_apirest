import dotenv from 'dotenv';
dotenv.config();

import './src/database/'
import express from "express";

import alunoRoutes from './src/routes/aluno';
import userRoutes from './src/routes/user';
import tokenRoutes from './src/routes/token';
import fotosRoutes from './src/routes/foto';

class App {
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.urlencoded({ extended:true }));
    this.app.use( express.json() );
  }

  routes(){
    this.app.use('/Alunos/', alunoRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/fotos/', fotosRoutes);
  }
}

export default new App().app;

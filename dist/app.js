"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable no-undef */
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

require('./database');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _path = require('path');

var _aluno = require('./routes/aluno'); var _aluno2 = _interopRequireDefault(_aluno);
var _user = require('./routes/user'); var _user2 = _interopRequireDefault(_user);
var _token = require('./routes/token'); var _token2 = _interopRequireDefault(_token);
var _foto = require('./routes/foto'); var _foto2 = _interopRequireDefault(_foto);

class App {
  constructor(){
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(_express2.default.urlencoded({ extended:true }));
    this.app.use( _express2.default.json() );
    this.app.use( _express2.default.static(_path.resolve.call(void 0, __dirname,'uploads')));
  }

  routes(){
    this.app.use('/Alunos/', _aluno2.default);
    this.app.use('/users/', _user2.default);
    this.app.use('/tokens/', _token2.default);
    this.app.use('/fotos/', _foto2.default);
  }
}

exports. default = new App().app;

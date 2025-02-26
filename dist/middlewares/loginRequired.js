"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable no-undef */
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

exports. default = (req, res, next) => {
  const {authorization} = req.headers;

  if(!authorization)
    return res.status(401).json({errors:['Login Required']});

  const [, token] = authorization.split(' ');

  try{
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const {id, email} = dados;

    if(!userExists(id,email)){
      console.log(error)
      return res.status(401).json({errors:['Invalid User']});
    }

    req.userId = id;
    req.useEmail = email;
    return next();

  }
  catch(error){
    console.log(error)
    return res.status(401).json({errors:['Token is expired or invalid']});
  }
}

const userExists = (id,email)=>{
  return _User2.default.findOne({
    where:
    {
      id,
      email
    }
  });
}

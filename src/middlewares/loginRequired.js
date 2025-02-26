/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import User from '../models/User';

import dotenv from 'dotenv';
dotenv.config();

export default (req, res, next) => {
  const {authorization} = req.headers;

  if(!authorization)
    return res.status(401).json({errors:['Login Required']});

  const [, token] = authorization.split(' ');

  try{
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
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
  return User.findOne({
    where:
    {
      id,
      email
    }
  });
}

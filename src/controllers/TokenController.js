/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';
dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET;
const tokenExpiration = process.env.TOKEN_EXPIRATION;

class TokenController{

  async getToken(req, res){
    const {id} = req.params;
    if(!id)
      return res.status(400).json({erros:'Id is missing'});

    if(!await User.findByPk(id))
      return res.status(400).json({erros:'User not found'});
    const token = this.createToken(id);

    res.json(token);
  }

  createToken(id){
    const token = jwt.sign({id}, tokenSecret,{
    expiresIn: tokenExpiration
  });
    return token;
  }


  async refreshToken(req, res){
    const {token} = req.body;
    if(!token)
      return res.status(400).json({erros:'token is missing in body'});

    const decoded = this.verifyToken(token);

    if(!decoded)
      return res.status(400).json({erros:'invalid token'});

    const newToken = this.createToken(decoded.id)
    res.json({token: newToken})
  }

  verifyToken(token){
    try {
      return jwt.verify(token, tokenSecret);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}

export default new TokenController;

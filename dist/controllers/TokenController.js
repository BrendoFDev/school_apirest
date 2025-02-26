"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable no-undef */
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

const tokenSecret = process.env.TOKEN_SECRET;
const tokenExpiration = process.env.TOKEN_EXPIRATION;

class TokenController {

  constructor(){
    this.Store = this.Store.bind(this);
  }

  async Store(req, res) {
    try {

      const {errors, user} = await this.processData(req.body);
      console.log(errors, user)
      if(errors.length > 0) return res.status(401).json({errors});

      const {id} = user;
      const token = this.createToken({id ,email: req.body.email});

      res.send({ token });

    }
    catch (error) {
      console.log(error);
      res.status(500).json({ errors: ["internal server error"] });
    }
  }

  async processData(body){

    const errors = [];
    const {email, password} = body;

    if (!email || !password)
    {
      errors.push("Invalid Credentials");
      return {errors, user: null}
    }
    const user = await _User2.default.findOne({ where: { email } });

    if (!user){
      errors.push("User not found");
      return {errors, user: null}
    }

    if (!await user.passwordIsValid(password))
      errors.push("Invalid password");

    return {errors, user};
  }

  createToken(data) {

    const token = _jsonwebtoken2.default.sign({ id: data.id, email: data.email }, tokenSecret, {
      expiresIn: tokenExpiration
    });

    return token;
  }
}

exports. default = new TokenController;

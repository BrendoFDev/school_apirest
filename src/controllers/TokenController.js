/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';
dotenv.config();

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
    const user = await User.findOne({ where: { email } });

    if (!user){
      errors.push("User not found");
      return {errors, user: null}
    }

    if (!await user.passwordIsValid(password))
      errors.push("Invalid password");

    return {errors, user};
  }

  createToken(data) {

    const token = jwt.sign({ id: data.id, email: data.email }, tokenSecret, {
      expiresIn: tokenExpiration
    });

    return token;
  }
}

export default new TokenController;

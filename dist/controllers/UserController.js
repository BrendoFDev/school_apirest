"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController{
  constructor(){
    this.create = this.create.bind(this);
    this.createUser = this.createUser.bind(this)
  }

  async create(req, res){
    try {
      const user = await this.createUser(req.body);
      return res.status(201).json({id:user.id, nome: user.nome, email:user.email});
    }
    catch (error) {
      return res.status(400).json({
        erros: error.errors.map((err)=> err.message)
      });
    }
  }

  async createUser(body){
    const newUser =  await _User2.default.create({
      nome: body.nome,
      email: body.email,
      password: body.password
    });

    return newUser;
  }

  async update(req, res){
    try{

      const { userId } = req;

      if(!userId)
        return res.status(400).json({erros: ['Id is missing']});

      const user = await _User2.default.findByPk(userId);

      if(!user)
        return res.status(400).json({erros: ['User Not Found']});

      const userUpdated = await user.update(req.body);

      return res.json(userUpdated);

    }
    catch(err){
      console.log(err);
      res.status(400).json(null)
    }
  }

  async delete(req,res){
    try{

      const { userId } = req;

      if(!userId)
        return res.status(400).json({erros: ['Id is missing']});

      const user = await _User2.default.findByPk(userId);

      if(!user)
        return res.status(400).json({erros: ['User Not Found']});

      const userDestroyed = await user.destroy();

      return res.json(userDestroyed);

    }
    catch(err){
      console.log(err);
      res.status(400).json(null)
    }
  }




// desativado
  async index(req, res){
    try{
      const users = await _User2.default.findAll({attributes:
        ["id","nome","email"]
      });
      return res.json(users);
    }
    catch(err){
      console.log(err);
      res.status(400).json(null)
    }
  }

  async show(req, res){
    try{
      const { id } = req.params;
      const users = await _User2.default.findByPk(id);
      if(!users)
        return res.status(204);

      const { nome, email} = users;
      return res.json({id, nome, email});
    }
    catch(err){
      console.log(err);
      res.status(400).json(null)
    }
  }
}

exports. default = new UserController;

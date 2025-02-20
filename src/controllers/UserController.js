import User from '../models/User'

class UserController{
  constructor(){
    this.create = this.create.bind(this);
    this.createUser = this.createUser.bind(this)
  }

  async create(req, res){
    try {
      const user = await this.createUser(req.body);
      return res.status(201).json(user);
    }
    catch (error) {
      return res.status(400).json({
        erros: error.errors.map((err)=> err.message)
      });
    }
  }

  async createUser(body){
    const newUser =  await User.create({
      nome: body.nome,
      email: body.email,
      password: body.password
    });

    return newUser;
  }


  async index(req, res){
    try{
      const users = await User.findAll();
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
      const users = await User.findByPk(id);
      if(!users)
        return res.status(204);

      return res.json(users);
    }
    catch(err){
      console.log(err);
      res.status(400).json(null)
    }
  }

  async update(req, res){
    try{

      const { id } = req.params;

      if(!id)
        return res.status(400).json({erros: ['Id is missing']});

      const user = await User.findByPk(id);

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

      const { id } = req.params;

      if(!id)
        return res.status(400).json({erros: ['Id is missing']});

      const user = await User.findByPk(id);

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

}

export default new UserController;

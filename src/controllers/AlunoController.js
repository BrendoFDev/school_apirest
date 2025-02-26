import Aluno from '../models/Aluno'
import Fotos from '../models/Foto';
class AlunoController{
  constructor(){
    this.create = this.create.bind(this);
  }


  async index(req, res){
    try{
      const alunos = await Aluno.findAll({
        attributes: ['id','nome','sobrenome','email','idade','peso','altura'],
        order: [['id','DESC'], [Fotos, 'id','DESC']],
        include:{
          model:Fotos,
          attributes:['filename','url']
        }
      });

      return res.json(alunos);
    }
    catch(error){
      console.log(error);
      res.status(500).json({errors: "Internal server error"});
    }
  }

  async show(req, res){
    try{

      const {id} = req.params;

      if(!id)
        return req.status(400).json({errors: 'Id is Invalid or not found'});

      const aluno = await Aluno.findByPk(id,{
        attributes: ['id','nome','sobrenome','email','idade','peso','altura'],
        order: [['id','DESC'], [Fotos, 'id','DESC']],
        include:{
          model:Fotos,
          attributes:['filename','url']
        }
      });
      return res.json(aluno);

    }
    catch(error){
      console.log(error);
      res.status(500).json({errors: "Internal server error"});
    }
  }

  async create(req, res){
    try {
      const aluno = await this.createAluno(req.body);
      return res.status(201).json(aluno);
    }
    catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async createAluno(body){
   const newAluno =  await Aluno.create({
      nome: body.nome,
      sobrenome: body.sobrenome,
      email: body.email,
      idade: body.idade,
      altura: body.altura,
      peso: body.peso,
    });

    return newAluno;
  }

  async update(req, res){
    try{
      const {id} = req.params;

      if(!id)
        return req.status(400).json({errors: 'Id is Invalid or not found'});

      const aluno = await Aluno.findByPk(id,{attributes:["id","nome","email"]});

      if(!aluno)
        return req.status(400).json({errors: 'Student not found'});

      const updatedAluno = await aluno.update(req.body);

      return res.json(updatedAluno);

    }
    catch(error){
      console.log(error);
      res.status(500).json({errors: "Internal server error"});
    }
  }

  async delete(req, res){
    try{
      const {id} = req.params;

      if(!id)
        return req.status(400).json({errors: 'Id is Invalid or not found'});

      const aluno = await Aluno.findByPk(id,{attributes:["id","nome","email"]});

      if(!aluno)
        return req.status(400).json({errors: 'Student not found'});

      const deletedAluno = await aluno.destroy();

      return res.json(deletedAluno);

    }
    catch(error){
      console.log(error);
      res.status(500).json({errors: "Internal server error"});
    }
  }


}


export default new AlunoController;

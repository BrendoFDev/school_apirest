"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);
class AlunoController{
  constructor(){
    this.create = this.create.bind(this);
  }


  async index(req, res){
    try{
      const alunos = await _Aluno2.default.findAll({
        attributes: ['id','nome','sobrenome','email','idade','peso','altura'],
        order: [['id','DESC'], [_Foto2.default, 'id','DESC']],
        include:{
          model:_Foto2.default,
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

      const aluno = await _Aluno2.default.findByPk(id,{
        attributes: ['id','nome','sobrenome','email','idade','peso','altura'],
        order: [['id','DESC'], [_Foto2.default, 'id','DESC']],
        include:{
          model:_Foto2.default,
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
   const newAluno =  await _Aluno2.default.create({
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

      const aluno = await _Aluno2.default.findByPk(id,{attributes:["id","nome","email"]});

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

      const aluno = await _Aluno2.default.findByPk(id,{attributes:["id","nome","email"]});

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


exports. default = new AlunoController;

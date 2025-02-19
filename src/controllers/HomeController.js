import Aluno from '../models/Aluno'

class HomeController{
  constructor(){
    this.index = this.index.bind(this);
    this.createAluno = this.createAluno.bind(this)
  }
  async index(req, res){
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
}

export default new HomeController;

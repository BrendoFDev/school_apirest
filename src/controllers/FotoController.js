import multer from 'multer';
import multerConfig from '../config/multerConfig';
const upload = multer(multerConfig).single('foto');

import Foto from '../models/Foto';


class FotoController {

  async Create(req, res) {
    try{
      await upload(req, res, async (error) => {

        if (error instanceof multer.MulterError) return res.status(400).json({ erros: [error.code] });
        else {
          const {originalname, filename} = req.file;
          const {aluno_id} = req.body

          const foto = await Foto.create({aluno_id,originalname, filename});
          return res.status(201).json(foto);
        }
      });
    }
    catch(error){
      console.log(error);
      res.status(400).json({
        error: ['Erro interno do servidor ou aluno não existe']
      });
    }
  }
}

export default new FotoController;

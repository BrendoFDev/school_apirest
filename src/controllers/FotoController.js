import multer from 'multer';
import multerConfig from '../config/multerConfig';
const upload = multer(multerConfig).single('foto');

import Foto from '../models/Foto';


class FotoController {

  async Create(req, res) {

    await upload(req, res, async (error) => {

      if (error instanceof multer.MulterError) return res.status(400).json({ erros: [error.code] });
      else {
        const {originalname, filename} = req.file;
        const {aluno_id} = req.body
        const foto = await Foto.create({aluno_id,originalname, filename})
        return res.status(201).json(foto);
      }
    });
  }

}

export default new FotoController;

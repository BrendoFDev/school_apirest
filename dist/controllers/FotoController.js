"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
const upload = _multer2.default.call(void 0, _multerConfig2.default).single('foto');

var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);


class FotoController {

  async Create(req, res) {
    try{
      await upload(req, res, async (error) => {

        if (error instanceof _multer2.default.MulterError) return res.status(400).json({ erros: [error.code] });
        else {
          const {originalname, filename} = req.file;
          const {aluno_id} = req.body

          const foto = await _Foto2.default.create({aluno_id,originalname, filename});
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

exports. default = new FotoController;

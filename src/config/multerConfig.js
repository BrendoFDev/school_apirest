/* eslint-disable no-undef */
import multer from "multer";
import {resolve, extname} from "path";

const randomIdentifier = ()=> Math.floor(Math.random() * 10000 + 10000);

export default{
  fileFilter: (req, file, cb)=>{
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg'){
      return cb(new multer.MulterError('Arquivo precisa ser png ou JPG'));
    }
    return cb(null, true)
  },
  storage: multer.diskStorage({

    destination: (req, file, cb)=> {
      cb(null, resolve(__dirname,'..','..','uploads','images'));
    },

    filename: (req, file, cb)=> {
      cb(null, `${Date.now()}_${randomIdentifier()}${extname(file.originalname)}`)
    },
  }),
};

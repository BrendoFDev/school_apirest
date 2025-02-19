import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
export default class User extends Model{
  static init(sequelize){
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len:{
            args:[3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail:{
            msg: 'Campo email inválido'
          }
        }
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password:{
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len:{
            args:[6,50],
            msg: 'A senha deve ter entre 6 a 50 caracteres',
          },
        },
      },
    },{
      sequelize
    });

    this.addHook('beforeSave',async (user)=>{
      if(user.password)
        user.password_hash = await bcrypt.hash(user.password, 8);
    });

    return this;
  }
}

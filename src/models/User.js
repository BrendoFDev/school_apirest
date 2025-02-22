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
            msg: 'Fild name should be between 3 and 255 characters'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique:{
          msg:'Email already exists',
        },
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

  passwordIsValid(password){
    return bcrypt.compare(password, this.password_hash);
  }
}

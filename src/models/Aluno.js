import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model{
  static init(sequelize){
    super.init({
      nome:{
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull:false,
        validate:{
          len:{
            args: [3,255],
            msg: 'Name should have between 3 and 255 characters'
          }
        }
      },
      sobrenome:{
        type: Sequelize.STRING,
        defaultValue:'',
        allowNull: false,
        validate:{
          len:{
            args: [3,255],
            msg: 'Surname should have between 3 and 255 characters'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
        validate:{
          isEmail:{
            msg:"Invalid Email"
          }
        }
      },
      idade: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          isInt:{
            msg: 'Age value is not integer'
          }
        }
      },
      peso:{
        type:Sequelize.FLOAT,
        allowNull:true,
        validate:{
          isFloat:{
            msg: 'Weigth value is not float'
          }
        }
      },
      altura: {
        type: Sequelize.FLOAT,
        allowNull: true,
        validate:
        {
          isFloat:{
            msg: 'Heigth value is not float'
          }
        }
      }
    },{
      sequelize
    });
    return this;
  }
}

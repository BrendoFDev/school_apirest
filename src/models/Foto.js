import Sequelize, { Model } from 'sequelize';
import urlConfig from '../config/urlConfig';

export default class Fotos extends Model{
  static init(sequelize){
    super.init({
      originalname:{
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull:false,
        validate:{
          notEmpty:{
            msg: 'Field cant be empty',
          }
        }
      },
      filename:{
        type: Sequelize.STRING,
        defaultValue:'',
        allowNull: false,
        validate:{
          notEmpty:{
            msg: 'Field cant be empty',
          }
        }
      },
      url:{
        type: Sequelize.VIRTUAL,
        get(){
          return `${urlConfig.url}/${this.getDataValue('filename')}`
        }
      }
    },{
      sequelize
    });
    return this;
  }

  static associate(models){
    this.belongsTo(models.Aluno,{
      foreignKey: 'aluno_id'
    });
  }
}

import Sequelize, { Model } from 'sequelize';

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

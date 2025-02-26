"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Aluno extends _sequelize.Model{
  static init(sequelize){
    super.init({
      nome:{
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
        allowNull:false,
        unique:true,
        validate:{
          isEmail:{
            msg:"Invalid Email"
          }
        }
      },
      idade: {
        type: _sequelize2.default.STRING,
        allowNull: false,
        validate:{
          isInt:{
            msg: 'Age value is not integer'
          }
        }
      },
      peso:{
        type:_sequelize2.default.FLOAT,
        allowNull:true,
        validate:{
          isFloat:{
            msg: 'Weigth value is not float'
          }
        }
      },
      altura: {
        type: _sequelize2.default.FLOAT,
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

  static associate(models){
    this.hasMany(models.Fotos,{
      foreignKey: 'aluno_id'
    });
  }
} exports.default = Aluno;

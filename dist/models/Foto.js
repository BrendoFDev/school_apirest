"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _urlConfig = require('../config/urlConfig'); var _urlConfig2 = _interopRequireDefault(_urlConfig);

 class Fotos extends _sequelize.Model{
  static init(sequelize){
    super.init({
      originalname:{
        type: _sequelize2.default.STRING,
        defaultValue: '',
        allowNull:false,
        validate:{
          notEmpty:{
            msg: 'Field cant be empty',
          }
        }
      },
      filename:{
        type: _sequelize2.default.STRING,
        defaultValue:'',
        allowNull: false,
        validate:{
          notEmpty:{
            msg: 'Field cant be empty',
          }
        }
      },
      url:{
        type: _sequelize2.default.VIRTUAL,
        get(){
          return `${_urlConfig2.default.url}/${this.getDataValue('filename')}`
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
} exports.default = Fotos;

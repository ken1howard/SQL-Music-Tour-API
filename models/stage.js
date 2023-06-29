'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event, StageEvent, SetTime }) {
      // define association here
      Stage.belongsToMany(Event, {
         foreignKey:'stage_id',
         as: 'events',
         through: StageEvent
        })
    Stage.hasMany(SetTime, {
        foreignKey: 'stage_id',
        as: 'set_times'
    })
      }
  }
  Stage.init({
    stage_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
    },
    name: {
    type: DataTypes.STRING(255),
    allowNull: false
    },
    manager: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Stage',
    tableName: 'stage',
    timestamps: false
  });
  return Stage;
};
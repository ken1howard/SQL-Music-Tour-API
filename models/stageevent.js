'use strict';
const {
  Model
} = require('sequelize');
const { all } = require('../controllers/band_controller');
module.exports = (sequelize, DataTypes) => {
  class StageEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StageEvent.init({
    stage_event_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
    },
    stage_id: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    event_id: {
    type: DataTypes.INTEGER,
    allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StageEvent',
    tableName: 'stage_events',
    allowNull: false

  });
  return StageEvent;
};
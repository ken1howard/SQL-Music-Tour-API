'use strict';
const {
  Model
} = require('sequelize');
const { all } = require('../controllers/band_controller');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
    name: { 
        type: DataTypes.STRING(96),
        allowNull: false
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    start_time: {
     type: DataTypes.DATE,
    allowNull: false
    },
    end_time: {
     type: DataTypes.DATE,
     allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false
  });
  return Event;
};
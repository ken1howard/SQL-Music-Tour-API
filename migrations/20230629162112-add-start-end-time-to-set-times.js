'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('set_times', 'meet_start_time', {
       type: DataTypes.TIME 
     }); 
     await queryInterface.addColumn('set_times', 'meet_end_time', {
      type: DataTypes.TIME 
   });
},
async down (queryInterface, Sequelize) {
  await queryInterface.removeColumn('set_times', 'meet_start_time');
  await queryInterface.removeColumn('set_times', 'meet_end_time');
 }
};
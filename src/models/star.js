'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    static associate(models) {
      // define association here
      Star.belongsTo(models.Galaxy);
      Star.belongsToMany(models.Planet, {
        through: 'StarsPlanets',
        foreignKey: 'StarId',
        include: [models.Planets]
      });
    }
  }
  Star.init({
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    GalaxyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Star',
  });
  return Star;
};

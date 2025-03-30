'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {
    static associate(models) {
      // define association here
      Planet.belongsToMany(models.Star, {
        through: 'StarsPlanets',
        foreignKey: 'PlanetId',
        include: [models.Star]
      });
    }
  }
  Planet.init({
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Planet',
  });
  return Planet;
};

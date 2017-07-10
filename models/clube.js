module.exports = function(sequelize, DataTypes) {

  return sequelize.define('clube', {
      nome: DataTypes.STRING
    }
  );

};

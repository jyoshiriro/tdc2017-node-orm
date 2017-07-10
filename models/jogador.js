module.exports = function(sequelize, DataTypes) {

  const Jogador = sequelize.define('jogador', {
      nome: {
        type: DataTypes.STRING
      },
      // foto: {
      //   type: DataTypes.BLOB
      // }
    }
  );

  Jogador.belongsTo(sequelize.models.clube, {foreignKey: 'id_clube'}); // sem definir o nome do campo, buscaria por "clubeId"

  return Jogador;

}

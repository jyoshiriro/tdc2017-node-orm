module.exports = function(sequelize, DataTypes) {

  const Jogador = sequelize.define('jogador', {
      nome: DataTypes.STRING,
      foto: DataTypes.BLOB,
    },
    {
      getterMethods: { // atributos 'transientes'
        clube() {
          if (this.id_clube ==null) {
            return 'Sem Clube';
          }
          return this.id_clube;
        }
      }
    }
  );

  Jogador.belongsTo(sequelize.models.clube, {foreignKey: 'id_clube'});
  // sem definir o nome do campo, buscaria por "clubeId"

  return Jogador;

}

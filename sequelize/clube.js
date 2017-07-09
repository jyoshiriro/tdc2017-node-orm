const Clube = sequelize.define('clube', {
  id: {
    type: Sequelize.INTEGER
  },
  nome: {
    type: Sequelize.STRING
  }
});

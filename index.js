const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:admin@localhost:3306/tdc2017',
  {
  define: {
    timestamps: false, // true por padrão. Exige campos "createdAt" e "updatedAt"
    freezeTableName: true // false por padrão. Nesse caso exige que os nomes das tabelas estejam no plural
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Clube = require('./models/clube.js')(sequelize, Sequelize);
const Jogador = require('./models/jogador.js')(sequelize, Sequelize);

Clube.findAll().then(clubes => {
  console.log(JSON.stringify(clubes));
});

Jogador.findAll().then(jogadores => {
  console.log(JSON.stringify(jogadores));
});

Jogador.findAll({
  where: {
    id_clube:1
  }
  })
  .then(jogadores => {
  console.log(JSON.stringify(jogadores));
});

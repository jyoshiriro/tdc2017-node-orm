var Sequelize = require('sequelize');

var opts = {
    define: {
        //prevent sequelize from pluralizing table names

    }
}

const sequelize = new Sequelize('mysql://root:admin@localhost:3306/tdc2017', {
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

const Clube = sequelize.define('clube', {
    nome: {
      type: Sequelize.STRING
    }
  }
);

Clube.findAll().then(clubes => {
  console.log(JSON.stringify(clubes));
});



const Jogador = sequelize.define('jogador', {
    nome: {
      type: Sequelize.STRING
    },
    foto: {
      type: Sequelize.BLOB
    }
  }
);

Jogador.belongsTo(Clube, {foreignKey: 'id_clube'}); // sem definir o nome do campo, buscaria por "clubeId"

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

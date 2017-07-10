const fs = require('fs');

const Sequelize = require('sequelize');

//const sequelize = new Sequelize('mysql://root:admin@localhost:3306/tdc2017',
const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/tdc2017',
  {
  define: {
    timestamps: false, // true por padrão. Exige campos "createdAt" e "updatedAt"
    freezeTableName: true // false por padrão. Nesse caso exige que os nomes das tabelas estejam no plural
  }
});

sequelize
  .authenticate()
  .catch(err => {
    console.error('Erro ao tentar conectar com o SGBD:', err);
  });

const Clube = require('./models/clube.js')(sequelize, Sequelize);
const Jogador = require('./models/jogador.js')(sequelize, Sequelize);

Clube.findAll()
  .then(clubes => {
    console.log("\n***Todos os Clubes:");
    for (var c in clubes) {
      var clube = clubes[c];
      console.log("Clube #"+clube.id+" - "+clube.nome);
    }
  }
);

Jogador.findAll()
  .then(jogadores => {
    console.log("\n***Todos os Jogadores:");
    for (var j in jogadores) {
      var jogador = jogadores[j];
      console.log("Jogador #"+jogador.id+" - "+jogador.nome+". Clube: "+jogador.clube);

      fs.writeFile('./fotos/'+jogador.nome+'.jpg', jogador.foto, (err) => {
        if (err) throw err;
      });

      if (jogador.id==2) {
        jogador.nome='ZE BUDUIA no PG $$!';
        jogador.save();
      }
    }
  }
);

Jogador.findAll({
    where: {
      id_clube:1
    }
  })
  .then(jogadores => {
    console.log("\n***Jogadores do clube 1:");
    for (var j in jogadores) {
      var jogador = jogadores[j];
      console.log("Jogador #"+jogador.id+" - "+jogador.nome);
    }
  }
);

Jogador.findAll({
    where: {
      id_clube:2,
      nome: {
        $like: 'JOAO%'
      }
    }
  })
  .then(jogadores => {
    console.log("\n***Jogadores do clube 2 e de nome 'JOAO%':");
    for (var j in jogadores) {
      var jogador = jogadores[j];
      console.log("Jogador #"+jogador.id+" - "+jogador.nome);
    }
  }
);

sequelize.query('SELECT * FROM jogador where id_clube=2', { model: Jogador })
  .then(jogadores => {
    console.log("\n***Jogadores do clube 2:");
    for (var j in jogadores) {
      var jogador = jogadores[j];
      console.log("Jogador #"+jogador.id+" - "+jogador.nome);
    }
  }
);

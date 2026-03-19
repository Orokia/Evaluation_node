const { Sequelize } = require("sequelize");

const DB_url = process.env.ENV === "DEV"
  ? process.env.DB_DEV
  : process.env.DB_PROD;

const sequelize = new Sequelize(DB_url, {
  dialect: 'mysql' // 🔥 AJOUT OBLIGATOIRE
});

async function connectionTodb(){
  try {
    await sequelize.authenticate();
    console.log('Connection OK 🚀');

    await sequelize.sync({ force: true });

  } catch (error) {
    console.error('Erreur DB:', error);
  }
}

module.exports = { connectionTodb, sequelize };
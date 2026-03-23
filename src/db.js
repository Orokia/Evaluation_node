const { Sequelize } = require("sequelize");

const DB_url = process.env.ENV === "DEV"
  ? process.env.DB_DEV
  : process.env.DB_PROD;

const sequelize = new Sequelize(DB_url, {
  dialect: 'mysql' 
});

async function connectionTodb(){
  try {
    await sequelize.authenticate();
    console.log('Connection OK ');

    // 🔥 AJOUT IMPORTANT
    await sequelize.sync({ alter: true });
    console.log("Tables synchronisées ✅");

  } catch (error) {
    console.error('Erreur DB:', error);
  }
}

module.exports = { connectionTodb, sequelize };
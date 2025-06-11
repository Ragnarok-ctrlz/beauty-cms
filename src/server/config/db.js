const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuration Sequelize pour MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME || 'beauty_cms',
  process.env.DB_USER || 'root', 
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: console.log, // Mettre à false en production
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test de connexion
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion MySQL établie avec succès.');
  } catch (error) {
    console.error('❌ Impossible de se connecter à MySQL:', error);
  }
}

module.exports = { sequelize, testConnection };
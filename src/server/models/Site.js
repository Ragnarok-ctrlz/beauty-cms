const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Site = sequelize.define('Site', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  tagline: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.JSON, // Stockage JSON pour l'adresse complète
    allowNull: true
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  theme: {
    type: DataTypes.STRING,
    defaultValue: 'elegant'
  },
  colors: {
    type: DataTypes.JSON, // Stockage JSON pour les couleurs
    allowNull: true
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  services: {
    type: DataTypes.JSON, // Temporaire, à remplacer par une table services
    allowNull: true
  },
  team: {
    type: DataTypes.JSON, // Temporaire, à remplacer par une table team
    allowNull: true
  },
  gallery: {
    type: DataTypes.JSON, // Temporaire, à remplacer par une table gallery
    allowNull: true
  },
  hours: {
    type: DataTypes.JSON, // Horaires d'ouverture
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'sites'
});

module.exports = Site;
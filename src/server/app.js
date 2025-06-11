const express = require('express');
const cors = require('cors');
const { sequelize, testConnection } = require('./config/db');
require('dotenv').config();

// Import des routes
const authRoutes = require('./routes/auth');
const siteRoutes = require('./routes/sites');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sites', siteRoutes);

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API Beauty CMS fonctionne !',
    timestamp: new Date().toISOString()
  });
});

// Initialisation de la base de données
async function initDatabase() {
  try {
    await testConnection();
    await sequelize.sync({ alter: true }); // Utiliser { force: true } pour recréer les tables
    console.log('✅ Base de données synchronisée');
  } catch (error) {
    console.error('❌ Erreur synchronisation base de données:', error);
  }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  await initDatabase();
});

module.exports = app;
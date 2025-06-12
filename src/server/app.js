import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, testConnection } from './config/db.js';

import authRoutes from './routes/auth.js';
import siteRoutes from './routes/sites.js';

dotenv.config();

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
    await sequelize.sync({ alter: true });
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

export default app;
export { app }; // Export de l'application pour les tests


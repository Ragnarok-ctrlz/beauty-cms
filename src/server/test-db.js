import { testConnection, sequelize } from './config/db.js';

async function testDB() {
  console.log('🔄 Test de connexion à MySQL...');

  const isConnected = await testConnection();

  if (isConnected) {
    console.log('✅ Connexion réussie !');

    // Test de synchronisation des modèles
    try {
      await sequelize.sync({ alter: true });
      console.log('✅ Modèles synchronisés !');
    } catch (error) {
      console.error('❌ Erreur synchronisation:', error);
    }
  } else {
    console.log('❌ Connexion échouée !');
  }

  process.exit(0);
}

testDB();

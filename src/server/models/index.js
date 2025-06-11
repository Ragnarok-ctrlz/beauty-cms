const User = require('./User');
const Site = require('./Site');

// Définir les relations
User.hasMany(Site, { foreignKey: 'ownerId', as: 'sites' });
Site.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

module.exports = {
  User,
  Site
};
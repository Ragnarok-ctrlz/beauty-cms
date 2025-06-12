import User from './User.js';
import Site from './Site.js';

// Définir les relations
User.hasMany(Site, { foreignKey: 'ownerId', as: 'sites' });
Site.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

export {
  User,
  Site
};

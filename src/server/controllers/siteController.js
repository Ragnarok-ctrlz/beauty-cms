const { Site, User } = require('../models');

const siteController = {
  // Créer un site
  async create(req, res) {
    try {
      const siteData = {
        ...req.body,
        ownerId: req.user.id,
        slug: req.body.name.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      };

      const site = await Site.create(siteData);

      res.status(201).json({
        success: true,
        message: 'Site créé avec succès',
        data: site
      });
    } catch (error) {
      console.error('Erreur création site:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la création du site'
      });
    }
  },

  // Récupérer les sites de l'utilisateur
  async getUserSites(req, res) {
    try {
      const sites = await Site.findAll({
        where: { ownerId: req.user.id },
        order: [['updatedAt', 'DESC']]
      });

      res.json({
        success: true,
        data: sites
      });
    } catch (error) {
      console.error('Erreur récupération sites:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des sites'
      });
    }
  },

  // Récupérer un site spécifique
  async getSite(req, res) {
    try {
      const { id } = req.params;
      const site = await Site.findOne({
        where: { 
          id, 
          ownerId: req.user.id 
        },
        include: [{
          model: User,
          as: 'owner',
          attributes: ['displayName', 'email']
        }]
      });

      if (!site) {
        return res.status(404).json({
          success: false,
          message: 'Site non trouvé'
        });
      }

      res.json({
        success: true,
        data: site
      });
    } catch (error) {
      console.error('Erreur récupération site:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération du site'
      });
    }
  },

  // Mettre à jour un site
  async update(req, res) {
    try {
      const { id } = req.params;
      const [updatedRowsCount] = await Site.update(req.body, {
        where: { 
          id, 
          ownerId: req.user.id 
        }
      });

      if (updatedRowsCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Site non trouvé'
        });
      }

      const updatedSite = await Site.findByPk(id);

      res.json({
        success: true,
        message: 'Site mis à jour avec succès',
        data: updatedSite
      });
    } catch (error) {
      console.error('Erreur mise à jour site:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour du site'
      });
    }
  }
};

module.exports = siteController;
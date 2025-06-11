const express = require('express');
const siteController = require('../controllers/siteController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Toutes les routes nécessitent une authentification
router.use(authMiddleware);

router.post('/', siteController.create);
router.get('/', siteController.getUserSites);
router.get('/:id', siteController.getSite);
router.put('/:id', siteController.update);

module.exports = router;
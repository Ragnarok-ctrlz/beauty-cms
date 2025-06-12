import express from 'express';
import siteController from '../controllers/siteController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Appliquer l’authentification sur toutes les routes
router.use(authMiddleware);

router.post('/', siteController.create);
router.get('/', siteController.getUserSites);
router.get('/:id', siteController.getSite);
router.put('/:id', siteController.update);

export default router;
router.delete('/:id', siteController.deleteSite);

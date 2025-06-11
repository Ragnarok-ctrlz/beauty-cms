import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Récupérer tous les produits
router.get('/', async (req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Ajouter un produit
router.post('/', async (req, res) => {
  const { name, price, description } = req.body;
  try {
    await pool.query(
      'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
      [name, price, description]
    );
    res.status(201).json({ message: "Produit ajouté !" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;

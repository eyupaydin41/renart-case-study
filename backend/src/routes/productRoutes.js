import express from 'express';
import { getProducts, getProductsByPopularity, getProductsByPrice } from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/popularity', getProductsByPopularity);
router.get('/products/price', getProductsByPrice);

export default router;

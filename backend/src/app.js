import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/api', productRoutes);

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});

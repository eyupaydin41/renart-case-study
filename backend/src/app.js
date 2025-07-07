import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use('/api', productRoutes);

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
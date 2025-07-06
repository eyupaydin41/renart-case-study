import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  const productsPath = path.join(__dirname, '../src/data/products.json');
  const productsRaw = fs.readFileSync(productsPath, 'utf-8');
  const products = JSON.parse(productsRaw);

  await prisma.product.deleteMany();
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        popularityScore: product.popularityScore,
        weight: product.weight,
        images: product.images,
      },
    });
  }
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findAll = () => {
  return prisma.product.findMany();
};

export const findByPopularityScoreBetween = (min, max) =>
  prisma.product.findMany({
    where: {
      popularityScore: { gte: min, lte: max }
    }
  });

  
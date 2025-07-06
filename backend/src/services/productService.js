import { findAll, findByPopularityScoreBetween } from '../repository/productRepository.js';
import { getGoldPrice } from './goldService.js';

function calculatePrice(product, goldPrice) {
  return Number(((product.popularityScore + 1) * product.weight * goldPrice).toFixed(2));
}

function enrichProducts(products, goldPrice) {
  return products.map(p => ({
    ...p,
    price: calculatePrice(p, goldPrice)
  }));
}

function filterByPrice(min, max) {
  return p => p.price >= min && p.price <= max;
}

export async function getAllProducts() {
  const goldPrice = await getGoldPrice();
  const products = await findAll();
  return enrichProducts(products, goldPrice);
}

export async function getProductsByPopularityScoreBetween({ min = 0, max = 1 } = {}) {
  const goldPrice = await getGoldPrice();
  const products = await findByPopularityScoreBetween(min, max);
  return enrichProducts(products, goldPrice);
}

export async function getProductsByPriceBetween({ min = 0, max = Number.MAX_SAFE_INTEGER } = {}) {
  const goldPrice = await getGoldPrice();
  const enriched = enrichProducts(await findAll(), goldPrice);
  return enriched.filter(filterByPrice(min, max));
}

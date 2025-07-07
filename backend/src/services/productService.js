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

export async function getAllProducts({ popMin = 0, popMax = 1, priceMin = 0, priceMax = Number.MAX_SAFE_INTEGER }) {
  const goldPrice = await getGoldPrice();

  const filteredByPopularity = await findByPopularityScoreBetween(popMin, popMax);
  const enriched = enrichProducts(filteredByPopularity, goldPrice);

  return enriched.filter(filterByPrice(priceMin, priceMax));
}
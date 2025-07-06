import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';

export function useProducts(params) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchProducts(params)
      .then(res => setProducts(res.data || []))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [JSON.stringify(params)]);

  return { products, loading, error };
}

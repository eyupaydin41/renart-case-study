export async function fetchProducts(params = {}) {
  const query = new URLSearchParams({
    popMin: params.popMin ?? 0,
    popMax: params.popMax ?? 1,
    priceMin: params.priceMin ?? 0,
    priceMax: params.priceMax ?? 1000
  }).toString();
  let res;
  try {
    res = await fetch(`/api/products${query ? `?${query}` : ''}`);
  } catch (err) {
    throw new Error('Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı ve sunucunun çalıştığını kontrol edin.');
  }
  if (!res.ok) {
    let message = 'Ürünler alınamadı';
    try {
      const data = await res.json();
      if (data && data.message) message += `: ${data.message}`;
    } catch {}
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

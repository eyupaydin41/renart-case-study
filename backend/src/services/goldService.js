import axios from 'axios';

export function getGoldPrice() {
  const apiKey = process.env.GOLD_API_KEY;
  const url = `https://www.goldapi.io/api/XAU/USD`;

  return axios
    .get(url, {
      headers: {
        'x-access-token': apiKey,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.data.price_gram_24k;
    })
    .catch(err => {
      console.error('Gold price fetch error:', err.message);
      return null;
    });
}

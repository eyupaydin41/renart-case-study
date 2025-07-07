import ColorPicker from './ColorPicker';
import { useState, useEffect } from 'react';
import { StarRating } from '../utils/starUtils';
import { COLOR_LABELS } from '../types/colorLabels';

export default function ProductCard({ product }) {
  const colorOrder = ['yellow', 'white', 'rose'];
  const colorKeys = colorOrder.filter(key => product.images && product.images[key]);
  const imagesArr = colorKeys.map(key => product.images[key]);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    setColorIndex(0);
  }, [product]);

  const priceStr = `$${product.price.toFixed(2)} USD`;
  const rating = Math.round(product.popularityScore * 5 * 10) / 10;

  return (
    <div className="product-card">
      <img
        src={imagesArr[colorIndex]}
        alt={product.name}
        className="product-card-img"
      />
      <div className="product-card-title">{product.name}</div>
      <div className="product-card-price">{priceStr}</div>
      <div className="product-card-colors">
        <ColorPicker colors={colorKeys} selected={colorIndex} onSelect={setColorIndex} />
      </div>
      <div className="product-card-color-label">
        {COLOR_LABELS[colorKeys[colorIndex]] || colorKeys[colorIndex]}
      </div>
      <div className="product-card-rating">
        <StarRating value={Number(rating)} />
        <span style={{ color: '#222', fontWeight: 500, fontSize: '1rem', marginLeft: 4 }}>{rating}/5</span>
      </div>
    </div>
  );
}

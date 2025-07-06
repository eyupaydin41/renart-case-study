import { useState } from 'react';

export default function ProductCarousel({ images, colorIndex }) {
  const [index, setIndex] = useState(0);
  const imgs = images && images[colorIndex] ? [images[colorIndex]] : [];

  if (!imgs.length) return <div style={{ height: 200, background: '#fafafa' }}>No image</div>;

  return (
    <div style={{ position: 'relative', width: '100%', height: 200 }}>
      <img src={imgs[0]} alt="Product" style={{ width: '100%', height: 200, objectFit: 'contain' }} />
    </div>
  );
}

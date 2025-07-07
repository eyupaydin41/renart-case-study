import '../styles/components/ProductFilterBar.css';
import { useState, useEffect } from 'react';

export default function ProductFilterBar({ onChange, filter }) {
  const [pop, setPop] = useState({
    popMin: Number(filter?.popMin ?? 0),
    popMax: Number(filter?.popMax ?? 1)
  });
  const [price, setPrice] = useState({
    priceMin: Number(filter?.priceMin ?? 0),
    priceMax: Number(filter?.priceMax ?? 1000)
  });

  useEffect(() => {
    setPop({
      popMin: Number(filter?.popMin ?? 0) * 5,
      popMax: Number(filter?.popMax ?? 1) * 5
    });
    setPrice({
      priceMin: Number(filter?.priceMin ?? 0),
      priceMax: Number(filter?.priceMax ?? 1000)
    });
  }, [filter]);

  const handlePopInput = (e) => {
    const { name, value } = e.target;
    setPop(l => ({ ...l, [name]: value === '' ? '' : Number(value) }));
  };
  const handlePriceInput = (e) => {
    const { name, value } = e.target;
    setPrice(l => ({ ...l, [name]: value === '' ? '' : Number(value) }));
  };

  const handlePopApply = () => {
    onChange({
      ...filter,
      popMin: Number((Number(pop.popMin) / 5).toFixed(4)),
      popMax: Number((Number(pop.popMax) / 5).toFixed(4))
    });
  };
  const handlePriceApply = () => {
    onChange({
      ...filter,
      priceMin: Number(price.priceMin),
      priceMax: Number(price.priceMax)
    });
  };

  return (
    <div className="product-filter-bar" style={{ display: 'flex', gap: 32, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
      <div className="product-filter-bar-input-group">
        <span className="product-filter-bar-label">Popülarite (0-5)</span>
        <div className="product-filter-bar-inputs-with-btn">
          <div className="product-filter-bar-inputs">
            <input
              type="number"
              min={0}
              max={5}
              step={0.01}
              name="popMin"
              className="product-filter-bar-input"
              value={pop.popMin}
              onChange={handlePopInput}
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              min={0}
              max={5}
              step={0.01}
              name="popMax"
              className="product-filter-bar-input"
              value={pop.popMax}
              onChange={handlePopInput}
              placeholder="Max"
            />
          </div>
          <button type="button" className="product-filter-bar-apply" onClick={handlePopApply} aria-label="Popülariteye göre filtrele">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="7" stroke="#fff" strokeWidth="2"/>
              <line x1="14.2" y1="14.2" x2="18" y2="18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="product-filter-bar-input-group">
        <span className="product-filter-bar-label">Fiyat (USD)</span>
        <div className="product-filter-bar-inputs-with-btn">
          <div className="product-filter-bar-inputs">
            <input
              type="number"
              min={0}
              max={1000}
              step={1}
              name="priceMin"
              className="product-filter-bar-input"
              value={price.priceMin}
              onChange={handlePriceInput}
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              min={0}
              max={1000}
              step={1}
              name="priceMax"
              className="product-filter-bar-input"
              value={price.priceMax}
              onChange={handlePriceInput}
              placeholder="Max"
            />
          </div>
          <button type="button" className="product-filter-bar-apply" onClick={handlePriceApply} aria-label="Fiyata göre filtrele">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="7" stroke="#fff" strokeWidth="2"/>
              <line x1="14.2" y1="14.2" x2="18" y2="18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import Arrow from '../components/Arrow';
import { useEffect, useRef, useState } from 'react';
import '../styles/pages/ProductListPage.css';
import ErrorMessage from '../components/ErrorMessage';
import ProductFilterBar from '../components/ProductFilterBar';
import LoadingOverlay from '../components/LoadingOverlay';

export default function ProductListPage() {
  const [filter, setFilter] = useState({ popMin: 0, popMax: 1, priceMin: 0, priceMax: 1000 });
  const { products, loading, error } = useProducts(filter);
  const scrollRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  const [dragStartX, setDragStartX] = useState(0);
  const [dragScrollLeft, setDragScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const getScrollAmount = () => {
    if (!scrollRef.current) return 320;
    const style = window.getComputedStyle(scrollRef.current.firstElementChild);
    const cardWidth = scrollRef.current.firstElementChild?.offsetWidth || 320;
    const gap = parseInt(style.marginRight) || 0;
    const isMobile = window.innerWidth < 700;
    return (isMobile ? 1.1 : 2) * (cardWidth + gap);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrollPos(el.scrollLeft);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const checkScroll = () => {
      setCanScroll({
        left: el.scrollLeft > 0,
        right: el.scrollLeft + el.offsetWidth < el.scrollWidth - 2
      });
    };
    checkScroll();
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [products]);

  if (error) return <ErrorMessage message={error.message} />;

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;

  const onTouchStart = (e) => {
    if (!isMobile) return;
    setTouchStartX(e.touches[0].clientX);
  };
  const onTouchMove = (e) => {
    if (!isMobile) return;
    setTouchEndX(e.touches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!isMobile) return;
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;
      if (diff > 50) scrollRight();
      else if (diff < -50) scrollLeft();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const onMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragStartX(e.pageX);
    setDragScrollLeft(scrollRef.current.scrollLeft);
  };
  const onMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = e.pageX - dragStartX;
    scrollRef.current.scrollLeft = dragScrollLeft - dx;
  };
  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);

  return (
    <div style={{ padding: 24, position: 'relative', maxWidth: 1800, margin: '0 auto' }}>
      <h1 className="product-list-title">Product List</h1>
      <ProductFilterBar onChange={setFilter} filter={filter} />

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {loading && <LoadingOverlay />}
        <Arrow direction="left" onClick={scrollLeft} disabled={!canScroll.left} />
        <div
          ref={scrollRef}
          className={`product-list-scroll${products.length === 1 ? ' single-product' : ''}`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ userSelect: 'none', overflowX: isMobile ? 'hidden' : 'auto' }}
        >
          {products.map(product => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
        <Arrow direction="right" onClick={scrollRight} disabled={!canScroll.right} />
      </div>
    </div>
  );
}


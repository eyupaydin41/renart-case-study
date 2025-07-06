import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import Arrow from '../components/Arrow';
import { useEffect, useRef, useState } from 'react';
import '../styles/pages/ProductListPage.css';
import ErrorMessage from '../components/ErrorMessage';

export default function ProductListPage() {
  const { products, loading, error } = useProducts();
  const scrollRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  const getScrollAmount = () => {
    if (!scrollRef.current) return 320 * 2;
    const style = window.getComputedStyle(scrollRef.current.firstElementChild);
    const cardWidth = scrollRef.current.firstElementChild?.offsetWidth || 320;
    const gap = parseInt(style.marginRight) || 0;
    return 2 * (cardWidth + gap);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorMessage message={error.message} />;

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  };

  return (
    <div style={{ padding: 24, position: 'relative', maxWidth: 1800, margin: '0 auto' }}>
      <h1 className="product-list-title">Product List</h1>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Arrow direction="left" onClick={scrollLeft} disabled={!canScroll.left} />
        <div
          ref={scrollRef}
          className="product-list-scroll"
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

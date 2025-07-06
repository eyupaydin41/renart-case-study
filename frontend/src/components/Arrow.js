const Arrow = ({ direction = 'left', onClick, disabled }) => (
  <button
    className={`product-list-arrow product-list-arrow-${direction}`}
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === 'left' ? 'Scroll left' : 'Scroll right'}
  >
    <svg
      className="product-list-arrow-svg"
      viewBox="0 0 32 32"
      fill="none"
    >
      {direction === 'left' ? (
        <polyline 
          points="18,10 12,16 18,22" 
          fill="none" stroke="#333" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      ) : (
        <polyline 
          points="14,10 20,16 14,22" 
          fill="none" stroke="#333" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      )}
    </svg>
  </button>
);

export default Arrow;

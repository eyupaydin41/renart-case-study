const StarIcon = ({ color = "#f6d5a8" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path
      d="M12 17.27L18.18 21c.4.25.9-.12.77-.57l-1.64-6.99 5.46-4.73c.34-.29.16-.85-.28-.88l-7.03-.61-2.89-6.63c-.18-.41-.73-.41-.91 0l-2.89 6.63-7.03.61c-.44.04-.62.59-.28.88l5.46 4.73-1.64 6.99c-.13.45.37.82.77.57L12 17.27z"
    />
  </svg>
);

const StarHalfIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <defs>
      <linearGradient id="half">
        <stop offset="50%" stopColor="#f6d5a8" />
        <stop offset="50%" stopColor="#ddd" />
      </linearGradient>
    </defs>
    <path
      d="M12 17.27L18.18 21c.4.25.9-.12.77-.57l-1.64-6.99 5.46-4.73c.34-.29.16-.85-.28-.88l-7.03-.61-2.89-6.63c-.18-.41-.73-.41-.91 0l-2.89 6.63-7.03.61c-.44.04-.62.59-.28.88l5.46 4.73-1.64 6.99c-.13.45.37.82.77.57L12 17.27z"
      fill="url(#half)"
    />
  </svg>
);

export function StarRating({ value, max = 5 }) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.25 && value % 1 < 0.75;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {Array(fullStars).fill(0).map((_, i) => <StarIcon key={'f'+i} color="#f6d5a8" />)}
      {hasHalfStar && <StarHalfIcon key="half" />}
      {Array(emptyStars).fill(0).map((_, i) => <StarIcon key={'e'+i} color="#ddd" />)}
    </span>
  );
}
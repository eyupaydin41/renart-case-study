import { COLOR_MAP } from '../types/colorMap';

export default function ColorPicker({ colors, selected, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
      {colors.map((colorKey, i) => (
        <button
          key={i}
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: COLOR_MAP[colorKey] || '#eee',
            cursor: 'pointer',
            padding: 0,
            border: selected === i ? '3px solid white' : 'none',
            outline: 'none',
            boxShadow: selected === i ? '0 0 0 0.5px #000' : 'none',
            outlineOffset: selected === i ? '2px' : '0',
            transition: 'all 0.2s ease',
            boxSizing: 'border-box',
            transition: "none",
          }}
          onClick={() => onSelect(i)}
          title={colorKey}
        />
      ))}
    </div>
  );
}


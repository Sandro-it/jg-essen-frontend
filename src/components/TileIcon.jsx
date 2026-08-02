// Кругла декоративна іконка біля плитки на Головній: фото (кроп з
// design-reference/Головна.png) у круглій масці поверх кольорової
// підложки — 131×131px за специфікацією дизайну.
export default function TileIcon({ image, color, alt }) {
  return (
    <span className="tile-icon" style={{ backgroundColor: color }} aria-hidden="true">
      <img src={image} alt={alt || ''} className="tile-icon__photo" />
    </span>
  );
}

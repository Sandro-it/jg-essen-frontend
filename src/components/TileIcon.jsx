// Іконка плитки на Головній — готове зображення з макета (вже кругле,
// без додаткового CSS-оформлення навколо).
export default function TileIcon({ image, alt }) {
  return <img src={image} alt={alt || ''} className="tile-icon" aria-hidden="true" />;
}

// Кругла декоративна іконка у стилі вітража для плиток на Головній —
// сегменти кольорового скла (conic-gradient) зі "свинцевими" перегородками
// та простим сюжетним гліфом по центру, стилізовано під design-reference/Головна.png.
export default function TileIcon({ colors, glyph }) {
  const segments = colors
    .map((color, index) => {
      const start = (360 / colors.length) * index;
      const end = (360 / colors.length) * (index + 1);
      return `${color} ${start}deg ${end}deg`;
    })
    .join(', ');

  return (
    <span
      className="tile-icon"
      aria-hidden="true"
      style={{ background: `conic-gradient(from 0deg, ${segments})` }}
    >
      <span className="tile-icon__leading" />
      <span className="tile-icon__glyph">{glyph}</span>
    </span>
  );
}

/** Text on a circle, turning slowly, with the monogram at its centre. */
export default function RotatingBadge({ text }: { text: string }) {
  /* The path is a 37-unit-radius circle: circumference ≈ 232 units. At 7.4px
     with 0.24em tracking a glyph costs ≈ 5.6 units, so ≈ 41 characters fit.
     Repeat only as many times as actually fit, or the ring overruns itself. */
  const unit = `${text.toUpperCase()} · `;
  const capacity = 41;
  const repeats = Math.max(1, Math.floor(capacity / unit.length));
  const ring = unit.repeat(repeats);
  return (
    <div className="badge" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <defs>
          <path id="badge-path" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <g className="badge-ring">
          <text>
            <textPath href="#badge-path" startOffset="0">
              {ring}
            </textPath>
          </text>
        </g>
      </svg>
      {/* The monogram at the centre, still while the ring turns. Two files,
          one per ground; CSS shows the one that matches the theme. */}
      <img className="badge-mark mark-img" src="/brand/sb-mark-dark.png" alt="" width={245} height={200} />
    </div>
  );
}

import { Star } from "@/components/icons";

/** A full-bleed band of what he does, running edge to edge. Pauses on hover. */
export default function Marquee({ items }: { items: string[] }) {
  const run = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} style={{ display: "flex" }}>
            {run.map((item, i) => (
              <span className="marquee-item" key={`${copy}-${i}`}>
                <Star className="marquee-star" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

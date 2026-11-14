import Image from "next/image";
import type { Art } from "@/lib/art";

type Props = {
  art: Art;
  className?: string;
  /** Rendered width hint for responsive images, e.g. "(min-width: 768px) 352px, 100vw". */
  sizes?: string;
  priority?: boolean;
};

/** Shows an illustration: framed artwork in a rounded card, transparent artwork as-is. */
export default function Artwork({ art, className = "", sizes = "(min-width: 768px) 360px, 100vw", priority }: Props) {
  return (
    <Image
      src={art.src}
      alt={art.alt}
      sizes={sizes}
      priority={priority}
      placeholder={art.framed ? "blur" : "empty"}
      className={`h-auto w-full ${art.framed ? "rounded-[1.5rem] shadow-[var(--shadow-card)]" : ""} ${className}`}
    />
  );
}

import Image from "next/image";
import authorPhoto from "@/public/images/author.webp";

export const AUTHOR_NAME = "Ali Khan";

/** Small round photo plus name. The name shows from `nameFrom` up and stays readable to screen readers below it. */
export default function AuthorProfile({ className = "", nameFrom = "lg" }: { className?: string; nameFrom?: "lg" | "always" }) {
  return (
    <div className={`items-center gap-2 ${className}`}>
      <Image
        src={authorPhoto}
        alt=""
        width={40}
        height={40}
        className="size-10 shrink-0 rounded-full object-cover ring-2 ring-accent/60 ring-offset-2 ring-offset-paper"
      />
      <span
        className={`whitespace-nowrap text-sm font-semibold text-ink ${nameFrom === "lg" ? "sr-only lg:not-sr-only" : ""}`}
      >
        {AUTHOR_NAME}
      </span>
    </div>
  );
}

import Image from "next/image";
import logoMark from "@/public/brand/logo-mark.png";

/** Brand mark (purple F with a feather) plus the "Fonts Changer" wordmark. */
export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <Image
        src={logoMark}
        alt=""
        aria-hidden="true"
        width={44}
        height={44}
        priority
        className="size-10 shrink-0 drop-shadow-[0_6px_10px_rgb(100_37_232/0.25)] sm:size-11"
      />
      <span className={`text-lg font-extrabold tracking-tight sm:text-xl ${inverted ? "text-white" : "text-ink"}`}>
        Fonts <span className={inverted ? "text-[#c4abff]" : "text-accent dark:text-accent-strong"}>Changer</span>
      </span>
    </span>
  );
}

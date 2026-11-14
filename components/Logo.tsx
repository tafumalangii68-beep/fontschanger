export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-xl bg-accent text-[1.05rem] font-extrabold tracking-tight text-white shadow-[0_6px_16px_-6px_rgb(100_37_232/0.7)] sm:size-10 sm:text-lg"
      >
        Aa
      </span>
      <span className={`text-lg font-extrabold tracking-tight sm:text-xl ${inverted ? "text-white" : "text-ink"}`}>
        Fonts <span className={inverted ? "text-[#c4abff]" : "text-accent dark:text-accent-strong"}>Changer</span>
      </span>
    </span>
  );
}

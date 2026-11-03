 const TONES = ["bg-accent text-accent-foreground", "bg-sky-300 text-sky-950", "bg-rose-300 text-rose-950"];

const SIZES = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-20 w-20 text-2xl" };

export function Avatar({
  username,
  src,
  size = "md",
}: {
  username: string;
  src?: string;
  size?: keyof typeof SIZES;
}) {
  const tone = TONES[username.charCodeAt(0) % TONES.length];

  return src ? (
    <img src={src} alt="" className={`${SIZES[size]} shrink-0 rounded-full object-cover`} />
  ) : (
    <span
      aria-hidden
      className={`${SIZES[size]} ${tone} inline-flex shrink-0 items-center justify-center rounded-full font-semibold uppercase`}
    >
      {username.slice(0, 2)}
    </span>
  );
}
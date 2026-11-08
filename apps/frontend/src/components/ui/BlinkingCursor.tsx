export function BlinkingCursor() {
  return (
    <span
      className="block h-5 w-4 animate-c64blink bg-primary motion-reduce:animate-none"
      aria-hidden="true"
    ></span>
  );
}

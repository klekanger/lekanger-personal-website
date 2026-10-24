export function BlinkingCursor() {
  return (
    <div
      className="h-5 w-4 animate-c64blink bg-primary motion-reduce:animate-none"
      aria-hidden
    ></div>
  );
}

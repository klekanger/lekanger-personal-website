import { BlinkingCursor } from "./ui/BlinkingCursor";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-16 pb-16 lg:pt-32">
      <div className="relative ml-[calc(50%-50vw)] h-13.5 w-screen">
        <div className="rasterbar">
          <div className="rasterbar rasterbar2" />
          <div className="rasterbar rasterbar3" />
        </div>
      </div>
      <div className="pt-16 font-heading text-xs lg:text-base">
        <p className="pb-4">LIST</p>
        <p> 10 REM HÅNDKODET AV KURT LEKANGER</p>
        <p>20 REM BYGGET MED TANSTACK START + SANITY</p>
        <p>30 REM (C) {year}</p>
        <p>READY.</p>
        <BlinkingCursor />
      </div>
    </footer>
  );
}

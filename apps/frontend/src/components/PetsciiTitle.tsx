import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+<>?";
const SCRAMBLE_STEPS = 6;
const TICK_MS = 50;
const REVERSED_CHANCE = 0.45;

type PetsciiTitleProps = {
  from: string;
  to: string;
  delay?: number;
  className?: string;
};

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

export function PetsciiTitle({
  from,
  to,
  delay = 3000,
  className,
}: PetsciiTitleProps) {
  const length = Math.max(from.length, to.length);

  // Make from and to text the same length
  const fromText = from.padEnd(length);
  const toText = to.padEnd(length);

  const lastStep = length + SCRAMBLE_STEPS;
  const [step, setStep] = useState(0);
  const [isGoingBack, setIsGoingBack] = useState(false);

  const sourceText = isGoingBack ? toText : fromText;
  const targetText = isGoingBack ? fromText : toText;

  useEffect(() => {
    // Do not animate text if the user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const timeoutId = setTimeout(() => {
      let currentStep = 0;

      intervalId = setInterval(() => {
        if (currentStep >= lastStep) {
          if (!isGoingBack) {
            setIsGoingBack(true);
            setStep(0);
          }
          clearInterval(intervalId);
        } else {
          currentStep++;
          setStep(currentStep);
        }
      }, TICK_MS);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [delay, lastStep, isGoingBack]);

  return (
    <h1 className={className}>
      <span className="sr-only">{from}</span>
      <span aria-hidden="true" className="whitespace-pre-wrap">
        {[...sourceText].map((sourceChar, position) => {
          const targetChar = targetText[position];
          const hasStarted = step > position;
          const hasSettled = step > position + SCRAMBLE_STEPS;
          const isBlank = sourceChar === " " && targetChar === " ";
          const isScrambling = hasStarted && !hasSettled && !isBlank;

          let char = targetChar;

          if (!hasStarted) {
            char = sourceChar;
          } else if (isScrambling) {
            char = randomGlyph();
          }

          const isReversed = isScrambling && Math.random() < REVERSED_CHANCE;

          return (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: character positions are fixed
              key={position}
              className={isReversed ? "petscii-reversed" : undefined}
            >
              {char}
            </span>
          );
        })}
      </span>
    </h1>
  );
}

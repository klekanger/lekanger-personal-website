import type { FactItem } from "@repo/shared";
import { useEffect, useMemo, useReducer, useRef } from "react";

export type UseTypeWriterOpts = {
  pause?: number | undefined;
  typeSpeed?: number | undefined;
  searchTime?: number | undefined;
  loadTime?: number | undefined;
};

type Phase = "typing" | "searching" | "loading" | "revealed" | "done";

type TypingState = {
  index: number;
  charIndex: number;
  phase: Phase;
};

export type TypewriterItem<TFact extends FactItem = FactItem> = {
  fact: TFact;
  visible: boolean;
  labelText: string;
  showValue: boolean;
  showCursor: boolean;
};

type Action =
  | { type: "tick"; facts: FactItem[] }
  | { type: "reset"; facts: FactItem[] };

const C64_COMMANDS = {
  c64Load: {
    format: (label: string) => `LOAD "${label}",8,1`,
    tapeLoad: true,
  },
  c64Print: {
    format: (label: string) => `PRINT ${label}$`,
    tapeLoad: false,
  },
  c64NoCommand: {
    format: (label: string) => label,
    tapeLoad: false,
  },
};

// Add C64 commands like LOAD and PRINT to fact.label
// based on the fact.c64command value
//
function getLabelToPrint(fact: FactItem | undefined): string {
  const typedText =
    fact?.c64command !== undefined
      ? C64_COMMANDS[fact.c64command].format(fact?.label ?? "")
      : C64_COMMANDS.c64NoCommand.format(fact?.label ?? "");

  return typedText;
}

function enterItem(facts: FactItem[], index: number): TypingState {
  const fact = facts[index];
  if (!fact) return { index, charIndex: 0, phase: "done" };

  return { index, charIndex: 0, phase: "typing" };
}

function reducer(state: TypingState, action: Action): TypingState {
  const { facts, type } = action;

  switch (type) {
    case "reset":
      return enterItem(facts, 0);

    case "tick":
      switch (state.phase) {
        case "typing": {
          const charIndex = state.charIndex + 1;
          const newLabel = getLabelToPrint(facts[state.index]) ?? "";

          if (charIndex < newLabel.length) return { ...state, charIndex };

          const tapeLoad =
            C64_COMMANDS[facts[state.index]?.c64command ?? "c64NoCommand"]
              ?.tapeLoad === true;

          return {
            ...state,
            charIndex,
            phase: tapeLoad ? "searching" : "revealed",
          };
        }

        case "searching":
          return { ...state, phase: "loading" };

        case "loading":
          return { ...state, phase: "revealed" };

        case "revealed":
          return enterItem(facts, state.index + 1);

        case "done":
          return state;
      }
  }
}

/**
 * Renders "C64 commands" on the screen.
 * Typing speed and features like typing "LOAD" or "PRINT"
 * is defined in Sanity
 */
export function useTypewriterSequence<TFact extends FactItem>(
  facts: TFact[],
  {
    pause = 1000,
    typeSpeed = 45,
    loadTime = 900,
    searchTime = 1500,
  }: UseTypeWriterOpts = {},
) {
  const [state, dispatch] = useReducer(reducer, facts, (initial) => {
    return enterItem(initial, 0);
  });

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    dispatch({ type: "reset", facts });
  }, [facts]);

  useEffect(() => {
    const DELAY: Record<Exclude<Phase, "done">, number> = {
      loading: loadTime,
      searching: searchTime,
      typing: typeSpeed,
      revealed: pause,
    };

    if (state.phase === "done") return;

    const id = setTimeout(
      () => dispatch({ type: "tick", facts }),
      DELAY[state.phase],
    );

    return () => clearTimeout(id);
  }, [state, pause, typeSpeed, facts, searchTime, loadTime]);

  const items = useMemo<TypewriterItem<TFact>[]>(
    () =>
      facts.map((fact, i) => {
        const label = getLabelToPrint(fact);

        if (i > state.index) {
          return {
            fact,
            visible: false,
            labelText: "",
            showValue: false,
            showCursor: false,
          };
        }

        if (i < state.index) {
          return {
            fact,
            visible: true,
            labelText: label,
            showValue: true,
            showCursor: false,
          };
        }

        return {
          fact,
          visible: true,
          labelText: label.slice(0, state.charIndex),
          showValue: state.phase !== "typing",
          showCursor: true,
        };
      }),
    [facts, state],
  );

  return { items, phase: state.phase };
}

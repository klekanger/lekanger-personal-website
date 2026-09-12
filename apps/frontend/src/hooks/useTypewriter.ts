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

type C64Command = NonNullable<FactItem["c64command"]>;

type CommandSpec = {
  format: (label: string) => string;
  tapeLoad: boolean;
};

type Action =
  | { type: "tick"; entries: TypewriterEntry[] }
  | { type: "reset"; entries: TypewriterEntry[] }
  | { type: "skipAll"; entries: TypewriterEntry[] };

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
} satisfies Record<C64Command, CommandSpec>;

type TypewriterEntry<TFact extends FactItem = FactItem> = {
  fact: TFact;
  text: string;
  tapeLoad: boolean;
};

function toEntry<TFact extends FactItem>(fact: TFact) {
  const { format, tapeLoad } = C64_COMMANDS[fact.c64command ?? "c64NoCommand"];

  return { fact, text: format(fact.label ?? ""), tapeLoad };
}

function enterItem(entries: TypewriterEntry[], index: number): TypingState {
  if (!entries[index]) return { index, charIndex: 0, phase: "done" };

  return { index, charIndex: 0, phase: "typing" };
}

// Reducer
//
function reducer(state: TypingState, action: Action): TypingState {
  const { entries, type } = action;

  switch (type) {
    case "reset":
      return enterItem(entries, 0);

    case "skipAll":
      return { index: entries.length, charIndex: 0, phase: "done" };

    case "tick":
      switch (state.phase) {
        case "typing": {
          const entry = entries[state?.index];
          const charIndex = state.charIndex + 1;

          if (charIndex < entry.text.length) return { ...state, charIndex };

          return {
            ...state,
            charIndex,
            phase: entry?.tapeLoad ? "searching" : "revealed",
          };
        }

        case "searching":
          return { ...state, phase: "loading" };

        case "loading":
          return { ...state, phase: "revealed" };

        case "revealed":
          return enterItem(entries, state.index + 1);

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
  const entries = useMemo(() => facts.map(toEntry), [facts]);

  const [state, dispatch] = useReducer(reducer, entries, (initial) => {
    return enterItem(initial, 0);
  });

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    dispatch({ type: "reset", entries });
  }, [entries]);

  useEffect(() => {
    const DELAY: Record<Exclude<Phase, "done">, number> = {
      loading: loadTime,
      searching: searchTime,
      typing: typeSpeed,
      revealed: pause,
    };

    if (state.phase === "done") return;

    const id = setTimeout(
      () => dispatch({ type: "tick", entries }),
      DELAY[state.phase],
    );

    return () => clearTimeout(id);
  }, [state, pause, typeSpeed, entries, searchTime, loadTime]);

  const items = useMemo<TypewriterItem<TFact>[]>(
    () =>
      entries.map(({ fact, text }, i) => {
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
            labelText: text,
            showValue: true,
            showCursor: false,
          };
        }

        return {
          fact,
          visible: true,
          labelText: text.slice(0, state.charIndex),
          showValue: state.phase !== "typing",
          showCursor: true,
        };
      }),
    [entries, state],
  );

  return { items, phase: state.phase };
}

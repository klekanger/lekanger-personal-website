import type {
  Action,
  C64Command,
  CommandSpec,
  FactItem,
  Phase,
  TypewriterEntry,
  TypewriterItem,
  TypingState,
  UseTypeWriterOpts,
} from "@repo/shared";
import { useEffect, useMemo, useReducer, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// We need to keep track of the order of the operations to render
// the "searching" or "loading" lines at the right time
// and also hide the cursor when the disk is loading
const PHASE_ORDER: Record<Phase, number> = {
  typing: 0,
  searching: 1,
  loading: 2,
  revealed: 3,
  done: 4,
};

const C64_COMMANDS = {
  c64Load: {
    format: (label: string) => `LOAD "${label}",8,1`,
    diskLoad: true,
  },
  c64Print: {
    format: (label: string) => `PRINT ${label}$`,
    diskLoad: false,
  },
  c64NoCommand: {
    format: (label: string) => label,
    diskLoad: false,
  },
} satisfies Record<C64Command, CommandSpec>;

/**
 * Convert a fact item's label into a "C64 command"
 * Example:
 * - `label: "HELLO"` with c64command `c64Print` becomes `text: PRINT HELLO$`
 * - `label: "WORLD"` with c64command `c64Load` becomes `text: LOAD "WORLD",8,1`
 *
 * The c64 commands are defined in Sanity, together with the labels.
 *
 * If the c64command is `c64Load` we add "searching" and "loading" text lines
 * that are rendered during the searching and loading phases.
 */
function toEntry<TFact extends FactItem>(fact: TFact) {
  const { format, diskLoad } = C64_COMMANDS[fact.c64command ?? "c64NoCommand"];

  const label = fact.label ?? "";

  return {
    fact,
    text: format(label),
    diskLoad,
    diskLines: diskLoad
      ? {
          searching: `SEARCHING FOR ${label}`,
          loading: "LOADING... OK",
        }
      : null,
  };
}

/**
 * Build the start state for the fact item at `index`.
 * When `index` is past the end of `entries` there is nothing
 * more to type out, and we will enter the `done` state and stop typing.
 */
function enterItem(entries: TypewriterEntry[], index: number): TypingState {
  if (!entries[index]) return { index, charIndex: 0, phase: "done" };

  return { index, charIndex: 0, phase: "typing" };
}

/**
 * Reducer function for the typewriter state machine.
 *
 * @param state The current typing state (which item we are typing out, which character, and the phase (typing, searching, loading, revealed, done))
 * @param action The action to perform (tick, reset, skipAll)
 * @returns The updated typing state
 */
function reducer(state: TypingState, action: Action): TypingState {
  const { entries, type } = action;

  switch (type) {
    case "reset":
      return enterItem(entries, 0);

    case "skipAll":
      if (state.phase === "done" && state.index === entries.length)
        return state;

      return { index: entries.length, charIndex: 0, phase: "done" };

    case "tick":
      switch (state.phase) {
        case "typing": {
          const entry = entries[state.index];
          const charIndex = state.charIndex + 1;

          // Type letters one by one until we reach the end of the text
          if (charIndex < entry?.text.length) return { ...state, charIndex };

          // When all letters have been typed out, go to the next phase.
          return {
            ...state,
            charIndex,
            phase: entry?.diskLines ? "searching" : "revealed",
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
 * Hook for rendering "C64 commands" on the screen in a typewriter style.
 * The commands (eg. "LOAD", "PRINT") are defined in Sanity.
 * Different commands makes the text appear in different ways on the screen.
 *
 * @param facts An array of fact items with `label`, `value` and a ´c64command`
 * @param opts Timings for the typewriter animation. Each value is how long a phase lasts.
 * - `pause`: How long a finished fact stays on screen before the next item starts typing
 * - `typeSpeed`: Speed of typing (ms per char)
 * - `loadTime`: How long "loading ok" stays on screen before revealing the value
 * - `searchTime`: How long "searching for" stays on screen before "loading ok" appears
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
  const wantsReducedMotion = useReducedMotion();

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
    if (wantsReducedMotion) dispatch({ type: "skipAll", entries });
  }, [wantsReducedMotion, entries]);

  useEffect(() => {
    const DELAY: Record<Exclude<Phase, "done">, number> = {
      loading: loadTime,
      searching: searchTime,
      typing: typeSpeed,
      revealed: pause,
    };

    if (state.phase === "done" || wantsReducedMotion) return;

    const id = setTimeout(
      () => dispatch({ type: "tick", entries }),
      DELAY[state.phase],
    );

    return () => clearTimeout(id);
  }, [
    state,
    pause,
    typeSpeed,
    entries,
    searchTime,
    loadTime,
    wantsReducedMotion,
  ]);

  const items = useMemo<TypewriterItem<TFact>[]>(() => {
    const order = PHASE_ORDER[state.phase];

    return entries.map(({ fact, text, diskLines }, i) => {
      if (i > state.index) {
        return {
          fact,
          visible: false,
          labelText: "",
          statusLines: [],
          showValue: false,
          showCursor: false,
        };
      }

      if (i < state.index) {
        return {
          fact,
          visible: true,
          labelText: text,
          statusLines: diskLines
            ? [diskLines.searching, diskLines.loading]
            : [],
          showValue: true,
          showCursor: false,
        };
      }

      const statusLines: string[] = [];

      if (diskLines) {
        if (order >= PHASE_ORDER.searching)
          statusLines.push(diskLines.searching);
        if (order >= PHASE_ORDER.loading) statusLines.push(diskLines.loading);
      }

      // Do not show cursor when loading from the disk drive
      const isDriveBusy =
        order >= PHASE_ORDER.searching && order < PHASE_ORDER.revealed;

      return {
        fact,
        visible: true,
        labelText: text.slice(0, state.charIndex),
        statusLines,
        showValue: order >= PHASE_ORDER.revealed,
        showCursor: !isDriveBusy,
      };
    });
  }, [entries, state]);

  return { items, phase: state.phase };
}

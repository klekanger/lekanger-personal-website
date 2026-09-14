import type { FactItem } from "./sanity.types";

// ***************************************************
// useTypewriter hook types
// ***************************************************
export type UseTypeWriterOpts = {
  pause?: number | undefined;
  typeSpeed?: number | undefined;
  searchTime?: number | undefined;
  loadTime?: number | undefined;
};

export type Phase = "typing" | "searching" | "loading" | "revealed" | "done";

export type C64Command = NonNullable<FactItem["c64command"]>;

export type CommandSpec = {
  format: (label: string) => string;
  diskLoad: boolean;
};

type DiskLines = {
  searching: string;
  loading: string;
};

export type TypewriterEntry<TFact extends FactItem = FactItem> = {
  fact: TFact;
  text: string;
  diskLines: DiskLines | null;
};

export type TypewriterItem<TFact extends FactItem = FactItem> = {
  fact: TFact;
  visible: boolean;
  labelText: string;
  statusLines: string[];
  showValue: boolean;
  showCursor: boolean;
};

export type TypingState = {
  index: number;
  charIndex: number;
  phase: Phase;
};

export type Action =
  | { type: "tick"; entries: TypewriterEntry[] }
  | { type: "reset"; entries: TypewriterEntry[] }
  | { type: "skipAll"; entries: TypewriterEntry[] };

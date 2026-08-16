import type { StrictComponents } from "./componentTypes";

export const list = {
  bullet: ({ children }) => <ul className="list-disc pb-6 pl-6">{children}</ul>,
  number: ({ children }) => (
    <ol className="list-decimal pb-6 pl-6">{children}</ol>
  ),
} satisfies StrictComponents["list"];

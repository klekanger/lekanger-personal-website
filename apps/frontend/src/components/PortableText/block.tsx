import type { StrictComponents } from "./componentTypes";

export const block = {
	normal: ({ children }) => <p>{children}</p>,
	h2: ({ children }) => <h2>{children}</h2>,
	h3: ({ children }) => <h3>{children}</h3>,
	h4: ({ children }) => <h4>{children}</h4>,
} satisfies StrictComponents["block"];

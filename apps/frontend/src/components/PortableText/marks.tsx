import type { DecoratorComponents, StrictComponents } from "./componentTypes";

const codeStyle = {
  backgroundColor: "#48007e",
  paddingLeft: "0.125rem",
  paddingRight: "0.125rem",
  borderRadius: "0.2rem",
  fontFamily: "monospace",
};

export const marks = {
  link: ({ children, value }) => {
    // Relative hrefs stay in-app, so only flag external links as noreferrer.
    const isExternal = !value?.href?.startsWith("/");

    return (
      <a
        className="underline transition hover:opacity-50"
        href={value?.href}
        rel={isExternal ? "noreferrer noopener" : undefined}
      >
        {children}
      </a>
    );
  },
  code: ({ children }) => <code style={codeStyle}>{children}</code>,
} satisfies StrictComponents["marks"] & DecoratorComponents;

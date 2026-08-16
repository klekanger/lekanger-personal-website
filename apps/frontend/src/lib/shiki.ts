import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import css from "shiki/langs/css.mjs";
import html from "shiki/langs/html.mjs";
import javascript from "shiki/langs/javascript.mjs";
import json from "shiki/langs/json.mjs";
import jsx from "shiki/langs/jsx.mjs";
import markdown from "shiki/langs/markdown.mjs";
import python from "shiki/langs/python.mjs";
import scss from "shiki/langs/scss.mjs";
import shellscript from "shiki/langs/shellscript.mjs";
import sql from "shiki/langs/sql.mjs";
import tsx from "shiki/langs/tsx.mjs";
import typescript from "shiki/langs/typescript.mjs";
import xml from "shiki/langs/xml.mjs";
import yaml from "shiki/langs/yaml.mjs";
import githubdark from "shiki/themes/github-dark.mjs";

const highlighter = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  themes: [githubdark],

  langs: [
    css,
    html,
    javascript,
    json,
    jsx,
    markdown,
    python,
    scss,
    shellscript,
    sql,
    tsx,
    typescript,
    xml,
    yaml,
  ],
});

const loadedLanguages = new Set(highlighter.getLoadedLanguages());

/** Language ids Sanity stores under a name Shiki does not know. */
const LANGUAGE_ALIASES: Record<string, string> = {
  mysql: "sql",
  sass: "scss",
};

/**
 * `text` is one of Shiki's special languages: it needs no grammar and renders
 * the code unhighlighted, which is also what we want for anything unregistered
 * (`codeToHtml` throws on an unknown language rather than degrading).
 */
const PLAIN_TEXT = "text";

function resolveLanguage(language: string | undefined): string {
  if (!language) {
    return PLAIN_TEXT;
  }

  const resolved = LANGUAGE_ALIASES[language] ?? language;

  if (loadedLanguages.has(resolved)) {
    return resolved;
  }

  if (import.meta.env.DEV && resolved !== PLAIN_TEXT) {
    console.warn(
      `[shiki] No grammar registered for "${language}" — rendering it as plain text. Add it to \`langs\` in src/lib/shiki.ts.`,
    );
  }

  return PLAIN_TEXT;
}

/** Highlights `code` to Shiki's `<pre>` markup. Safe to call during render. */
export function highlightCode(code: string, language: string | undefined) {
  return highlighter.codeToHtml(code, {
    lang: resolveLanguage(language),
    themes: { light: "github-dark", dark: "github-dark" },
  });
}

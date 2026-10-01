import { defineQuery } from "groq";

export const SETTINGS_QUERY = defineQuery(`
   *[_type=="settings"][0]{...}
`);

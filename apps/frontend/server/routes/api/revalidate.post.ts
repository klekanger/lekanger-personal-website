import { defineHandler } from "nitro";

export default defineHandler(async (event) => {
  const payload = await event.req.json();
  console.log("[revalidate.post]", event.req.payload, payload);

  return "hello from revalidate.post";
});

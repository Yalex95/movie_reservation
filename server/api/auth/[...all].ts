import { auth } from "~~/lib/auth"; // import your auth config

export default defineEventHandler(async(event) => {
    const response = await auth.handler(toWebRequest(event))
  // Explicitly forward Set-Cookie headers via h3's sendWebResponse
  return sendWebResponse(event, response)
});

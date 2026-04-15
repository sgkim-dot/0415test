const PROXY_BASE = "https://api-auth.madup-dct.site";
const CHANNEL_ID = "C0ATEPVKTTK";

async function sendPing(apiKey) {
  const now = new Date().toISOString();
  const resp = await fetch(`${PROXY_BASE}/api/slack/send-message`, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ channel: CHANNEL_ID, text: `ping 🏓 ${now}` }),
  });
  return resp.json();
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(sendPing(env.MADUP_API_KEY));
  },

  async fetch(request, env) {
    return new Response("OK", { status: 200 });
  },
};

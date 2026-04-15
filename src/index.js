const PROXY_BASE = "https://api-auth.madup-dct.site";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/slack/channels" && request.method === "GET") {
      const resp = await fetch(`${PROXY_BASE}/api/slack/channels`, {
        headers: { "X-API-Key": env.MADUP_API_KEY },
      });
      const data = await resp.json();
      return Response.json(data, { status: resp.status });
    }

    if (url.pathname === "/api/slack/send" && request.method === "POST") {
      const body = await request.json();
      const resp = await fetch(`${PROXY_BASE}/api/slack/send-message`, {
        method: "POST",
        headers: {
          "X-API-Key": env.MADUP_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channel: body.channel, text: body.text }),
      });
      const data = await resp.json();
      return Response.json(data, { status: resp.status });
    }

    return env.ASSETS.fetch(request);
  },
};

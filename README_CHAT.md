Chat Support Integration (starter)

This project includes a small client-side chat widget and a server-side example proxy to call the OpenAI API securely.

Files added
- `src/components/Chat.jsx` — animated chat widget (Framer Motion) that collects a lightweight site-context and sends questions to the server.
- `src/components/Chat.module.css` — styles for the widget.
- `src/services/chat.js` — client service that posts to `/api/openai/chat` via the existing `src/services/api.js` axios instance.
- `server/openai-proxy.js` — minimal Express proxy that forwards requests to OpenAI using the `OPENAI_API_KEY` environment variable.

How it works
1. The widget collects a trimmed snapshot of the page (title, meta description, text from main/section/article).
2. It sends `{ question, context }` to `/api/openai/chat` (the server proxy).
3. The proxy forwards the request to OpenAI using the server-side API key and returns the model's answer.

Local setup (quick)
1. Start your front-end dev server as usual.
2. In a separate terminal, create a minimal server environment and install deps:

```powershell
cd server
npm init -y
npm i express node-fetch cors
$env:OPENAI_API_KEY = 'sk-...'
node openai-proxy.js
```

3. Ensure your front-end axios base (VITE_API_URL) points to the proxy, or run the proxy on the same host and port that the front-end expects (see `src/services/api.js`).

Security & production notes
- Never put the OpenAI key in client-side code. Always proxy requests via a server or serverless function.
- Add authentication and rate limiting on the proxy before going to production.
- Trim or sanitize the context if you have PII.

Next improvements you might want
- Stream responses and render them progressively in the chat UI.
- Persist chat history per user (e.g., localStorage or backend DB).
- Add user authentication so only authorized users can query the proxy.
- Improve the context extractor to index site content server-side and use embeddings for better retrieval.

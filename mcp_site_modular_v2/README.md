# MCP Server Starter Kit

This repository provides a hardened, ready‑to‑deploy **Multi‑Capability Provider (MCP)** server scaffold built with the official Python SDK. It exposes a streamable HTTP endpoint, bearer‑token authentication, signed OAuth state handling, health checks and dynamic tool discovery. In addition to the core utilities (`server.ping` and `server.info`), this kit includes optional integrations for Twilio, Playwright, Alpaca Markets, a simple file‑based memory, and Google Maps. It is designed for power users who want to give their favourite AI assistant real‑world capabilities without reinventing the wheel.

## Features

- **FastMCP‑based server core** – a simple FastAPI app that exposes the `/mcp` route with streaming responses and static `/health/live` and `/health/ready` endpoints.
- **Secure by default** – bearer token check, request IDs, access logging, configurable CORS and local rate limiting.
- **OAuth helpers** – optional routes for Google OAuth including `/oauth/start` and `/oauth/callback` for obtaining a refresh token or using a service account.
- **Pluggable tools** – tools are automatically discovered from the `app/tools` package. Drop in new modules exporting `TOOL_DEFINITIONS` to extend your agent’s capabilities.
- **Ready‑made integrations**:
  - `twilio`: send SMS messages and initiate calls via Twilio (requires `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` and either `TWILIO_PHONE_NUMBER` or `TWILIO_MESSAGING_SERVICE_SID`).
  - `playwright`: basic browser automation (optional `PLAYWRIGHT_BROWSER_TYPE` and `PLAYWRIGHT_TIMEOUT`).
  - `alpaca`: read‑only Alpaca trading API (requires `APCA_API_KEY_ID` and `APCA_API_SECRET_KEY`).
  - `memory`: persistent JSON‑file memory store (set `MEMORY_FILE_PATH` and optional `MAX_MEMORY_ENTRIES`, `MEMORY_SEARCH_CASE_SENSITIVE`).
  - `maps`: wrappers around the Google Maps Geocoding and Places APIs (requires `GOOGLE_MAPS_API_KEY`).
- **Extensible** – add new namespaces and actions simply by adding functions and descriptions in a `TOOL_DEFINITIONS` list.

## Folder structure

```
mcp_google_server/
├── app/
│   ├── main.py           # entry point for uvicorn
│   ├── config.py         # settings and CORS
│   ├── google_auth.py    # OAuth helpers
│   ├── security.py       # auth and rate limits
│   ├── registry.py       # dynamic tool registry
│   ├── tools/            # optional tool modules
│   └── ...
├── requirements.txt      # pip dependencies
└── .env.example          # copy to .env and update secrets
```

## Quick start

Follow these steps to run the MCP server locally:

1. Clone or download this repository.
2. Create and activate a virtual environment and install dependencies:

   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r mcp_google_server/requirements.txt
   ```

3. Copy the example environment file and set secrets:

   ```bash
   cp mcp_google_server/.env.example mcp_google_server/.env
   # edit MCP_SERVER_BEARER_TOKEN and any API keys in mcp_google_server/.env
   ```

4. Start the server locally with uvicorn:

   ```bash
   uvicorn mcp_google_server.app.main:app --host 0.0.0.0 --port 8000
   ```

5. Check that it is alive:

   - `GET http://localhost:8000/health/live`
   - `GET http://localhost:8000/health/ready`

6. Point your AI client (ChatGPT, etc.) at `http://localhost:8000/mcp` and provide the bearer token.

## Deployment on Render

Render makes it easy to host a FastAPI app with no infrastructure. To deploy your MCP server:

1. Push this project to a new GitHub repository (public or private).
2. Sign in to [Render](https://render.com/) and click **New Web Service**.
3. Connect your GitHub repository and choose the main branch.
4. For the **build command** use:

   ```bash
   pip install -r mcp_google_server/requirements.txt
   ```

5. For the **start command** use:

   ```
   uvicorn mcp_google_server.app.main:app --host 0.0.0.0 --port $PORT
   ```

6. In the **Environment** tab add all required secrets, at minimum:

   - `MCP_SERVER_BEARER_TOKEN` – long random string shared with your AI client.
   - API keys for any tools you intend to use (`APCA_API_KEY_ID`, etc.).
   - OAuth credentials if enabling Google auth (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, etc.).

7. Click **Create Web Service**. Render will build and deploy your server and give you a public URL. Update your `.env` file’s `GOOGLE_REDIRECT_URI` to point at `https://your-service.onrender.com/oauth/callback` if you use Google OAuth.

## Adding your own tools

The `app/tools` package is automatically scanned at startup. To add a new tool:

1. Create a new Python module under `mcp_google_server/app/tools` (e.g. `todo.py`).
2. Define one or more Python functions implementing your actions.
3. Create a `TOOL_DEFINITIONS` list describing each tool with `name`, `function` and `description`.

For example:

```python
from __future__ import annotations

def hello(name: str) -> str:
    return f"Hello, {name}!"

TOOL_DEFINITIONS = [
    {
        "name": "demo.hello",
        "function": hello,
        "description": "Return a friendly greeting."
    }
]
```

Restart your server and the new `demo.hello` tool will appear in the `server.info` response.

## Documentation & tutorials

We’ve provided a simple website under the `website/` folder that walks prospective users through the concept, highlights the available plans (Starter, Pro and Custom) and provides detailed tutorials for deploying on Render or running locally. Open `website/index.html` in your browser to explore. The docs page links to this README and contains step‑by‑step walkthroughs for non‑developers.

---

We hope this scaffold helps you build powerful, safe and extensible MCP servers. Please refer to the comments in the code for further details on security and OAuth configuration.
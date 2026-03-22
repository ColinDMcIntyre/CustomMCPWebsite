window.SITE = {
  brand: {
    name: 'Personal MCP Server',
    email: 'Colindmcintyre@gmail.com',
    phone: '7076661573',
    domain: 'custommcpwebsite.onrender.com'
  },
  pricing: {
    package: '$19',
    custom: 'Custom'
  },
  checkout: {
    packageUrl: 'https://www.paypal.com/ncp/payment/HSXN7ZEXM5TTG',
    packageDownloadUrl: 'https://drive.google.com/drive/folders/1sUlcqKTnwsSrwAX6QDlkiq0cOSuDBg6h?usp=drive_link',
    note: 'Point your PayPal success URL to success.html and your cancel URL to cancel.html.'
  },
  package: {
    name: 'Complete MCP Package',
    price: '$19',
    description: 'A ready-to-deploy personal MCP server with Google and GitHub support already wired in, plus a modular tools folder so you can keep extending it.',
    bullets: [
      'Google OAuth flow and static MCP OAuth support',
      'Google + GitHub setup notes written for real use',
      'Modular Python tools folder for adding your own tools',
      'Render deploy flow and copy-ready variable blocks',
      'Helpful documentation organized so you can actually finish setup'
    ]
  },
  custom: {
    bullets: [
      'Private APIs or internal systems',
      'More hands-on deployment help',
      'Custom tools or workflow design',
      'A setup built around how you already work'
    ]
  },
  copy: {
    heroTitle: 'Give your AI real tools without getting buried in setup',
    heroBody: 'This is a ready-to-deploy personal MCP server with Google and GitHub support already wired in. Buy it once, plug in your own keys, deploy it on Render, and start from something solid instead of wiring the same backend pieces by hand.',
    heroNote: 'Built to be practical on day one: deploy it, fill in your own values, and keep moving from a solid starting point.',
    featureCards: [
      {
        title: 'Useful out of the box',
        body: 'You are starting from a real scaffold, not a blank repo. The MCP path, OAuth flow, Render deployment, and core variable structure are already there.'
      },
      {
        title: 'Modular by design',
        body: 'The tools live in Python modules, so you can keep extending the server. If you want, an AI can help write new tool files for you.'
      },
      {
        title: 'Documented to be used',
        body: 'The setup guide is organized by defaults, generated secrets, and account-based API values so it feels manageable instead of overwhelming.'
      }
    ],
    useCases: [
      'Connect an assistant to Google Drive, Gmail, Docs, Sheets, and Calendar',
      'Add GitHub access so your AI can inspect or work with your repo setup',
      'Extend the server later by dropping in new Python tool modules',
      'Keep your own deployment instead of paying another monthly middle layer'
    ]
  },
  env: {
    renderBuild: 'pip install -r mcp_google_server/requirements.txt',
    renderStart: 'uvicorn mcp_google_server.app.main:app --host 0.0.0.0 --port $PORT',
    defaults: `MCP_MOUNT_PATH=/mcp
MCP_OAUTH_ENABLED=true
MCP_OAUTH_CLIENT_ID=mcp-personal
MCP_ACCESS_TOKEN_TTL_SECONDS=3600
MCP_REFRESH_TOKEN_TTL_SECONDS=2592000
MCP_AUTH_CODE_TTL_SECONDS=600
ENABLE_OAUTH_ROUTES=true
EXPOSE_REFRESH_TOKEN_IN_CALLBACK=false
TRUST_PROXY_HEADERS=true
GITHUB_API_BASE=https://api.github.com
GITHUB_USER_AGENT=mcp-ai-agent
MEMORY_FILE_PATH=/tmp/memory.json
ALLOW_EMPTY_TOOLSET=true`,
    domainBlock: `PUBLIC_BASE_URL=https://your-app.onrender.com
PUBLIC_HOST=your-app.onrender.com
MCP_ISSUER=https://your-app.onrender.com
GOOGLE_REDIRECT_URI=https://your-app.onrender.com/oauth/callback`,
    oauthGoogleBlock: `GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REFRESH_TOKEN=your-google-refresh-token`,
    githubBlock: `GITHUB_TOKEN=your-github-token
GITHUB_DEFAULT_OWNER=your-github-username-or-org`,
    bearerBlock: `MCP_SERVER_BEARER_TOKEN=generate-a-long-random-secret`,
    serviceAccountBlock: `GOOGLE_SERVICE_ACCOUNT_FILE=/absolute/path/to/service-account.json
GOOGLE_IMPERSONATED_USER=optional-user@yourdomain.com`,
    mapsBlock: `GOOGLE_MAPS_API_KEY=your-google-maps-key
MAPS_API_BASE=https://maps.googleapis.com/maps/api
MAPS_API_KEY=your-google-maps-key`,
    alpacaBlock: `APCA_API_KEY_ID=your-alpaca-key
APCA_API_SECRET_KEY=your-alpaca-secret
APCA_ENABLE_LIVE_TRADING=false
APCA_ENV=paper
APCA_MARKET_DATA_URL=https://api.alpaca.markets
APCA_PAPER_BASE_URL=https://paper-api.alpaca.markets`,
    warning: 'Keep your real secrets, refresh tokens, and API keys in Render environment variables. Do not hardcode live values into the public website.'
  }
};

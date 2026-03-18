window.SITE = {
  brand: {
    name: 'Personal MCP Server',
    email: 'Colindmcintyre@gmail.com',
    phone: '7076661573',
    domain: 'mymcp-9qe6.onrender.com'
  },
  hero: {
    title: 'Give your AI tools',
    subtitle: 'Connect your AI to Google tools and custom Python tools through your own personal MCP server.'
  },
  pricing: {
    starter: '$99',
    pro: '$299',
    custom: 'Custom'
  },
  checkout: {
    paypalClientId: 'VPSRW95C5AT78',
    starterUrl: 'https://www.paypal.com/ncp/payment/HSXN7ZEXM5TTG',
    proUrl: 'https://www.paypal.com/ncp/payment/6U5UVJ7WGEZRJ',
    starterDownloadUrl: 'https://drive.google.com/drive/folders/1sUlcqKTnwsSrwAX6QDlkiq0cOSuDBg6h?usp=drive_link',
    proDownloadUrl: 'https://drive.google.com/drive/folders/12Z1A2W1ee_vY3BZXJCTnNRJ7qYTfELfo?usp=sharing',
    note: 'Set your PayPal payment link or hosted button URL here. Point the PayPal return URL to success.html?plan=starter or success.html?plan=pro and the cancel URL to cancel.html.'
  },
  plans: [
    {
      key: 'starter',
      name: 'Starter',
      price: '$99',
      shortName: 'Google Tools',
      description: 'A personal MCP server with the core Google tools already set up. Good for everyday workflows that need Gmail, Drive, Docs, Calendar, and Sheets.',
      bullets: ['Core Google tools', 'Clear Render setup steps', 'Copy-ready variable blocks', 'Good starting point for personal workflows'],
      href: 'starter.html',
      featured: false,
      cta: 'Buy Starter'
    },
    {
      key: 'pro',
      name: 'Pro',
      price: '$299',
      shortName: 'Google + Maps + Memory + Alpaca',
      description: 'Everything in Starter, plus Maps, Memory, and Alpaca for people who want a broader toolset in the same project.',
      bullets: ['Everything in Starter', 'Google Maps tools', 'Persistent memory', 'Alpaca integrations', 'Same setup flow, more tools'],
      href: 'pro.html',
      featured: true,
      cta: 'Buy Pro'
    },
    {
      key: 'custom',
      name: 'Custom',
      price: 'Custom',
      shortName: 'Built Around Your Workflow',
      description: 'For private APIs, different auth flows, internal systems, or a setup built around the way you already work.',
      bullets: ['Private integrations', 'Custom tool design', 'Deployment help', 'Direct collaboration'],
      href: 'custom.html',
      cta: 'Request pricing'
    }
  ],
  copy: {
    problemTitle: 'Built to be practical',
    problemBody: 'I built this for myself because I wanted a simple way to connect AI to real tools without paying for another monthly service. Then I cleaned it up, made it modular, and documented it so other people could use it too.',
    trustBody: 'Built and supported directly by Colin McIntyre. If you have setup questions, you can contact me directly.',
    featureCards: [
      {
        title: 'Simple deployment',
        body: 'Push the project to GitHub, connect it to Render, add your variables, and deploy.'
      },
      {
        title: 'Clear plan options',
        body: 'Starter includes the core Google tools. Pro adds Maps, Memory, and Alpaca. Custom is for private integrations and more specific workflows.'
      },
      {
        title: 'Easy to build on',
        body: 'Add new tools by dropping in a .py file and setting any variables the tool needs.'
      }
    ]
  },
  env: {
    renderBuild: 'pip install -r mcp_google_server/requirements.txt',
    renderStart: 'uvicorn mcp_google_server.app.main:app --host 0.0.0.0 --port $PORT',
    starterRequired: `ENABLE_OAUTH_ROUTES=true
EXPOSE_REFRESH_TOKEN_IN_CALLBACK=false
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://your-service.onrender.com/oauth/callback
GOOGLE_REFRESH_TOKEN=your-google-refresh-token
MCP_MOUNT_PATH=/mcp
MCP_OAUTH_ENABLED=true
MCP_OAUTH_SECRET=replace-with-a-long-random-secret
MCP_SERVER_BEARER_TOKEN=replace-with-a-long-random-secret
OAUTH_STATE_SECRET=replace-with-a-different-long-random-secret
PUBLIC_BASE_URL=https://your-service.onrender.com
PUBLIC_HOST=your-service.onrender.com`,
    starterOptional: `# Optional but recommended
GOOGLE_SERVICE_ACCOUNT_FILE=/absolute/path/to/service-account.json
GOOGLE_IMPERSONATED_USER=optional-user@yourdomain.com`,
    starterNotes: `Google tools included in Starter:
- Gmail
- Google Drive
- Google Docs
- Google Sheets
- Google Calendar`,
    proAddOns: `# Add these on top of the Starter block
APCA_API_KEY_ID=your-alpaca-key
APCA_API_SECRET_KEY=your-alpaca-secret
APCA_MARKET_DATA_URL=https://api.alpaca.markets
APCA_PAPER_BASE_URL=https://paper-api.alpaca.markets
GOOGLE_MAPS_API_KEY=your-google-maps-key
MAPS_API_BASE=https://maps.googleapis.com/maps/api
MAPS_API_KEY=your-google-maps-key
MEMORY_FILE_PATH=/tmp/memory.json`,
    proNotes: `Pro adds these tool groups:
- Google Maps
- Memory
- Alpaca`,
    privateWarning: 'Do not publish your live secrets in the website source. Put real values in Render environment variables or send them privately after purchase.'
  },
  pages: {
    successTitle: 'Purchase complete',
    successBody: 'Thanks for your purchase. Use the button below to download your selected package, then follow the matching plan page for setup.',
    cancelTitle: 'Checkout canceled',
    cancelBody: 'No problem. You can compare the plans again or contact me directly if you want help choosing the right setup.'
  }
};

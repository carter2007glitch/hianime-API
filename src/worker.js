// Cloudflare Workers entry point
import app from './app.js';

// Export the Hono app directly - it's compatible with Cloudflare Workers
export default app;


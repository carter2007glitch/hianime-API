# Cloudflare Workers Deployment Guide

## Environment Variables Setup

When deploying to Cloudflare Workers, you need to set environment variables in the Cloudflare Dashboard. Here's what each variable does and whether it's required:

### Option 1: Set via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → Your Worker (`hianime-api`)
3. Click on **Settings** → **Variables**
4. Scroll to **Environment Variables** section

### Option 2: Set via Wrangler CLI

Run these commands in your terminal:
```bash
wrangler secret put ORIGIN
wrangler secret put BASE_URL
wrangler secret put RATE_LIMIT_WINDOW_MS
wrangler secret put RATE_LIMIT_LIMIT
wrangler secret put UPSTASH_REDIS_REST_URL
wrangler secret put UPSTASH_REDIS_REST_TOKEN
```

---

## Environment Variables Explained

### 🔴 **Required Variables: NONE**
All variables are optional! Your API will work with default values.

### 🟡 **Recommended Variables**

#### `BASE_URL` (Optional but Recommended)
- **What it does**: Sets the base URL for your API documentation (Swagger UI)
- **Default**: `http://localhost:3030`
- **What to set**: Your Cloudflare Worker URL
  - Example: `https://hianime-api.your-username.workers.dev`
  - Or your custom domain: `https://api.yourdomain.com`
- **How to find your Worker URL**: After deployment, check the Workers dashboard - it will show your `*.workers.dev` URL

#### `ORIGIN` (Optional)
- **What it does**: Controls which domains can access your API (CORS)
- **Default**: `*` (allows all origins)
- **Recommended**: Set specific domains for security
  - Example: `https://yourfrontend.com,https://www.yourfrontend.com`
  - Or keep as `*` for development
- **Format**: Comma-separated list of URLs (no spaces after commas)

### 🟢 **Optional Variables (Nice to Have)**

#### `RATE_LIMIT_WINDOW_MS` (Optional)
- **What it does**: Time window for rate limiting in milliseconds
- **Default**: `60000` (60 seconds)
- **Example**: `60000` for 1 minute window

#### `RATE_LIMIT_LIMIT` (Optional)
- **What it does**: Maximum number of requests per window
- **Default**: `100` requests
- **Example**: `100` for 100 requests per window

#### `UPSTASH_REDIS_REST_URL` (Optional - Only if using Redis)
- **What it does**: Redis cache URL for caching API responses
- **Required with**: `UPSTASH_REDIS_REST_TOKEN`
- **How to get**: Sign up at [Upstash](https://upstash.com) and create a Redis database
- **Example**: `https://your-redis-db.upstash.io`

#### `UPSTASH_REDIS_REST_TOKEN` (Optional - Only if using Redis)
- **What it does**: Redis authentication token
- **Required with**: `UPSTASH_REDIS_REST_URL`
- **How to get**: From your Upstash Redis database dashboard

---

## Quick Start: Minimum Setup

**You don't need to set anything!** Your API will work with defaults. However, for production:

### Minimum Recommended Setup:
1. Set `BASE_URL` to your Worker URL (for documentation to work correctly)
   - After deployment, your URL will be: `https://hianime-api.your-username.workers.dev`
   - Set `BASE_URL` = `https://hianime-api.your-username.workers.dev`

### Example Dashboard Configuration:
```
BASE_URL = https://hianime-api.your-username.workers.dev
ORIGIN = *  (or your specific domain)
```

---

## Step-by-Step: Setting Variables in Dashboard

1. **Deploy your worker first** (even without variables - it will work with defaults)
   ```bash
   npm run deploy:worker
   ```

2. **Get your Worker URL** from the deployment output or dashboard

3. **Go to Cloudflare Dashboard**:
   - Workers & Pages → `hianime-api` → Settings → Variables

4. **Add Variables**:
   - Click **Add variable**
   - Enter variable name (e.g., `BASE_URL`)
   - Enter variable value (e.g., `https://hianime-api.your-username.workers.dev`)
   - Choose **Encrypted** for secrets (like Redis tokens) or **Plain text** for public values
   - Click **Save**

5. **Redeploy** (variables are saved automatically, but you may need to redeploy):
   ```bash
   npm run deploy:worker
   ```

---

## Setting Up Upstash Redis (Optional - For Caching)

If you want to enable Redis caching:

1. **Sign up at [Upstash](https://upstash.com)** (free tier available)
2. **Create a Redis database**
3. **Copy the REST URL and Token** from the database dashboard
4. **Set in Cloudflare**:
   - `UPSTASH_REDIS_REST_URL` = Your Redis REST URL
   - `UPSTASH_REDIS_REST_TOKEN` = Your Redis REST Token
5. **Benefits**: Faster responses for cached endpoints like `/api/v1/home`

---

## Testing Your Deployment

After deployment, test your API:

1. **Visit your Worker URL**: `https://hianime-api.your-username.workers.dev`
2. **Check documentation**: `https://hianime-api.your-username.workers.dev/ui`
3. **Test an endpoint**: `https://hianime-api.your-username.workers.dev/api/v1/home`

---

## Troubleshooting

### Variables not working?
- Make sure you **redeployed** after adding variables
- Check that variable names are **exactly** as shown (case-sensitive)
- For secrets, use **Encrypted** option in dashboard

### CORS errors?
- Set `ORIGIN` variable to your frontend domain
- Or keep it as `*` for development (less secure)

### Documentation not working?
- Set `BASE_URL` to your actual Worker URL (not localhost)

---

## Summary

**Minimum required**: Nothing! Your API works with defaults.

**Recommended for production**:
- `BASE_URL` = Your Worker URL
- `ORIGIN` = Your frontend domain(s) or `*`

**Optional for better performance**:
- Redis caching (`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`)
- Custom rate limits (`RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_LIMIT`)


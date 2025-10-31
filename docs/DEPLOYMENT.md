# Deployment Guide

This guide covers deploying your ORION Next.js application to various platforms.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Vercel Deployment](#vercel-deployment)
4. [Netlify Deployment](#netlify-deployment)
5. [Docker Deployment](#docker-deployment)
6. [Self-Hosted Deployment](#self-hosted-deployment)
7. [Post-Deployment](#post-deployment)

## Prerequisites

Before deploying, ensure you have:

- ✅ Working local build (`npm run build` succeeds)
- ✅ All environment variables configured
- ✅ Alpha Vantage API key obtained
- ✅ Code committed to Git repository
- ✅ All tests passing (`npm test`)

## Environment Variables

Required environment variables for production:

```env
# Alpha Vantage API (Required)
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_production_api_key

# Application Settings
NEXT_PUBLIC_APP_NAME=ORION
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Feature Flags
NEXT_PUBLIC_ENABLE_POLLING=true
NEXT_PUBLIC_ENABLE_EXPORT=true
```

⚠️ **Security Note:** Never commit `.env.local` to version control. Use platform-specific environment variable management.

## Vercel Deployment

Vercel is the recommended platform for Next.js applications.

### Method 1: Vercel Dashboard (Recommended)

1. **Sign up/Login to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub/GitLab/Bitbucket

2. **Import Project**
   - Click "Add New Project"
   - Import your Git repository
   - Select the repository

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add all variables from `.env.example`
   - Add your production Alpha Vantage API key

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate is automatically provisioned

### Continuous Deployment

Vercel automatically deploys:

- **Production**: Pushes to `main` branch
- **Preview**: Pushes to other branches
- **Comments**: Deploy previews on pull requests

## Netlify Deployment

### Method 1: Netlify UI

1. **Login to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Sign up/Login

2. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Connect to Git provider
   - Select repository

3. **Build Settings**

   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Environment Variables**
   - Site Settings → Environment Variables
   - Add all required variables

5. **Deploy**
   - Click "Deploy site"

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

### netlify.toml Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## Docker Deployment

### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copy necessary files from builder
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### .dockerignore

Create `.dockerignore`:

```
node_modules
.next
.git
.env.local
.DS_Store
npm-debug.log
```

### Build and Run

```bash
# Build image
docker build -t orion-app .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_key \
  orion-app
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=${ALPHA_VANTAGE_API_KEY}
      - NEXT_PUBLIC_APP_NAME=ORION
      - NEXT_PUBLIC_APP_URL=https://your-domain.com
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

## Self-Hosted Deployment

### Option 1: PM2 (Process Manager)

1. **Install PM2**

   ```bash
   npm install -g pm2
   ```

2. **Build Application**

   ```bash
   npm run build
   ```

3. **Create PM2 Ecosystem File**

   Create `ecosystem.config.js`:

   ```javascript
   module.exports = {
     apps: [
       {
         name: 'orion-app',
         script: 'npm',
         args: 'start',
         env: {
           NODE_ENV: 'production',
           PORT: 3000,
         },
       },
     ],
   };
   ```

4. **Start with PM2**

   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

5. **Monitor**
   ```bash
   pm2 monit
   pm2 logs
   ```

### Option 2: Systemd Service

1. **Create Service File**

   `/etc/systemd/system/orion.service`:

   ```ini
   [Unit]
   Description=ORION Next.js Application
   After=network.target

   [Service]
   Type=simple
   User=www-data
   WorkingDirectory=/var/www/orion
   ExecStart=/usr/bin/npm start
   Restart=on-failure
   Environment="NODE_ENV=production"
   Environment="PORT=3000"

   [Install]
   WantedBy=multi-user.target
   ```

2. **Enable and Start**
   ```bash
   sudo systemctl enable orion
   sudo systemctl start orion
   sudo systemctl status orion
   ```

### Nginx Reverse Proxy

Create `/etc/nginx/sites-available/orion`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/orion /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL with Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is configured automatically
```

## Post-Deployment

### Health Checks

Verify deployment:

- ✅ Application loads
- ✅ Market data fetches correctly
- ✅ Authentication works
- ✅ Polls are functional
- ✅ Export features work
- ✅ Error pages display correctly

### Monitoring

Set up monitoring:

1. **Vercel Analytics** (if using Vercel)
   - Automatically enabled
   - View in dashboard

2. **Google Analytics**
   - Add tracking code to `app/layout.tsx`

3. **Sentry** (Error Tracking)
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard -i nextjs
   ```

### Performance

Check performance:

- Run Lighthouse audit
- Check Core Web Vitals
- Monitor API response times
- Set up uptime monitoring

### Backup

Set up regular backups:

- Database backups (if applicable)
- Environment variables backup
- Code repository backup

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_` for client-side
- Restart server after adding variables
- Check platform-specific environment variable syntax

### API Calls Failing

- Verify API key is correct
- Check rate limits
- Ensure CORS is configured (if applicable)
- Review API endpoint URLs

### 404 Errors

- Verify output directory is `.next`
- Check Next.js configuration
- Ensure all required files are deployed

## Rollback

### Vercel

```bash
vercel rollback
```

### PM2

```bash
pm2 list  # Get app ID
pm2 stop <id>
pm2 delete <id>
# Redeploy previous version
```

### Docker

```bash
docker ps  # Get container ID
docker stop <container_id>
docker run <previous_image>
```

## Security Checklist

Before going live:

- ✅ Environment variables secured
- ✅ API keys rotated for production
- ✅ HTTPS enabled
- ✅ Security headers configured
- ✅ Rate limiting implemented
- ✅ CORS configured correctly
- ✅ Dependencies updated
- ✅ Security audit completed (`npm audit`)

## Support

For deployment issues:

1. Check application logs
2. Review platform-specific documentation
3. Open an issue in the repository
4. Contact platform support

---

**Recommended Platform:** Vercel (easiest, zero-config Next.js deployment)

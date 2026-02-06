# Deployment Guide for Render

This guide will help you deploy the STES Rocketry website on Render.

## Prerequisites

1. **GitHub Account**: Your code should be pushed to a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Gmail App Password**: For the contact form email functionality

## Step-by-Step Deployment Instructions

### Step 1: Prepare Gmail App Password

1. Go to your Google Account settings
2. Enable 2-Step Verification (if not already enabled)
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Generate a new app password for "Mail"
5. Copy the 16-character password (you'll need this for Step 4)

### Step 2: Push Code to GitHub

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### Step 3: Create Render Account & New Web Service

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** button → Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository: `Stes-Rocketry-Website` (or your repo name)

### Step 4: Configure Render Service

Fill in the following settings:

- **Name**: `stes-rocketry-website` (or any name you prefer)
- **Environment**: `Node`
- **Region**: Choose closest to your users (e.g., `Oregon (US West)`)
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave empty (uses root)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### Step 5: Set Environment Variables

In the Render dashboard, go to the **Environment** section and add:

1. **EMAIL_USER**: Your Gmail address (e.g., `your-email@gmail.com`)
2. **EMAIL_PASS**: The 16-character app password from Step 1
3. **NODE_ENV**: `production` (optional, but recommended)

### Step 6: Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Install dependencies (`npm install`)
   - Build your frontend (`npm run build`)
   - Start your server (`npm start`)
3. Wait for the build to complete (usually 2-5 minutes)

### Step 7: Access Your Website

Once deployed, Render will provide you with a URL like:
- `https://stes-rocketry-website.onrender.com`

You can also set up a custom domain in Render settings if you have one.

## Alternative: Using render.yaml (Recommended)

If you prefer automated configuration, you can use the included `render.yaml` file:

1. Make sure `render.yaml` is in your repository root
2. In Render dashboard, select **"New +"** → **"Blueprint"**
3. Connect your repository
4. Render will automatically detect and use `render.yaml`
5. Still need to set environment variables manually in the dashboard

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Contact Form Not Working
- Verify `EMAIL_USER` and `EMAIL_PASS` are set correctly
- Check that Gmail App Password is valid
- Review server logs in Render dashboard

### Static Files Not Loading
- Ensure `npm run build` completed successfully
- Check that `dist` folder exists after build
- Verify file paths in your HTML/CSS/JS

### Port Issues
- The server automatically uses Render's `PORT` environment variable
- No manual port configuration needed

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] Images and assets load properly
- [ ] Contact form sends emails successfully
- [ ] Mobile responsiveness works
- [ ] Custom domain configured (if applicable)

## Updating Your Site

To update your site after deployment:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update website"
   git push origin main
   ```
3. Render will automatically detect changes and redeploy

## Cost Information

- **Free Tier**: Render offers a free tier with limitations:
  - Services spin down after 15 minutes of inactivity
  - First request after spin-down may be slow (cold start)
- **Paid Plans**: Start at $7/month for always-on service

## Support

For Render-specific issues, check:
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)


# 🚀 Complete Deployment Guide - CCTV Management System

This guide will walk you through deploying your CCTV Management System to GitHub Pages step by step.

## 📋 Prerequisites

Before you begin, make sure you have:
- A GitHub account
- Git installed on your computer
- Node.js (v16 or higher) installed
- Basic knowledge of command line/terminal

## 🎯 Quick Start (5 Minutes)

### Step 1: Create Your Repository

1. **Go to GitHub** and create a new repository
   - Repository name: `cctv-management-system` (or your preferred name)
   - Make it public (required for free GitHub Pages)
   - Don't initialize with README (we'll add our files)

2. **Clone your empty repository**
   ```bash
   git clone https://github.com/YOURUSERNAME/cctv-management-system.git
   cd cctv-management-system
   ```

### Step 2: Add All Project Files

Create the following file structure in your repository:

```
cctv-management-system/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
├── README.md
├── LICENSE
└── DEPLOYMENT.md
```

**Copy all the files provided in the artifacts above into your local repository.**

### Step 3: Update Configuration

1. **Edit `package.json`** - Replace `yourusername` with your GitHub username:
   ```json
   {
     "homepage": "https://YOURUSERNAME.github.io/cctv-management-system"
   }
   ```

2. **Edit README.md** - Replace all instances of `yourusername` with your GitHub username

### Step 4: Initialize and Deploy

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Test locally** (optional but recommended)
   ```bash
   npm start
   ```
   Visit `http://localhost:3000` to test the app

3. **Commit and push your code**
   ```bash
   git add .
   git commit -m "Initial commit: CCTV Management System"
   git push origin main
   ```

### Step 5: Configure GitHub Pages

1. **Go to your repository on GitHub**
2. **Click on "Settings" tab**
3. **Scroll down to "Pages" section**
4. **Under "Source", select "GitHub Actions"**
5. **The GitHub Action will automatically run and deploy your site**

### Step 6: Access Your Live Site

After the GitHub Action completes (2-5 minutes), your site will be live at:
```
https://YOURUSERNAME.github.io/cctv-management-system
```

## 🔧 Detailed Configuration

### Environment Variables (Optional)

For additional configuration, create a `.env` file in your root directory:

```env
# Application Configuration
REACT_APP_SITE_NAME=Your Company CCTV Management
REACT_APP_COMPANY_NAME=Your Company Name
REACT_APP_VERSION=1.0.0

# Freshservice Configuration (for future integration)
REACT_APP_FRESHSERVICE_DOMAIN=yourcompany.freshservice.com
REACT_APP_FRESHSERVICE_API_KEY=your_api_key_here
```

### Custom Domain (Optional)

To use a custom domain:

1. **Create a CNAME file** in the `public/` directory:
   ```
   your-domain.com
   ```

2. **Configure your domain DNS** to point to:
   ```
   YOURUSERNAME.github.io
   ```

3. **Update GitHub Pages settings** to use your custom domain

### SSL Certificate

GitHub Pages automatically provides SSL certificates for `.github.io` domains and custom domains.

## 🛠️ Advanced Deployment Options

### Option 1: Manual Deployment with gh-pages

If you prefer manual deployments:

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy manually**
   ```bash
   npm run deploy
   ```

### Option 2: Deploy to Other Platforms

**Netlify:**
1. Connect your GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `build`

**Vercel:**
1. Connect your GitHub repo to Vercel
2. Framework preset: `Create React App`
3. Auto-deploy on push

**AWS S3 + CloudFront:**
1. Build the project: `npm run build`
2. Upload `build/` contents to S3 bucket
3. Configure CloudFront distribution

## 🔍 Troubleshooting

### Common Issues

**1. GitHub Pages not working**
- Check that your repository is public
- Verify GitHub Actions are enabled in repo settings
- Check the Actions tab for build errors

**2. 404 Error on refresh**
- Add a `404.html` file to `public/` that redirects to `index.html`
- This is normal for single-page applications

**3. Build failing**
- Check Node.js version (use v16+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for JavaScript errors in console

**4. Assets not loading**
- Verify the `homepage` field in `package.json` is correct
- Check that all asset paths are relative

### Debug GitHub Actions

1. **Go to the "Actions" tab** in your repository
2. **Click on the failed workflow**
3. **Expand the failed step** to see error details
4. **Common fixes:**
   - Update Node.js version in workflow
   - Fix package.json syntax errors
   - Check for missing dependencies

## 📊 Monitoring and Analytics

### Add Google Analytics (Optional)

1. **Create a Google Analytics account**
2. **Add tracking code to `public/index.html`**:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

### Performance Monitoring

The GitHub Action includes Lighthouse CI for performance monitoring:
- **Performance scores** are automatically generated
- **Results are posted** as GitHub comments on PRs
- **Historical data** is available in the Actions tab

## 🔄 Updates and Maintenance

### Regular Updates

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Update dependencies**
   ```bash
   npm update
   npm audit fix
   ```

3. **Test locally**
   ```bash
   npm start
   ```

4. **Deploy updates**
   ```bash
   git add .
   git commit -m "Update dependencies and features"
   git push origin main
   ```

### Backup Strategy

1. **Regular repository backups** (GitHub handles this)
2. **Export data** if you add a database later
3. **Document configuration changes**

## 📞 Support

If you encounter issues:

1. **Check the README.md** for basic troubleshooting
2. **Review GitHub Actions logs** for build errors
3. **Open an issue** on the repository
4. **Check GitHub Pages documentation**

## 🎉 Success!

Once deployed, you'll have:
- ✅ A professional CCTV management system
- ✅ Automatic deployments on code changes
- ✅ Free hosting on GitHub Pages
- ✅ SSL certificate included
- ✅ Mobile-responsive design
- ✅ PWA capabilities

Your application will be live at: `https://YOURUSERNAME.github.io/cctv-management-system`

---

**Need help?** Open an issue on the repository or check the GitHub Discussions section.

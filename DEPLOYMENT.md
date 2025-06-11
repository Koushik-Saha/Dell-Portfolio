# 🚀 Deployment Guide

This guide covers deploying the Koushik Saha Portfolio to Vercel with CI/CD, analytics, and performance monitoring.

## 📋 Prerequisites

- [Vercel Account](https://vercel.com/signup)
- [GitHub Account](https://github.com)
- [Vercel CLI](https://vercel.com/docs/cli) (optional)

## 🌐 Quick Deploy to Vercel

### Option 1: One-Click Deploy (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Koushik-Saha/Dell-Portfolio)

### Option 2: Manual Setup

1. **Connect GitHub Repository**
   ```bash
   # Visit https://vercel.com/new
   # Import your GitHub repository: Koushik-Saha/Dell-Portfolio
   ```

2. **Configure Project Settings**
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

3. **Deploy**
   - Click "Deploy"
   - Your site will be live at: `https://dell-portfolio-[random].vercel.app`

## ⚙️ Environment Variables

### Required for Full Functionality

Set these in your Vercel dashboard under **Settings** → **Environment Variables**:

```bash
# Supabase (if using authentication)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: Custom Resume URL
NEXT_PUBLIC_RESUME_URL=https://your-domain.com/resume.pdf
```

### Analytics (Automatic)

Vercel Analytics and Speed Insights are automatically enabled for Vercel deployments.

## 🔄 CI/CD Setup with GitHub Actions

### 1. Get Vercel Tokens

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Get your tokens
vercel --help
```

### 2. Set GitHub Secrets

In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions**:

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `VERCEL_TOKEN` | Vercel API Token | [Account Settings](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Organization ID | Run `vercel --help` in project |
| `VERCEL_PROJECT_ID` | Project ID | Run `vercel --help` in project |

### 3. Workflow Features

Our CI/CD pipeline includes:

- ✅ **Code Quality**: ESLint, TypeScript checking
- 🔒 **Security**: Vulnerability scanning with Trivy
- 🏗️ **Build**: Production build verification
- 📊 **Performance**: Lighthouse audits on PRs
- 🚀 **Deploy**: Automatic production deployment
- 🔍 **Preview**: PR preview deployments
- 📈 **Monitoring**: Bundle size analysis

## 📊 Performance Monitoring

### Vercel Analytics

- **Automatic**: Enabled for all Vercel deployments
- **Dashboard**: [Vercel Analytics Dashboard](https://vercel.com/analytics)
- **Features**: Page views, unique visitors, performance metrics

### Speed Insights

- **Real User Monitoring**: Core Web Vitals tracking
- **Dashboard**: Integrated with Vercel Analytics
- **Alerts**: Performance regression notifications

### Lighthouse CI

- **Automated**: Runs on every PR
- **Reports**: Performance, accessibility, SEO, best practices
- **Thresholds**: Configurable pass/fail criteria

## 🔗 Custom Domain Setup

### 1. Add Domain in Vercel

1. Go to your project dashboard
2. Navigate to **Settings** → **Domains**
3. Add your custom domain: `koushiksaha.dev`

### 2. Configure DNS

Point your domain to Vercel:

```
# A Record
Name: @
Value: 76.76.19.61

# CNAME Record
Name: www
Value: cname.vercel-dns.com
```

### 3. SSL Certificate

- **Automatic**: Vercel provides free SSL certificates
- **Renewal**: Automatic renewal every 90 days

## 📈 Analytics Setup

### Google Analytics (Optional)

1. Create a GA4 property
2. Add environment variable:
   ```bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. The analytics are already integrated in the code

## 🛠️ Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Branch Strategy

- **`main`**: Production deployments
- **`develop`**: Development branch (optional)
- **Feature branches**: Pull requests with preview deployments

### Pull Request Workflow

1. Create feature branch
2. Make changes and commit
3. Open PR to `main`
4. Automated checks run:
   - Code quality (ESLint, TypeScript)
   - Build verification
   - Performance audit (Lighthouse)
   - Preview deployment
5. Review and merge
6. Automatic production deployment

## 🔍 Monitoring & Maintenance

### Performance Monitoring

- **Vercel Analytics**: User behavior and performance
- **Speed Insights**: Core Web Vitals tracking
- **Lighthouse**: Automated performance audits

### Error Monitoring

Consider adding:
- [Sentry](https://sentry.io) for error tracking
- [LogRocket](https://logrocket.com) for session replay

### Uptime Monitoring

Consider adding:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://pingdom.com)

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build locally
   npm run build
   
   # Check TypeScript errors
   npx tsc --noEmit
   
   # Check ESLint issues
   npm run lint
   ```

2. **Environment Variables**
   - Ensure all required variables are set in Vercel dashboard
   - Check variable names match exactly (case-sensitive)

3. **Domain Issues**
   - Verify DNS settings
   - Check domain configuration in Vercel
   - Allow 24-48 hours for DNS propagation

### Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Issues**: [Repository Issues](https://github.com/Koushik-Saha/Dell-Portfolio/issues)

## 📚 Additional Resources

- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel Platform Overview](https://vercel.com/docs/concepts)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)

---

🎉 **Your portfolio is now ready for production deployment!**
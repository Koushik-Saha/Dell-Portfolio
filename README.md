# Dell Portfolio - Modern Portfolio Website

A beautiful, responsive portfolio website built with Next.js 15+, Tailwind CSS 4.1+, and Framer Motion. Features Apple-inspired design, dark mode support, and a comprehensive onboarding system.

## ✨ Features

- **Modern Tech Stack**: Next.js 15+, TypeScript, Tailwind CSS 4.1+
- **Smooth Animations**: Framer Motion with performance optimizations
- **Apple-Style Design**: Clean, minimalist aesthetic with smooth interactions
- **Dark Mode Support**: Using next-themes for seamless theme switching
- **Responsive Design**: Mobile-first approach, works on all devices
- **JSON-Based Content**: Easy content management system
- **Interactive Onboarding**: Complete form system with real-time updates
- **Background Animations**: Cursor-following gradients and floating elements
- **Authentication Ready**: Supabase integration for user accounts
- **Form Validation**: React Hook Form with Zod schema validation

## 🌐 Live Demo

🔗 **Production**: [https://dell-portfolio-koushik.vercel.app](https://dell-portfolio-koushik.vercel.app)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Koushik-Saha/Dell-Portfolio)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dell-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your Supabase credentials (optional for basic functionality)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
dell-portfolio/
├── app/                     # Next.js 13+ App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Landing page
│   ├── onboarding/         # Onboarding flow
│   └── portfolio/          # Portfolio showcase
├── components/             # Reusable components
│   ├── ui/                 # UI components (ThemeToggle, etc.)
│   ├── animations/         # Animation components
│   └── forms/              # Form components
├── lib/                    # Utilities and data
│   ├── data/               # JSON content system
│   ├── hooks/              # Custom React hooks
│   └── supabase/           # Database client
└── public/                 # Static assets
```

## 🎨 Customization

### Content Management

Edit `lib/data/portfolio.json` to customize:
- Personal information
- Skills and expertise
- Projects showcase
- Education & certificates
- Work experience
- Social links

### Styling

The design system uses:
- **Primary Colors**: Slate/Zinc palette
- **Accent Colors**: Customizable via CSS variables
- **Typography**: Inter font family
- **Animations**: Framer Motion variants

### Theme Customization

Update `tailwind.config.js` and `app/globals.css` for:
- Color schemes
- Custom animations
- Component styles
- Dark mode variations

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run type-check` - Run TypeScript type checking
- `npm run analyze` - Analyze bundle size
- `npm run preview` - Build and preview production locally
- `npm run deploy` - Deploy to Vercel production
- `npm run deploy:preview` - Deploy preview to Vercel

## 🚀 Deployment

### Vercel (Recommended)

This portfolio is optimized for deployment on Vercel:

1. **One-Click Deploy**: Use the deploy button above
2. **Manual Setup**: Import repository in [Vercel Dashboard](https://vercel.com/new)
3. **CLI Deploy**: Run `npm run deploy`

### CI/CD Pipeline

Automated deployment with GitHub Actions:
- ✅ Code quality checks (ESLint, TypeScript)
- 🔒 Security scanning
- 📊 Performance audits (Lighthouse)
- 🚀 Automatic production deployment
- 🔍 PR preview deployments

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

## 📱 Pages & Features

### Landing Page (`/`)
- Hero section with typewriter effect
- Apple-inspired design
- Smooth scroll indicators
- Social links integration
- Dark mode toggle

### Onboarding (`/onboarding`)
- Multi-step form wizard
- Real-time validation
- Progress indicators
- Auto-save functionality
- Success animations

### Portfolio (`/portfolio`)
- Project showcase grid
- Filtering by status
- Hover animations
- Responsive design
- Navigation to other sections

## 🌙 Dark Mode

Automatic dark mode support using `next-themes`:
- System preference detection
- Manual toggle
- Smooth transitions
- Persistent settings

## 📊 Performance

Optimized for performance:
- Next.js SSG/SSR
- Image optimization
- Code splitting
- Lazy loading
- Reduced motion support

## 🔐 Authentication (Optional)

Supabase integration includes:
- Google OAuth
- Session management
- User profiles
- Data persistence

### Supabase Setup

1. Create a new Supabase project
2. Add your credentials to `.env.local`
3. Run the provided SQL migrations
4. Configure Google OAuth in Supabase dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🎯 Future Enhancements

- [ ] Blog integration
- [ ] Contact form with email
- [ ] Analytics dashboard
- [ ] PWA support
- [ ] Internationalization
- [ ] Performance monitoring

## 💡 Tips

- Use the onboarding flow to quickly set up your portfolio
- Customize colors in `tailwind.config.js` to match your brand
- Add your own projects to the JSON file
- Enable Supabase for user accounts and data sync
- Test on multiple devices for responsive design

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
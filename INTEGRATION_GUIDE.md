# CONTAINED Site Integration Guide

## Overview
This package contains the complete CONTAINED campaign site that can be integrated into any Next.js application. The site includes:

- Interactive container journey experience
- Team profiles and story sections
- Video galleries and media players
- Form integrations with Notion API
- Economic impact visualizations
- Comprehensive about page with navigation

## Quick Integration

### 1. Install Dependencies
```bash
npm install @supabase/supabase-js clsx tailwindcss zod framer-motion
```

### 2. Copy Files
Copy these directories to your project:
```
src/
├── components/         # All CONTAINED components
├── content/           # Story data and content
├── lib/              # Utilities and API functions
└── app/              # Pages (if using App Router)
```

### 3. Environment Variables
Add to your `.env.local`:
```env
# Notion Integration
NOTION_TOKEN=your_notion_token
NOTION_DATABASE_ID=your_database_id

# Supabase (for media storage)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Integration (optional)
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

### 4. Tailwind Configuration
Update your `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    // ... your existing content
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'color-background': '#0A0A0A',
        'color-container-black': '#1A1A1A',
        'color-container-steel': '#2A2A2A',
        'color-hope-green': '#4ADE80',
        'color-warning-orange': '#FB923C',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      }
    }
  }
}
```

## Integration Options

### Option 1: Full Site Integration
Import the entire CONTAINED experience:
```jsx
import { ContainedApp } from './components/contained-app'

export default function MyPage() {
  return (
    <div>
      {/* Your existing content */}
      <ContainedApp />
    </div>
  )
}
```

### Option 2: Component-Level Integration
Use individual components:
```jsx
import { HeroSection } from './components/hero-section'
import { StoriesSection } from './components/stories-section'
import { AboutHero } from './components/about/about-hero'

export default function MyPage() {
  return (
    <div>
      <HeroSection />
      <StoriesSection />
      <AboutHero />
    </div>
  )
}
```

### Option 3: Route-Based Integration
Add CONTAINED as specific routes:
```
/contained          # Main campaign page
/contained/about    # About page
/contained/book     # Booking page
```

## File Structure

### Core Components
```
src/components/
├── hero-section.tsx           # Main hero with progress tracking
├── stories-section.tsx        # Team member stories
├── evidence-section.tsx       # Research and data
├── nominate-section.tsx       # Nomination form
├── book-section.tsx          # Booking experience
├── site-header.tsx           # Navigation
├── site-footer.tsx           # Footer
├── media-player.tsx          # Video/audio player
├── cta-button.tsx           # Call-to-action buttons
└── section-heading.tsx       # Consistent section headers
```

### About Page Components
```
src/components/about/
├── about-hero.tsx            # About page hero
├── about-navigation.tsx      # Sticky navigation
├── architects-section.tsx    # Team founders
├── truth-speakers-section.tsx # Advisory team
├── build-process-section.tsx # Video galleries
├── community-section.tsx     # Stats and testimonials
├── economics-section.tsx     # Financial model
├── vision-section.tsx        # Future roadmap
└── get-involved-section.tsx  # Engagement forms
```

### Content & Data
```
src/content/
├── stories.ts               # Team member data
├── progress-data.ts         # Campaign metrics
└── campaign-config.ts       # Global configuration
```

### Utilities
```
src/lib/
├── notion.ts               # Notion API integration
├── supabase.ts            # Supabase client
├── utils.ts               # Helper functions
└── validations.ts         # Zod schemas
```

## Customization

### Branding
Update colors in `tailwind.config.js` and component files:
```javascript
// Replace CONTAINED colors with your brand
'color-hope-green': '#your-primary-color',
'color-warning-orange': '#your-accent-color',
```

### Content
Modify content in:
- `src/content/stories.ts` - Team member information
- Component files - Copy and messaging
- `src/content/campaign-config.ts` - Global settings

### Media URLs
Update Supabase URLs in all components:
- Replace `your-project-id` with your Supabase project ID
- Upload media files following the naming convention in components

## API Integration

### Notion Forms
The site includes pre-built Notion integration for:
- Experience bookings
- Nominations
- Volunteer applications
- Investment inquiries

### Supabase Media
Configured for:
- Video hosting and streaming
- Image optimization
- File storage management

## Deployment

### Webflow Cloud (Current)
The site is configured for Webflow Cloud deployment:
```json
{
  "cosmic": {
    "framework": "nextjs"
  }
}
```

### Vercel/Netlify
Standard Next.js deployment - no additional configuration needed.

### Custom Domain
Update `next.config.js` for custom domains and CDN integration.

## Support Files

### Package Dependencies
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x.x",
    "clsx": "^2.x.x",
    "framer-motion": "^10.x.x",
    "next": "14.2.15",
    "react": "^18.x.x",
    "tailwindcss": "^3.x.x",
    "zod": "^3.x.x"
  }
}
```

### TypeScript Support
All components are fully typed with TypeScript interfaces.

## Getting Started

1. Clone or download the CONTAINED site files
2. Follow the integration steps above
3. Update environment variables
4. Customize branding and content
5. Upload media to Supabase
6. Deploy and test

## Need Help?

Contact the development team:
- Technical: dev@acurioustractor.com
- Integration: partnerships@acurioustractor.com

---

*This integration guide ensures the CONTAINED experience can be seamlessly embedded into any existing website while maintaining full functionality and visual consistency.*
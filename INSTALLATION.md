# CONTAINED Site Installation Guide

## Quick Start (5 minutes)

### 1. Copy Files to Your Project
```bash
# Copy the entire src directory
cp -r contained-site/src/ your-project/src/

# Or just the components you need
cp -r contained-site/src/components/ your-project/src/components/
```

### 2. Install Dependencies
```bash
npm install @supabase/supabase-js clsx zod framer-motion
```

### 3. Add to Your Page
```jsx
// For full CONTAINED experience
import { ContainedApp } from '@/components/contained-app'

export default function ContainedPage() {
  return <ContainedApp />
}
```

### 4. Update Tailwind Config
Add CONTAINED colors to your `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    // your existing content paths
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
    }
  }
}
```

### 5. Set Environment Variables (Optional)
```env
NOTION_TOKEN=your_notion_token
NOTION_DATABASE_ID=your_database_id
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Integration Options

### Option 1: Full Site Integration
Replace or add to your existing site:
```jsx
import { ContainedApp } from '@/components/contained-app'

export default function HomePage() {
  return (
    <div>
      {/* Your existing header/nav */}
      <ContainedApp showHeader={false} showFooter={false} />
      {/* Your existing footer */}
    </div>
  )
}
```

### Option 2: Individual Components
Pick and choose components:
```jsx
import { HeroSection } from '@/components/hero-section'
import { StoriesSection } from '@/components/stories-section'
import { AboutHero } from '@/components/about/about-hero'

export default function MyPage() {
  return (
    <>
      <HeroSection />
      <StoriesSection />
      <AboutHero />
    </>
  )
}
```

### Option 3: Route-Based
Add CONTAINED as specific routes in your Next.js app:

**app/contained/page.tsx**
```jsx
import { ContainedApp } from '@/components/contained-app'
export default function ContainedPage() {
  return <ContainedApp />
}
```

**app/contained/about/page.tsx**
```jsx
import { AboutHero, ArchitectsSection } from '@/components/about'
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ArchitectsSection />
      {/* Add other about sections */}
    </>
  )
}
```

## Customization

### Update Branding Colors
In your `tailwind.config.js`:
```javascript
colors: {
  'color-hope-green': '#your-primary-color',
  'color-warning-orange': '#your-accent-color',
  // Keep the container colors or customize them
}
```

### Update Content
Edit these files to customize content:
- `src/content/stories.ts` - Team member stories
- `src/content/progress-data.ts` - Campaign metrics
- Component files - Copy and messaging

### Update Media URLs
Replace `your-project-id` in all component files with your Supabase project ID:
```bash
# Find and replace across all files
find src/ -type f -name "*.tsx" -exec sed -i 's/your-project-id/YOUR_ACTUAL_PROJECT_ID/g' {} +
```

## File Structure After Integration

```
your-project/
├── src/
│   ├── components/
│   │   ├── hero-section.tsx
│   │   ├── stories-section.tsx
│   │   ├── about/
│   │   │   ├── about-hero.tsx
│   │   │   └── ... (all about components)
│   │   ├── contained-app.tsx
│   │   └── index.ts
│   ├── content/
│   │   ├── stories.ts
│   │   └── progress-data.ts
│   ├── lib/
│   │   ├── notion.ts
│   │   ├── supabase.ts
│   │   └── utils.ts
│   └── app/ (or pages/)
│       ├── contained/
│       │   ├── page.tsx
│       │   └── about/
│       │       └── page.tsx
│       └── ...
├── tailwind.config.js (updated)
├── package.json (updated)
└── .env.local (with CONTAINED vars)
```

## Testing Integration

### 1. Start Development Server
```bash
npm run dev
```

### 2. Visit Your Routes
- `/contained` - Main campaign page
- `/contained/about` - About page
- Or wherever you integrated the components

### 3. Check for Issues
- Tailwind styles loading correctly
- Components rendering without errors
- Media placeholders showing (until you add real media)
- Forms working (if you added Notion integration)

## Common Issues

### Styling Issues
- Ensure Tailwind config includes CONTAINED colors
- Check that your build process includes the component files
- Verify CSS-in-JS or styled-components don't conflict

### Component Errors
- Make sure all dependencies are installed
- Check that import paths match your project structure
- Ensure you have the required Next.js version (14+)

### Media Not Loading
- Replace `your-project-id` with actual Supabase project ID
- Upload media files with exact naming convention
- Check Supabase bucket permissions are public

## Production Deployment

### Build Test
```bash
npm run build
```

### Environment Variables
Set production environment variables:
- Notion API tokens
- Supabase credentials
- Any custom configuration

### Deploy
Deploy as you normally would - the CONTAINED components are standard Next.js/React components.

## Support

For integration issues:
- Check the `INTEGRATION_GUIDE.md` for detailed technical info
- Contact: partnerships@acurioustractor.com
- GitHub issues: https://github.com/acurioustractor/contained-site/issues

---

*This installation guide gets you up and running with CONTAINED in under 10 minutes.*
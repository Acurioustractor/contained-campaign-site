# CONTAINED Site Deployment Guide

## Part 1: GitHub Deployment ✅

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and click **New Repository**
2. Name it: `contained-campaign-site`
3. Make it **Public** (recommended for open source projects)
4. Don't initialize with README (we already have one)
5. Click **Create Repository**

### Step 2: Push Your Code to GitHub
From your project directory, run these commands:

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR-USERNAME/contained-campaign-site.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME` with your actual GitHub username**

### Step 3: Verify Upload
1. Go to your GitHub repository
2. Confirm all files are there
3. Check that your commit message appears

## Part 2: Deploy to Vercel (Recommended for Next.js)

### Why Vercel?
- Built specifically for Next.js
- Automatic deployments from GitHub
- Built-in environment variables
- Free tier available
- Perfect for your tech stack

### Step 1: Sign Up & Connect
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Import your `contained-campaign-site` repository
4. Click **Deploy**

### Step 2: Configure Environment Variables
In Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add these variables:

```
NOTION_API_TOKEN=your-notion-token-here
NOTION_NOMINATION_DB_ID=your-nomination-db-id
NOTION_BOOKING_DB_ID=your-booking-db-id
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
CAMPAIGN_END_DATE=2025-10-22
INITIAL_NOMINATION_COUNT=1247
```

### Step 3: Deploy & Test
1. Click **Deploy** in Vercel
2. Wait for build to complete
3. Click **Visit** to see your live site
4. Test forms and functionality

Your site will be live at: `https://contained-campaign-site-username.vercel.app`

## Part 3: Custom Domain Setup

### Option A: Subdomain of act.place
Set up: `contained.act.place`

**In Vercel:**
1. Go to **Settings** → **Domains**
2. Add domain: `contained.act.place`
3. Copy the DNS records Vercel provides

**In your DNS provider (where act.place is hosted):**
1. Add CNAME record:
   - Name: `contained`
   - Value: `cname.vercel-dns.com`

### Option B: Path-based routing
Set up: `act.place/contained`

**Requires reverse proxy setup:**
1. Configure your main site to proxy `/contained` to Vercel
2. This is more complex but keeps everything under one domain

## Part 4: Alternative Deployment Options

### Netlify (Alternative)
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

### GitHub Pages (Static only)
Not recommended for this project due to:
- No server-side rendering
- No API routes
- No environment variables

## Part 5: Webflow Cloud Migration Strategy

### Understanding Webflow Cloud
Webflow Cloud is designed for migrating existing websites to Webflow's visual editor while maintaining hosting flexibility.

### Migration Approach Options

#### Option 1: Full Webflow Migration (Recommended)
**Timeline: 3-4 weeks**

1. **Week 1: Design Recreation**
   - Recreate visual design in Webflow Designer
   - Set up responsive breakpoints
   - Import assets and images

2. **Week 2: CMS Setup**
   - Create CMS collections for stories
   - Import story data
   - Set up dynamic content binding

3. **Week 3: Forms & Integrations**
   - Build forms in Webflow
   - Set up Zapier → Notion integration
   - Add custom code for complex features

4. **Week 4: Custom Features**
   - Video player implementation
   - Progress bars and counters
   - Testing and optimization

#### Option 2: Hybrid Approach
**Keep complex features in Next.js, migrate marketing pages to Webflow**

- Landing page → Webflow
- Story showcase → Webflow with CMS
- Complex forms → Keep in Next.js
- Real-time features → Keep in Next.js

### Domain Strategy for act.place Integration

#### Recommended Structure:
```
act.place/                 (main site)
├── contained/            (Webflow marketing pages)
├── app/                  (Next.js complex features)
└── api/                  (Keep API endpoints)
```

#### Implementation:
1. **Webflow Pages:**
   - `act.place/contained` - Main campaign page
   - `act.place/contained/stories` - Story showcase
   - `act.place/contained/about` - About the campaign

2. **Next.js Features:**
   - `act.place/app/nominate` - Complex nomination form
   - `act.place/app/book` - Booking system
   - `act.place/api/*` - All API endpoints

## Part 6: Webflow Cloud Setup Steps

### Prerequisites
- Webflow account (Business plan or higher for CMS)
- Your site already deployed (GitHub + Vercel)
- Content organized and documented

### Step 1: Webflow Project Setup
1. Create new Webflow project
2. Name it "CONTAINED Campaign"
3. Choose appropriate template or start blank

### Step 2: Content Migration Plan
Create these CMS Collections:

**Stories Collection:**
- Name (Text)
- Role (Text)
- Quote (Rich Text)
- Biography (Rich Text)
- Profile Photo (Image)
- Video URL (Link)
- Category (Option: Youth, Expert, Leader, Community)
- Featured (Switch)

**Campaign Metrics Collection:**
- Metric Name (Text)
- Current Value (Number)
- Goal Value (Number)
- Unit (Text)
- Last Updated (Date)

### Step 3: Design Recreation
1. **Color Palette Setup:**
   - Hope Green: #27AE60
   - Container Black: #0F161E
   - Container Steel: #2C3E50
   - Warning Orange: #E67E22

2. **Typography:**
   - Headers: Display font (uppercase, tight tracking)
   - Body: Sans-serif, readable sizing
   - Responsive text sizing

3. **Component Library:**
   - CTA Button component
   - Section Heading component
   - Story Card component
   - Stats Card component

### Step 4: Custom Code Integration
Add to **Project Settings** → **Custom Code**:

**In `<head>` tag:**
```html
<!-- Supabase Client -->
<script src="https://unpkg.com/@supabase/supabase-js@2.57.4/dist/umd/supabase.min.js"></script>

<!-- Progress Bar Animations -->
<style>
  .progress-bar {
    transition: width 0.5s ease-in-out;
  }
  .counter {
    font-variant-numeric: tabular-nums;
  }
</style>
```

**In `</body>` tag:**
```html
<script>
// Initialize Supabase
const supabase = window.supabase.createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
);

// Progress bar animation
function animateProgress(elementId, current, goal) {
  const element = document.getElementById(elementId);
  const percentage = Math.min(100, (current / goal) * 100);
  element.style.width = percentage + '%';
}

// Counter animation
function animateCounter(elementId, target) {
  const element = document.getElementById(elementId);
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 20);
}
</script>
```

### Step 5: Form Integration
Use Webflow's native forms with Zapier:

1. **Create forms in Webflow**
2. **Set up Zapier automation:**
   - Trigger: Webflow Form Submission
   - Action: Create Notion Database Item
3. **Add client-side validation:**
```javascript
// Form validation
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    // Add your validation logic
    const email = form.querySelector('[name="email"]').value;
    if (!email.includes('@')) {
      e.preventDefault();
      alert('Please enter a valid email');
    }
  });
});
```

## Part 7: Testing & Launch Checklist

### Before Going Live:
- [ ] All forms submit correctly
- [ ] Videos play properly
- [ ] Progress bars animate
- [ ] Mobile responsive design works
- [ ] All links functional
- [ ] Environment variables set
- [ ] DNS configured correctly
- [ ] SSL certificate active

### Post-Launch:
- [ ] Set up analytics
- [ ] Monitor form submissions
- [ ] Test Notion integration
- [ ] Check page load speeds
- [ ] Verify SEO elements

## Part 8: Maintenance & Updates

### Content Updates:
- **Stories:** Add directly in Webflow CMS
- **Metrics:** Update via Supabase or Webflow CMS
- **Campaign data:** Update in Webflow CMS

### Code Updates:
- Push changes to GitHub
- Automatic deployment via Vercel/Netlify
- Test in staging environment first

## Support Resources

- **Webflow University**: [webflow.com/university](https://webflow.com/university)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Notion API**: [developers.notion.com](https://developers.notion.com)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

Your site will be live and ready to drive the CONTAINED campaign forward! 🚀
# act.place Integration Strategy

## Domain Architecture Options

### Option 1: Subdomain Approach (Recommended)
**Best for: Independent campaign site with easy setup**

```
act.place                     (your main site)
contained.act.place          (Webflow campaign site)
app.contained.act.place      (Next.js complex features)
api.contained.act.place      (API endpoints)
```

**Advantages:**
- Clean separation of concerns
- Easy to set up and manage
- No impact on main site
- Individual SSL certificates
- Independent hosting providers

**DNS Setup:**
```
CNAME contained.act.place     → proxy-ssl.webflow.com
CNAME app.contained.act.place → cname.vercel-dns.com
CNAME api.contained.act.place → cname.vercel-dns.com
```

### Option 2: Path-based Integration
**Best for: Unified experience under one domain**

```
act.place/                   (your main site)
act.place/contained/         (campaign landing - Webflow)
act.place/contained/stories/ (story showcase - Webflow)
act.place/app/contained/     (complex features - Next.js)
act.place/api/contained/     (API endpoints - Next.js)
```

**Advantages:**
- Single domain for SEO
- Unified user experience
- Shared authentication/cookies
- Consistent branding

**Requires:**
- Reverse proxy configuration on main server
- More complex setup
- Coordination with main site hosting

### Option 3: Hybrid Subdirectory
**Best for: Campaign prominence on main domain**

```
act.place/                   (main site)
act.place/contained/         (Webflow campaign)
└── External redirect to contained.act.place
```

**Setup:**
1. Create `/contained/` page on main site
2. Immediate redirect to `contained.act.place`
3. Maintains main domain prominence
4. Simple to implement

## Implementation Plans

### Plan A: Full Subdomain (Quickest Setup)

#### Step 1: Create GitHub Repository
```bash
# Already done! ✅
git remote add origin https://github.com/YOUR-USERNAME/contained-campaign-site.git
git push -u origin main
```

#### Step 2: Deploy Next.js to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Deploy with custom domain: `app.contained.act.place`

#### Step 3: Create Webflow Site
1. New Webflow project: "CONTAINED Campaign"
2. Custom domain: `contained.act.place`
3. Migrate design and content

#### Step 4: DNS Configuration
**In your DNS provider (where act.place is hosted):**
```
Type: CNAME
Name: contained
Value: proxy-ssl.webflow.com

Type: CNAME
Name: app.contained
Value: cname.vercel-dns.com
```

#### Step 5: Cross-linking
**From Webflow to Next.js:**
```html
<a href="https://app.contained.act.place/nominate">Nominate Now</a>
<a href="https://app.contained.act.place/book">Book Experience</a>
```

**From Next.js to Webflow:**
```jsx
<a href="https://contained.act.place/">Back to Campaign</a>
<a href="https://contained.act.place/stories">View All Stories</a>
```

### Plan B: Path-based Integration

#### Prerequisites
- Access to act.place server configuration
- Reverse proxy capability (nginx, Apache, Cloudflare)
- Coordination with main site team

#### Server Configuration Example (nginx)
```nginx
# Main site
location / {
    proxy_pass http://main-site-backend;
}

# Campaign pages (Webflow)
location /contained {
    proxy_pass https://contained-campaign.webflow.io;
    proxy_set_header Host contained-campaign.webflow.io;
    proxy_set_header X-Real-IP $remote_addr;
}

# Complex features (Next.js)
location /app/contained {
    proxy_pass https://contained-features.vercel.app;
    proxy_set_header Host contained-features.vercel.app;
}

# API endpoints
location /api/contained {
    proxy_pass https://contained-api.vercel.app;
}
```

## Content Strategy

### Webflow Site Structure
```
contained.act.place/
├── / (Hero, campaign overview)
├── /stories (CMS-driven testimonials)
├── /journey (three-container experience)
├── /evidence (statistics and sources)
└── /about (campaign background)
```

### Next.js App Structure
```
app.contained.act.place/
├── /nominate (complex nomination form)
├── /book (booking system with calendar)
├── /dashboard (admin metrics - password protected)
└── /api (form processing, integrations)
```

### Navigation Strategy
**Webflow site navigation:**
- Stories
- The Journey
- Evidence
- Take Action → Links to Next.js forms

**Next.js app navigation:**
- Back to Campaign → Webflow site
- View Stories → Webflow stories page
- Help/Contact

## SEO & Analytics Strategy

### Primary SEO Target: contained.act.place
- Main campaign content
- Story showcase
- Evidence and data
- Social media sharing

### Internal Linking
- Webflow → Next.js: "Take Action" CTAs
- Next.js → Webflow: "Learn More" links
- Cross-reference campaign elements

### Analytics Setup
**Google Analytics:**
- Single tracking ID across both domains
- Cross-domain tracking configured
- Goals for form submissions
- Event tracking for video plays

**Tracking Code (both sites):**
```javascript
// Enhanced ecommerce for goal tracking
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: {
    'custom_parameter_1': 'campaign_source'
  },
  linker: {
    domains: ['contained.act.place', 'app.contained.act.place']
  }
});
```

## User Journey Mapping

### Typical Flow:
1. **Entry**: `contained.act.place` (social media, direct)
2. **Engagement**: Browse stories, view journey
3. **Action**: Click "Nominate" → `app.contained.act.place/nominate`
4. **Completion**: Submit form → Thank you → Back to campaign
5. **Sharing**: Social share from campaign site

### Conversion Funnels:
- **Awareness**: Campaign landing page
- **Interest**: Story engagement, video views
- **Consideration**: Journey section, evidence
- **Action**: Form submissions
- **Advocacy**: Social sharing, newsletter signup

## Technical Integration Points

### Shared Components
**Create shared design system:**
```css
/* CSS Variables for consistent branding */
:root {
  --color-hope-green: #27AE60;
  --color-container-black: #0F161E;
  --color-warning-orange: #E67E22;
  --font-display: 'YourDisplayFont';
  --font-body: 'YourBodyFont';
}
```

### Cross-domain Session Management
**If needed for user tracking:**
```javascript
// Store campaign engagement data
localStorage.setItem('campaign_progress', JSON.stringify({
  stories_viewed: ['joe-kwon', 'amara'],
  journey_completed: true,
  last_visit: Date.now()
}));
```

### API Integration
**Shared metrics endpoint:**
```javascript
// Both sites can fetch latest metrics
fetch('https://app.contained.act.place/api/metrics')
  .then(res => res.json())
  .then(data => {
    updateProgressBars(data.nominations);
    updateCounters(data.bookings);
  });
```

## Launch Sequence

### Phase 1: Soft Launch (Week 1)
1. Deploy Next.js app to staging
2. Set up Webflow project
3. Configure DNS for subdomains
4. Test cross-linking

### Phase 2: Content Migration (Week 2)
1. Import stories to Webflow CMS
2. Recreate design in Webflow
3. Set up forms in Next.js
4. Test integrations

### Phase 3: Testing (Week 3)
1. Cross-browser testing
2. Mobile responsiveness
3. Form submission flows
4. Analytics verification

### Phase 4: Launch (Week 4)
1. Update main act.place site with campaign link
2. Social media announcements
3. Email campaigns
4. Monitor and optimize

## Maintenance Plan

### Content Updates
- **Stories**: Update via Webflow CMS
- **Metrics**: Real-time via Supabase
- **Campaign copy**: Webflow editor

### Technical Updates
- **Next.js features**: Git → Vercel auto-deploy
- **Webflow design**: Visual editor
- **Integrations**: Monitor via Zapier/webhooks

Your campaign will have maximum impact with this integrated approach! 🎯
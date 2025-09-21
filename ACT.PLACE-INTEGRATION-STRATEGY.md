# CONTAINED Integration into Existing act.place Site

## Overview
Integrate the CONTAINED campaign into your existing act.place Webflow site while maintaining brand consistency and design system.

## Architecture Strategy

### Unified Design System Approach
```
act.place (existing Webflow site)
├── /                        (existing homepage)
├── /about, /services, etc.  (existing pages)
├── /contained/              (NEW: campaign landing)
├── /contained/stories/      (NEW: story showcase - Webflow CMS)
├── /contained/journey/      (NEW: three-container experience)
└── /contained/app/          (NEW: Next.js app via Webflow Cloud)
    ├── /nominate/           (complex nomination form)
    ├── /book/               (booking system)
    └── /dashboard/          (admin metrics)
```

## Implementation Steps

### Phase 1: Webflow Design Integration (Week 1)

#### 1.1 Create CONTAINED Pages in Existing Site
**In your act.place Webflow project:**

1. **Add new pages:**
   - Slug: `contained`
   - Title: "CONTAINED Campaign"
   - Description: "Transform Youth Justice Through Immersive Advocacy"

2. **Create story showcase page:**
   - Slug: `contained/stories`
   - Title: "Stories - CONTAINED"

3. **Create journey page:**
   - Slug: `contained/journey`
   - Title: "The Journey - CONTAINED"

#### 1.2 Extend Your Design System
**Add CONTAINED-specific components using your existing styles:**

**Story Card Component:**
```css
/* Using your existing color palette */
.story-card {
  background: var(--your-dark-color);
  border: 1px solid var(--your-accent-color);
  border-radius: var(--your-border-radius);
}

.story-quote {
  color: var(--your-text-color);
  font-family: var(--your-body-font);
}
```

**Progress Bar Component:**
```css
.campaign-progress {
  background: var(--your-background-color);
  border-radius: var(--your-border-radius);
}

.progress-fill {
  background: var(--your-accent-color);
  transition: width 0.5s ease;
}
```

#### 1.3 Update Navigation
**Add CONTAINED to your existing header:**
- Add "CONTAINED" to main navigation
- Links to `/contained`
- Maintains your existing menu styling

### Phase 2: CMS Setup (Week 1-2)

#### 2.1 Create Stories Collection
**In Webflow CMS:**

```
Collection Name: CONTAINED Stories
Fields:
├── Name (Plain Text) *required
├── Role (Plain Text)
├── Quote (Rich Text)
├── Biography (Rich Text)
├── Profile Photo (Image)
├── Video URL (Link URL)
├── Video Thumbnail (Image)
├── Category (Option: Youth, Expert, Leader, Community)
├── Featured Story (Switch)
├── Display Order (Number)
└── Published (Switch)
```

#### 2.2 Import Your Story Data
**Convert from your `src/content/stories.ts`:**

```typescript
// Export stories for Webflow import
const exportStories = campaignStories.map(story => ({
  name: story.name,
  role: story.role,
  quote: story.quote,
  video_url: story.supabaseVideoUrl,
  category: story.category || 'Expert',
  featured: story.id === 'change-maker',
  published: true
}));

console.log(JSON.stringify(exportStories, null, 2));
```

### Phase 3: Webflow Cloud Setup (Week 2)

#### 3.1 Enable Webflow Cloud on Your Site
1. **In your act.place project settings:**
   - Click "Webflow Cloud"
   - Connect GitHub account
   - Enable Webflow Cloud

#### 3.2 Initialize Your Next.js App
```bash
# In your project directory
webflow cloud init

# Configuration:
# Framework: Next.js
# Mount path: /contained/app
# Site: act.place (your existing site)
# Import design system: Yes
```

#### 3.3 Design System Sync
After initialization, you'll get:
```
devlink/
├── _Builtin/           # Basic Webflow components
├── Header/             # Your existing header component
├── Footer/             # Your existing footer component
├── Button/             # Your existing button styles
└── variables.css       # Your site's CSS variables
```

### Phase 4: Content Integration (Week 2-3)

#### 4.1 Create Campaign Landing Page
**Structure in Webflow Designer:**

```html
<!-- Uses your existing header component -->
<Header />

<!-- Campaign hero (new component) -->
<section class="campaign-hero">
  <h1>CONTAINED</h1>
  <p>Transform Youth Justice Through Immersive Advocacy</p>
  <!-- Progress bars with live data -->
  <div class="campaign-metrics">
    <div class="progress-bar" id="nomination-progress"></div>
  </div>
</section>

<!-- Journey section -->
<section class="journey-section">
  <!-- Three container cards -->
</section>

<!-- Stories preview -->
<section class="stories-preview">
  <!-- Collection list showing featured stories -->
</section>

<!-- CTAs linking to Webflow Cloud app -->
<section class="campaign-actions">
  <a href="/contained/app/nominate">Nominate a Leader</a>
  <a href="/contained/app/book">Book Experience</a>
</section>

<!-- Uses your existing footer -->
<Footer />
```

#### 4.2 Style Integration
**Use your existing design tokens:**

```css
/* Campaign-specific extensions of your design system */
.campaign-hero {
  background: linear-gradient(var(--your-primary), var(--your-secondary));
  padding: var(--your-section-padding);
}

.story-card {
  background: var(--your-card-background);
  border: var(--your-border-style);
  font-family: var(--your-body-font);
}
```

### Phase 5: Dynamic Features (Week 3)

#### 5.1 Add Custom Code for Live Data
**In Webflow Custom Code:**

```html
<script>
// Connect to your Supabase for live metrics
const SUPABASE_URL = 'your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

// Update progress bars with live data
async function updateCampaignMetrics() {
  // Fetch from your existing Supabase setup
  const response = await fetch(`https://${SUPABASE_URL}/rest/v1/campaign_metrics`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY
    }
  });

  const metrics = await response.json();

  metrics.forEach(metric => {
    const progressBar = document.querySelector(`[data-metric="${metric.metric_name}"]`);
    if (progressBar) {
      const percentage = (metric.current_value / metric.goal_value) * 100;
      progressBar.style.width = percentage + '%';
    }
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateCampaignMetrics);
</script>
```

#### 5.2 Cross-Site Navigation
**Seamless navigation between Webflow pages and Next.js app:**

```javascript
// In your Next.js app layout
export default function Layout({ children }) {
  return (
    <div>
      {/* Import your Webflow header */}
      <Header />

      {/* Your Next.js content */}
      {children}

      {/* Back to campaign navigation */}
      <nav>
        <a href="/contained">← Back to Campaign</a>
        <a href="/contained/stories">View All Stories</a>
      </nav>

      {/* Import your Webflow footer */}
      <Footer />
    </div>
  );
}
```

### Phase 6: Deployment & Testing (Week 3-4)

#### 6.1 Deploy Webflow Cloud App
```bash
# Deploy your Next.js features
webflow cloud deploy
```

#### 6.2 Update GitHub Repository
```bash
# Commit Webflow Cloud configuration
git add .
git commit -m "Add Webflow Cloud integration for CONTAINED campaign"
git push origin main
```

#### 6.3 Test Integration
1. **Static pages**: `act.place/contained`
2. **Story showcase**: `act.place/contained/stories`
3. **Interactive forms**: `act.place/contained/app/nominate`
4. **Cross-navigation**: Links between all sections

## Benefits of This Approach

✅ **Brand Consistency**: Uses your existing act.place design system
✅ **SEO Advantage**: All under one domain
✅ **User Experience**: Seamless navigation
✅ **Maintenance**: Update designs in one place
✅ **Performance**: Leverages your existing optimizations
✅ **Team Workflow**: Designers can update campaign content

## Content Management Workflow

### For Designers (Webflow):
- Update campaign landing page
- Add/edit stories in CMS
- Modify journey content
- Adjust styling and layout

### For Developers (Next.js):
- Complex form logic
- API integrations
- Real-time features
- Data processing

## Launch Strategy

1. **Week 1**: Create pages in existing site
2. **Week 2**: Set up Webflow Cloud integration
3. **Week 3**: Import content and test
4. **Week 4**: Launch campaign

Your CONTAINED campaign will feel like a natural extension of act.place while leveraging the power of your existing brand and design system! 🎯
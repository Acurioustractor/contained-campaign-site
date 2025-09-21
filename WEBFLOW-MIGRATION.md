# Webflow Cloud Migration & Domain Strategy

## Quick Start: GitHub → Webflow Pipeline

### Step 1: Complete GitHub Setup (5 minutes)
```bash
# In your terminal, from the project directory:
git remote add origin https://github.com/YOUR-USERNAME/contained-campaign-site.git
git push -u origin main
```

### Step 2: Deploy to Vercel First (10 minutes)
1. Go to [vercel.com](https://vercel.com)
2. **Import Git Repository** → Select your GitHub repo
3. **Deploy** (build will auto-complete)
4. Get your live URL: `https://contained-campaign-site.vercel.app`

### Step 3: Add Environment Variables
In Vercel Settings → Environment Variables:
```
NOTION_API_TOKEN=your-notion-token
NOTION_NOMINATION_DB_ID=your-db-id
NOTION_BOOKING_DB_ID=your-booking-db-id
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Domain Strategy for act.place Integration

### Recommended Structure:
```
act.place/                     (your main site)
├── contained/                 (Webflow campaign - marketing)
│   ├── stories/              (story showcase)
│   └── about/                (campaign info)
├── app/contained/            (Next.js - complex features)
│   ├── nominate/             (nomination form)
│   ├── book/                 (booking system)
│   └── dashboard/            (admin/metrics)
└── api/contained/            (API endpoints)
```

### Implementation Options:

#### Option A: Subdomain Approach (Easiest)
- **Webflow**: `contained.act.place` (marketing & stories)
- **Next.js**: `app.contained.act.place` (complex features)

**Setup:**
1. In your DNS provider, add CNAME:
   - `contained` → `proxy-ssl.webflow.com`
   - `app.contained` → `cname.vercel-dns.com`

#### Option B: Path-based (Unified domain)
- **Webflow**: `act.place/contained/` (marketing)
- **Next.js**: `act.place/app/contained/` (features)

**Setup requires reverse proxy configuration on your main server**

## Webflow Cloud Migration Steps

### Phase 1: Project Setup (Day 1)

1. **Create Webflow Project**
   - Sign up for Webflow Business plan (needed for CMS)
   - Create new project: "CONTAINED Campaign"
   - Choose blank template

2. **Set Up Custom Domain**
   - In Webflow: Project Settings → Hosting → Add Custom Domain
   - Enter: `contained.act.place`
   - Follow DNS setup instructions

### Phase 2: CMS Structure (Day 2-3)

Create these Collections in Webflow:

#### Stories Collection
```
Name: Stories
Fields:
├── Name (Plain Text) - Required
├── Role (Plain Text)
├── Quote (Rich Text)
├── Biography (Rich Text)
├── Profile Photo (Image)
├── Video URL (Link URL)
├── Video Thumbnail (Image)
├── Category (Option: Youth, Expert, Leader, Community)
├── Featured (Switch)
├── Display Order (Number)
└── Published (Switch)
```

#### Campaign Metrics Collection
```
Name: Campaign Metrics
Fields:
├── Metric Name (Plain Text) - Required
├── Current Value (Number)
├── Goal Value (Number)
├── Unit (Plain Text)
├── Description (Rich Text)
└── Last Updated (Date/Time)
```

### Phase 3: Design Recreation (Day 4-7)

#### Color System Setup
In Webflow Designer → Style Panel:
```css
Colors:
- Hope Green: #27AE60
- Container Black: #0F161E
- Container Steel: #2C3E50
- Warning Orange: #E67E22
- Background: #0A1018
```

#### Component Library
Create these reusable components:

1. **CTA Button**
   - Primary (accent orange)
   - Secondary (white outline)
   - Size variants (small, medium, large)

2. **Section Heading**
   - Eyebrow text (small caps)
   - Main heading (display font)
   - Description text
   - Alignment options

3. **Story Card**
   - Media area (video/photo)
   - Person info
   - Quote/bio text
   - CTA button
   - Stats highlight

### Phase 4: Data Migration (Day 8-10)

#### Import Stories Data
1. Export current stories from `src/content/stories.ts`
2. Create CSV with columns matching CMS fields
3. Import via Webflow CMS → Import

**Example CSV structure:**
```csv
Name,Role,Quote,Video URL,Category,Featured,Published
Joe Kwon,Founder Confit Pathways,"The first container feels like...",https://supabase.co/video.mp4,Leader,true,true
```

#### Set Up Dynamic Content
1. Create Collection List for stories
2. Bind CMS fields to design elements
3. Add conditional visibility for different media types

### Phase 5: Custom Code Integration (Day 11-14)

#### Add to Project Settings → Custom Code

**In `<head>`:**
```html
<!-- Supabase & External Libraries -->
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<!-- Custom Styles -->
<style>
.progress-animate {
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.counter-font {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
}
</style>
```

**In `</body>`:**
```html
<script>
// Initialize Supabase
const supabase = window.supabase.createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
);

// Progress Bar Animation
function updateProgress() {
  // Fetch current metrics from Supabase
  supabase.from('campaign_metrics').select('*').then(({ data }) => {
    data.forEach(metric => {
      const element = document.querySelector(`[data-metric="${metric.metric_name}"]`);
      if (element) {
        const percentage = (metric.current_value / metric.goal_value) * 100;
        element.style.width = percentage + '%';

        // Update counter text
        const counter = document.querySelector(`[data-counter="${metric.metric_name}"]`);
        if (counter) {
          animateCounter(counter, metric.current_value);
        }
      }
    });
  });
}

// Counter Animation
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Video Player Enhancement
function enhanceVideoPlayers() {
  document.querySelectorAll('[data-video-url]').forEach(container => {
    const videoUrl = container.dataset.videoUrl;
    const posterUrl = container.dataset.poster;

    if (videoUrl) {
      container.innerHTML = `
        <video controls poster="${posterUrl}" style="width:100%;height:100%;object-fit:cover;">
          <source src="${videoUrl}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  updateProgress();
  enhanceVideoPlayers();

  // Update metrics every 30 seconds
  setInterval(updateProgress, 30000);
});
</script>
```

### Phase 6: Forms & Integrations (Day 15-17)

#### Set Up Webflow Forms
1. **Nomination Form:**
   - Name, Email, Organization
   - Target Person details
   - Relationship dropdown
   - Submit button

2. **Booking Form:**
   - Contact details
   - Group size
   - Preferred dates
   - Special requirements

#### Zapier Integration
1. Create Zapier account
2. Set up automations:
   - **Trigger**: Webflow Form Submission
   - **Action**: Create Notion Database Item
   - **Filter**: Form name matches
   - **Data mapping**: Map form fields to Notion properties

### Phase 7: Testing & Optimization (Day 18-21)

#### Functionality Testing
- [ ] All forms submit correctly
- [ ] Videos load and play
- [ ] Progress bars animate
- [ ] Counters update
- [ ] Mobile responsive
- [ ] Cross-browser compatible

#### Performance Optimization
- [ ] Compress images
- [ ] Minimize custom code
- [ ] Enable Webflow hosting optimizations
- [ ] Test page load speeds

### Phase 8: Launch Strategy

#### Pre-Launch Checklist
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Forms tested with real submissions
- [ ] Analytics tracking set up
- [ ] SEO meta tags configured
- [ ] Backup of current site created

#### Launch Process
1. **Soft Launch**: Test with small group
2. **Update DNS**: Point `contained.act.place` to Webflow
3. **Monitor**: Watch for issues in first 24 hours
4. **Full Launch**: Announce to wider audience

## Alternative: Hybrid Approach

If full migration seems complex, consider this hybrid setup:

### Webflow (Marketing & Stories)
- Landing page
- Story showcase
- Campaign information
- Static content

### Next.js (Complex Features)
- Nomination form with validation
- Booking system with calendar
- Real-time dashboards
- API endpoints

### Domain Structure:
```
contained.act.place/          (Webflow - marketing)
├── stories/                  (CMS-driven stories)
├── about/                    (campaign info)
app.contained.act.place/      (Next.js - features)
├── nominate/                 (complex form)
├── book/                     (booking system)
└── dashboard/                (admin features)
```

## Cost Breakdown

### Webflow Costs:
- **Site Plan**: $14/month (Basic CMS)
- **Business Plan**: $39/month (Advanced CMS) - Recommended
- **Custom Domain**: Included

### Additional Services:
- **Zapier**: $20/month (for form automation)
- **Vercel**: Free tier (for Next.js hosting)
- **Supabase**: Free tier (for database)

**Total Monthly**: ~$59/month for full-featured setup

## Next Steps

1. **Immediate**: Create GitHub repository and deploy to Vercel
2. **This Week**: Set up Webflow project and start design recreation
3. **Next Week**: Import content and set up CMS
4. **Week 3**: Add custom code and integrations
5. **Week 4**: Testing and launch

Your CONTAINED campaign will have a powerful, visually stunning presence that drives real action! 🚀
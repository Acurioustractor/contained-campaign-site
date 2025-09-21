# CONTAINED Site Technical Documentation

## Overview

CONTAINED is a Next.js-based advocacy website for a youth justice campaign in Queensland, Australia. The site features an immersive journey through three containers representing current detention reality, therapeutic alternatives, and a vision for the future. It includes forms for nominations and bookings, real-time activity feeds, and media-rich storytelling components.

## 1. Technology Stack Overview

### Core Framework and Technologies
- **Next.js 15.5.3** with App Router architecture
- **React 19.1.0** with React DOM
- **TypeScript 5** for type safety
- **Turbopack** for development builds (enabled via `--turbopack` flag)

### Styling and Design
- **Tailwind CSS 4** (latest version) with custom theme tokens
- **PostCSS** for CSS processing
- **Custom CSS variables** for brand colors and theme configuration
- **Google Fonts**: Inter (body text) and Bebas Neue (display/headings)

### Data and Backend Services
- **Notion API** (@notionhq/client v5.1.0) for form submissions and data storage
- **Supabase** (@supabase/supabase-js v2.57.4) for stories, metrics, and activity feed
- **Zod 4.1.9** for runtime validation and type generation

### Development and Quality
- **ESLint** with Next.js configuration
- **Playwright** for end-to-end testing and accessibility checks
- **TypeScript** strict mode enabled
- **Pixelmatch** for visual regression testing

### Deployment
- **Vercel-ready** (configured for Next.js deployment)
- Environment variables for API keys and configuration

## 2. Site Architecture

### Page Structure and Routing
The site uses Next.js App Router with a single-page application structure:

```
/Users/benknight/Code/Contained/contained-site/src/app/
├── layout.tsx          # Root layout with fonts, metadata, skip links
├── page.tsx           # Main landing page with all sections
├── globals.css        # Global styles and Tailwind imports
└── api/
    ├── nomination/
    │   └── route.ts   # POST endpoint for nomination form
    └── booking/
        └── route.ts   # POST endpoint for booking form
```

### Component Hierarchy
Components are organized in `/src/components/` with clear separation of concerns:

**Layout Components:**
- `SiteHeader` - Navigation and branding
- `SiteFooter` - Footer links and information
- `UrgencyBanner` - Fixed position campaign urgency messaging

**Content Sections:**
- `Hero` - Main landing section with call-to-action
- `JourneySection` - Three-container experience showcase
- `StoriesSection` - Video/photo testimonials carousel
- `ActionTracks` - Nomination and booking CTAs
- `ActivityFeed` - Real-time activity updates
- `EvidenceGrid` - Data points and statistics

**Interactive Components:**
- `forms/NominationForm` - Leader nomination submission
- `forms/BookingForm` - Experience booking submission
- `MediaPlayer` - Multi-source video/image player
- `CTAButton` - Styled call-to-action buttons

**Utility Components:**
- `SectionHeading` - Consistent section headers with eyebrow text

### Data Flow Patterns

**Static Content:**
- Campaign data, journey containers, narrative pillars stored in `/src/content/`
- TypeScript modules export structured data objects
- No build-time data fetching - all content is statically imported

**Form Submissions:**
1. Client-side validation with Zod schemas
2. POST to API routes (`/api/nomination` or `/api/booking`)
3. Server-side re-validation
4. Notion API integration for data persistence
5. Success/error feedback to user

**Dynamic Content (Planned):**
- Supabase integration prepared for stories, metrics, and activity feed
- Currently using seed data with hooks ready for live data

## 3. Core Components Breakdown

### Form Components

**NominationForm** (`/src/components/forms/nomination-form.tsx`)
- **Purpose**: Collect nominations for decision makers to experience CONTAINED
- **Fields**: Leader name, position, organisation, category, reason, optional email
- **Validation**: Zod schema with field-level error display
- **Submission**: Posts to `/api/nomination` → Notion database
- **State Management**: Local React state with form status tracking

**BookingForm** (`/src/components/forms/booking-form.tsx`)
- **Purpose**: Book 30-minute container experiences
- **Fields**: Date, time, group size, contact details, contribution amount, accessibility needs
- **Dependencies**: Similar pattern to NominationForm
- **Payment**: "Pay what you can" model ($0-$50 optional contribution)

### Media Components

**StoriesSection** (`/src/components/stories-section.tsx`)
- **Media Sources**:
  - Supabase-hosted videos (primary)
  - Descript embeds (legacy support)
  - Local video files
  - Static images with Next.js Image optimization
- **Features**: Video players with poster images, transcript links, highlight statistics
- **Responsive**: Grid layout adapting from 1 to 3 columns

**MediaPlayer** (`/src/components/media-player.tsx`)
- **Video Sources**: YouTube, Vimeo, Supabase/local files
- **Image Handling**: Next.js Image component with optimization
- **Aspect Ratios**: Video (16:9), square (1:1), portrait (3:4)
- **Error Handling**: Graceful fallbacks for failed media loads

### Activity and Metrics

**ActivityFeed** (`/src/components/activity-feed.tsx`)
- **Current**: Static seed data from `/src/content/activity.ts`
- **Planned**: Real-time updates from Supabase
- **Display**: Timeline format with actor, action, timestamp
- **Accessibility**: `aria-live="polite"` for screen readers

**EvidenceGrid** (`/src/components/evidence-grid.tsx`)
- **Data**: Statistical highlights from `/src/content/campaign.ts`
- **Format**: Key metrics with sources and context
- **Updates**: Manual content updates, ready for dynamic data

### Navigation and Layout

**SiteHeader** (`/src/components/site-header.tsx`)
- **Features**: Responsive navigation, campaign branding
- **Accessibility**: Skip links, proper focus management
- **Mobile**: Optimized for touch interfaces

**UrgencyBanner** (`/src/components/urgency-banner.tsx`)
- **Position**: Fixed bottom banner for campaign urgency
- **Content**: Dynamic countdown to campaign end date
- **Dismissible**: User can close banner (state not persisted)

## 4. Data Management

### Static Data Sources

**Campaign Configuration** (`/src/content/campaign.ts`)
```typescript
export const campaignMetadata = {
  name: "CONTAINED",
  launchDate: "2025-10-22",
  counters: { baseNominations: 1247, goalNominations: 2500 }
}

export const journeyContainers = [
  { id: "current-reality", stats: [...] },
  { id: "therapeutic-model", stats: [...] },
  { id: "future-vision", stats: [...] }
]
```

**Stories Data** (`/src/content/stories.ts`)
- Testimonial content with media references
- Support for multiple video sources and image assets
- Metadata for highlights, roles, and transcript links

**Activity Seed** (`/src/content/activity.ts`)
- Sample activity items for development
- Structure ready for live data replacement

### Database Integrations

**Notion Integration** (`/src/lib/notion.ts`)
- **Authentication**: API token-based access
- **Operations**: Create pages in specified databases
- **Form Mapping**: Transform form data to Notion properties
- **Error Handling**: Graceful failures with user feedback

**Supabase Integration** (`/src/lib/supabase.ts`)
- **Setup**: Client-side SDK configuration
- **Tables**: Stories, campaign metrics, activity feed
- **Types**: Generated TypeScript definitions in `/src/types/supabase.ts`
- **Current Status**: Infrastructure ready, not actively used

### API Endpoints

**POST /api/nomination**
- Validates nomination form data with Zod
- Maps fields to Notion database properties
- Returns success/error responses with appropriate HTTP status codes
- Handles validation errors with field-specific messaging

**POST /api/booking**
- Similar pattern to nomination endpoint
- Additional validation for dates, times, and contribution amounts
- Support for accessibility requirements and group bookings

### Environment Configuration

**Required Variables** (`/src/lib/env.ts`)
```
NOTION_API_TOKEN          # Notion integration token
NOTION_NOMINATION_DB_ID   # Database ID for nominations
NOTION_BOOKING_DB_ID      # Database ID for bookings
CAMPAIGN_END_DATE         # Campaign deadline (default: 2025-10-22)
INITIAL_NOMINATION_COUNT  # Baseline nomination count
INITIAL_SLOT_TOTAL        # Daily booking slots available
```

**Optional Supabase Variables**
```
NEXT_PUBLIC_SUPABASE_URL      # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY # Public anon key
```

## 5. Styling and Design System

### Tailwind CSS 4 Configuration

**Theme Tokens** (`/src/app/globals.css`)
```css
@theme inline {
  --color-background: var(--background);
  --color-container-black: #0a0a0a;
  --color-container-steel: #2c3e50;
  --color-hope-green: #27ae60;
  --color-warning-orange: #e67e22;
  --font-sans: var(--font-inter);
  --font-display: var(--font-bebas);
}
```

**Brand Palette**
- **Background**: Dark theme with gradient overlays
- **Primary Green**: #27ae60 (hope, action, progress)
- **Warning Orange**: #e67e22 (urgency, attention)
- **Container Colors**: Various dark grays representing detention reality
- **Text**: High contrast white/gray on dark backgrounds

### Typography
- **Body Text**: Inter (clean, readable sans-serif)
- **Headings**: Bebas Neue (bold, impactful display font)
- **Hierarchy**: Consistent sizing and weight scales
- **Accessibility**: Sufficient contrast ratios, readable line heights

### Component Styling Patterns

**Panel Classes** (`/src/styles/theme.css`)
```css
.panel-darker {
  background: var(--contained-panel-darker);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(18px);
}
```

**Button Variants**
- `.btn-primary` - Green call-to-action buttons
- `.btn-accent` - Orange highlight buttons
- `.btn-light` - White secondary buttons

### Responsive Design Approach
- **Mobile-first**: Base styles for mobile, progressive enhancement
- **Breakpoints**: Tailwind's default breakpoint system
- **Grid Layouts**: CSS Grid for complex layouts, Flexbox for simpler components
- **Image Optimization**: Next.js Image component with responsive sizing

## 6. Key Features and Functionality

### Forms and Submissions

**Nomination System**
- **Purpose**: Build pressure for political participation
- **Categories**: Politicians, officials, media executives, business leaders
- **Workflow**: Submit → Validate → Store in Notion → Follow up
- **Features**: Optional email capture, category-based organization

**Booking System**
- **Capacity**: 24 slots per day (configurable)
- **Pricing**: Pay-what-you-can model ($0-$50)
- **Accessibility**: Dedicated field for accessibility requirements
- **Groups**: Support for individual and group bookings

### Progress Tracking and Metrics

**Campaign Counters**
- Nominations received vs. goal (1247/2500)
- Daily booking slots available
- Premier nomination progress indicator
- Real-time updates (infrastructure ready)

**Evidence Grid**
- Statistical highlights with sources
- Cost comparisons (detention vs. alternatives)
- Success rate data from international models
- Ready for dynamic updates from database

### Media Handling

**Video Integration**
- **Supabase**: Primary storage for campaign videos
- **Descript**: Legacy embed support for existing content
- **YouTube/Vimeo**: External platform integration
- **Local Files**: MP4/WebM support with fallbacks

**Image Optimization**
- Next.js Image component for automatic optimization
- Responsive sizing with `sizes` attribute
- Lazy loading for performance
- WebP conversion where supported

### Real-time Updates

**Activity Feed Architecture**
- Prepared for live updates via Supabase
- Real-time subscriptions ready (WebSocket-based)
- Fallback to polling for wider browser support
- Currently using static seed data

**Progress Indicators**
- Campaign countdown timer
- Dynamic goal progress bars
- Nomination and booking counters
- Status updates for form submissions

## 7. Migration Considerations for Webflow

### Features That Map Directly to Webflow

**✅ Static Content Sections**
- Hero section with background images and text overlays
- Statistics grids with number highlights
- Image/video galleries with CMS integration
- Footer and header navigation
- Responsive grid layouts

**✅ Basic Forms**
- Contact forms with field validation
- Form submissions to external services (Zapier, Notion)
- Success/error state messaging
- Basic field types (text, email, select, textarea)

**✅ CMS-Driven Content**
- Stories/testimonials collection
- Campaign statistics and metrics
- Activity feed items
- Team member profiles

**✅ Responsive Design**
- Mobile-first responsive breakpoints
- Image optimization and responsive images
- Flexible grid systems
- Typography scaling

### Features Requiring Custom Code/Webflow Apps

**⚠️ Complex Form Logic**
- Multi-step validation with Zod schemas
- Real-time field validation and error display
- Conditional field visibility
- Custom contribution amount handling
- **Solution**: Custom JavaScript or third-party form service

**⚠️ Real-time Activity Feed**
- Live updates from Supabase
- WebSocket connections for real-time data
- **Solution**: Custom Webflow App or external widget integration

**⚠️ Progress Tracking Components**
- Dynamic countdown timers
- Animated progress bars with live data
- Real-time nomination/booking counters
- **Solution**: Custom JavaScript components

**⚠️ Multi-Source Media Player**
- Dynamic video source switching (Supabase, YouTube, Vimeo, Descript)
- Conditional rendering based on video source
- **Solution**: Custom JavaScript media player component

**⚠️ API Integrations**
- Direct Notion API integration
- Supabase client-side SDK
- Custom authentication and error handling
- **Solution**: Zapier/Make automation or custom Webflow App

### Data Migration Strategy

**Content Migration**
1. **Static Content**: Manually recreate in Webflow CMS
   - Campaign metadata → Site settings
   - Journey containers → Collection items
   - Evidence highlights → CMS collection
   - Narrative pillars → Rich text/structured content

2. **Stories Collection**:
   - Create Webflow CMS collection for testimonials
   - Upload videos to Webflow hosting or maintain external hosting
   - Migrate image assets to Webflow Asset Manager
   - Structure fields for: name, role, quote, media type, transcript links

3. **Form Data**:
   - Export existing Notion data
   - Set up Webflow form submissions
   - Configure Zapier integration to maintain Notion workflow
   - Map form fields to maintain data structure

**API and Database Migration**
1. **Notion Integration**:
   - Replace direct API calls with Zapier automation
   - Webflow forms → Zapier → Notion databases
   - Maintain existing database schema

2. **Supabase Data**:
   - Export data from Supabase tables
   - Migrate to Webflow CMS collections
   - Set up periodic sync if real-time data needed
   - Consider Zapier for automated updates

### Potential Limitations and Workarounds

**❌ Server-Side Validation**
- **Limitation**: Webflow forms have basic validation only
- **Workaround**: Client-side JavaScript validation + server-side validation via Zapier

**❌ Complex State Management**
- **Limitation**: No React-style state management
- **Workaround**: Vanilla JavaScript with localStorage for form state

**❌ TypeScript Support**
- **Limitation**: No TypeScript compilation in Webflow
- **Workaround**: Write vanilla JavaScript or use external build process

**❌ Dynamic Routing**
- **Limitation**: No programmatic routing or dynamic pages
- **Workaround**: All content on single page or use CMS template pages

**❌ Real-time Features**
- **Limitation**: No WebSocket support or real-time subscriptions
- **Workaround**: Polling with JavaScript intervals or third-party widgets

### Recommended Migration Approach

**Phase 1: Core Content Migration**
1. Recreate static sections in Webflow
2. Set up CMS collections for dynamic content
3. Migrate and optimize images/videos
4. Implement responsive design

**Phase 2: Forms and Integrations**
1. Build Webflow forms with basic validation
2. Set up Zapier automations for Notion integration
3. Add client-side validation with custom JavaScript
4. Test form submission workflows

**Phase 3: Interactive Features**
1. Build custom JavaScript components for progress tracking
2. Implement activity feed with periodic updates
3. Create custom media player for multi-source videos
4. Add real-time features via third-party services

**Phase 4: Optimization and Testing**
1. Performance optimization
2. Accessibility testing and improvements
3. Cross-browser testing
4. Analytics and tracking implementation

### Cost and Complexity Assessment

**Webflow Plan Requirements**
- **CMS Plan** minimum for collections and form submissions
- **Business Plan** recommended for custom code and integrations
- Additional costs for Zapier automation and third-party services

**Development Effort**
- **Low**: Static content migration (1-2 weeks)
- **Medium**: Forms and basic interactivity (2-3 weeks)
- **High**: Real-time features and complex components (3-4 weeks)
- **Total Estimated**: 6-9 weeks for full feature parity

**Ongoing Maintenance**
- Reduced server maintenance (no Next.js deployment)
- Zapier automation monitoring required
- Custom JavaScript updates for feature enhancements
- CMS content management training for stakeholders

## Conclusion

The CONTAINED site is well-architected for migration to Webflow, with clear separation between content, functionality, and styling. The majority of features can be replicated using Webflow's native capabilities combined with custom JavaScript and third-party integrations. The main challenges lie in real-time features and complex form validation, which would require custom development regardless of platform choice.

The migration would result in easier content management for non-technical stakeholders while maintaining the site's visual impact and core functionality. The trade-off is increased complexity in maintaining custom JavaScript components and third-party integrations compared to the current unified Next.js architecture.
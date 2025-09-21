# Setup Commands for CONTAINED Campaign Site

## Step 1: Push to GitHub

Replace `YOUR-USERNAME` with your actual GitHub username:

```bash
# Add GitHub as remote origin (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/contained-campaign-site.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/in with GitHub
3. Click **"Add New Project"**
4. Import your `contained-campaign-site` repository
5. Click **"Deploy"**

## Step 3: Configure Custom Domain in Vercel

After deployment:
1. Go to your project dashboard
2. Click **"Settings" → "Domains"**
3. Add domain: `app.contained.act.place`
4. Vercel will show you DNS records to add

## Step 4: Add Environment Variables

In Vercel Settings → Environment Variables, add:

```
NOTION_API_TOKEN=your-notion-token-here
NOTION_NOMINATION_DB_ID=your-nomination-database-id
NOTION_BOOKING_DB_ID=your-booking-database-id
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
CAMPAIGN_END_DATE=2025-10-22
INITIAL_NOMINATION_COUNT=1247
INITIAL_SLOT_TOTAL=24
```

## Step 5: DNS Configuration

**In your DNS provider (where act.place is hosted):**

Add these CNAME records:

```
Type: CNAME
Name: contained
Value: proxy-ssl.webflow.com
TTL: 300

Type: CNAME
Name: app.contained
Value: cname.vercel-dns.com
TTL: 300

Type: CNAME
Name: api.contained
Value: cname.vercel-dns.com
TTL: 300
```

## Step 6: Test Your Setup

After DNS propagation (15-30 minutes):

1. **Next.js app**: `https://app.contained.act.place`
2. **API endpoints**: `https://app.contained.act.place/api/nomination`
3. **Webflow** (when set up): `https://contained.act.place`

## Verification Commands

```bash
# Check if site is live
curl -I https://app.contained.act.place

# Test API endpoint
curl https://app.contained.act.place/api/nomination

# Check DNS propagation
nslookup app.contained.act.place
```

## Next Steps

1. ✅ GitHub repository created
2. ✅ Vercel deployment
3. ✅ Custom domain configured
4. ✅ Environment variables set
5. ⏳ DNS records added
6. ⏳ Webflow setup (next phase)

Your Next.js app will be live at `app.contained.act.place` and ready for the Webflow campaign site integration!
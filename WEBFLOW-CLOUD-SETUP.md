# CONTAINED Campaign - Webflow Cloud Setup

## Current Status: ✅ Webflow CLI Installed

## Step-by-Step Setup

### Step 2: Create Webflow Site (Manual)
1. Go to [webflow.com](https://webflow.com) and log in
2. Click **"Create Site"**
3. Choose **"Start from scratch"**
4. Name: **"CONTAINED Campaign"**
5. Select Business plan (for custom domain: contained.act.place)
6. Create site

### Step 3: Initialize Webflow Cloud Project

**Option A: Convert Existing Project (Recommended)**
Since you already have a built Next.js app, we'll adapt it:

```bash
# In your project directory
webflow cloud init

# When prompted:
# Framework: Next.js
# Mount path: / (for main site) or /contained (for subdirectory)
# Authenticate with your Webflow account
# Select the "CONTAINED Campaign" site you just created
```

**Option B: Fresh Start with DevLink Integration**
If you want to recreate with full Webflow design system:

```bash
# Create new directory
mkdir contained-webflow-cloud
cd contained-webflow-cloud

# Initialize new project
webflow cloud init

# Copy over your existing components and content
```

### Step 4: GitHub Setup

After initialization, push to your existing GitHub repo:

```bash
# Add all Webflow Cloud files
git add .

# Commit changes
git commit -m "Add Webflow Cloud configuration"

# Push to GitHub
git remote add origin https://github.com/Acurioustractor/contained-campaign-site.git
git push -u origin main
```

### Step 5: Configure Webflow Cloud Environment

1. In Webflow, go to your site settings
2. Click **"Webflow Cloud"** in sidebar
3. Authenticate with GitHub
4. Create new project:
   - **Project name**: "CONTAINED Campaign"
   - **GitHub repo**: `https://github.com/Acurioustractor/contained-campaign-site`
   - **Directory**: `/` (or path to your app)
5. Create environment:
   - **Branch**: `main`
   - **Mount path**: `/` (for act.place/contained)
6. **Publish your Webflow site**

### Step 6: Environment Variables

In Webflow Cloud project settings, add:

```
NOTION_API_TOKEN=your-notion-token
NOTION_NOMINATION_DB_ID=your-nomination-db-id
NOTION_BOOKING_DB_ID=your-booking-db-id
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
CAMPAIGN_END_DATE=2025-10-22
INITIAL_NOMINATION_COUNT=1247
```

### Step 7: Deploy

```bash
# Deploy to Webflow Cloud
webflow cloud deploy
```

## Domain Strategy with Webflow Cloud

### Option 1: Full Integration
- **contained.act.place** → Points to your Webflow Cloud app
- All campaign features in one unified site

### Option 2: Hybrid Approach
- **act.place/contained** → Mount path for Webflow Cloud app
- Requires DNS setup to point subdirectory to Webflow

## File Structure After Webflow Cloud Init

```
contained-site/
├── .webflow/              # Webflow Cloud config
├── devlink/               # Webflow design system
├── src/                   # Your existing Next.js app
├── webflow.config.js      # Webflow Cloud configuration
└── package.json           # Updated with Webflow dependencies
```

## Next Steps After Setup

1. **Import Components**: Use Webflow design system components
2. **Style Integration**: Merge your custom styles with Webflow variables
3. **Form Integration**: Connect Webflow forms with your Notion setup
4. **Testing**: Preview at your Webflow site URL + mount path
5. **Launch**: Configure custom domain (contained.act.place)

## Benefits of Webflow Cloud Approach

✅ **Visual Design Control**: Edit layouts in Webflow Designer
✅ **Unified Hosting**: Single platform for design + code
✅ **Design System**: Automatic sync with Webflow components
✅ **Team Collaboration**: Designers can update without developers
✅ **Performance**: Optimized Webflow hosting infrastructure
✅ **Domain Management**: Easy custom domain setup

Your CONTAINED campaign will have the best of both worlds - Webflow's visual design power with your custom Next.js functionality! 🚀
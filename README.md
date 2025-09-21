# CONTAINED microsite

Next.js (App Router) build for the CONTAINED youth justice campaign. Ships with Tailwind v4 token setup, Descript video embeds, and Notion-backed nomination + booking forms ready for a quick Vercel launch.

## 1. Prerequisites
- Node 18+ (Next.js 15 requirement)
- npm (project bootstrapped with npm and lockfile)
- Notion integration token with access to the CONTAINED databases
- Descript share links (public) for story embeds

## 2. Local setup
```bash
npm install
cp .env.example .env.local
# add secrets (see below)
npm run dev
```
Visit `http://localhost:3000` to inspect the site.

### Environment variables
```
NOTION_API_TOKEN=your-notion-api-token-here
NOTION_NOMINATION_DB_ID=<paste the Notion database ID from the link>
NOTION_BOOKING_DB_ID=<paste the companion booking database ID>
CAMPAIGN_END_DATE=2025-10-22
INITIAL_NOMINATION_COUNT=1247
INITIAL_SLOT_TOTAL=24
```
- Grab the database IDs from the page URL (`.../12918166...` etc.).
- Vercel: add the same variables under **Project Settings → Environment Variables** before deploying.

## 3. Content + assets
- Static content lives in `src/content/`:
  - `campaign.ts` – hero copy, journey stats, evidence grid values.
  - `stories.ts` – Descript IDs / photo references for the story cards.
  - `activity.ts` – seed items for the live feed (replace once automation is ready).
- Upload imagery to `public/images/...` folders:
  - `public/images/backgrounds/` – hero pattern (`container-grid.png` placeholder included).
  - `public/images/stories/` – portraits/posters referenced in `stories.ts`.
    - Name files after the story `id` using lowercase hyphenated words (e.g. `kiani.jpg`, `david.jpg`, `amara.jpg`).
    - Landscape 16:9 crops (≥1600×900) work best; store poster frames for videos in the same folder and point `posterImage` at them.
  - `public/images/logos/` – partner marks if required.
- For Descript embeds set `descriptShareId` to the share token (copy the hash after `/view/` or `/embed/`). Add optional `posterImage` for a still fallback.

## 4. Forms + Notion
- Nomination form posts to `/api/nomination`, booking form posts to `/api/booking`.
- Request payloads are validated with Zod before being written into Notion (property names must match: `Title`, `Position`, `Organisation`, `Category`, `Reason`, `Submitted Email`, `Preferred Date`, etc.).
- Update property names in `src/app/api/*/route.ts` if your Notion schema differs.
- Errors bubble back with friendly messaging; both forms reset on success.

## 5. Styling + theming
- Tailwind tokens defined in `src/app/globals.css` mirror the brand palette and typography (`Inter` + `Bebas Neue`).
- Utility classes like `font-display` are wired for the display font; tweak the palette or typography there if the brand guide evolves.
- Global sections/components live in `src/components/` (hero, journey, stories, forms, activity feed, urgency banner, header, footer).

## 6. Quality
- `npm run lint` – ESLint + TypeScript sanity check.
- `npm run dev` – Turbopack dev server (hot reload).
- `npm run dev:clean` – Convenience script: `rm -rf .next && npm run dev`.
- `npm run test:e2e` – Playwright smoke test (captures `test-artifacts/hero.png` + runs axe accessibility checks).

> First run only: `npx playwright install` to pull down the browser binaries locally.
- Add more tests (Playwright/Cypress) once flows stabilise; none are included yet.

### Visual refresh checklist
1. Stop the dev server.
2. `npm run dev:clean` (or manually `rm -rf .next && npm run dev`).
3. Hard refresh the browser / open an incognito window.
4. `npm run test:e2e` to regenerate the hero screenshot and catch any accessibility regressions.

## 7. Deploying on Vercel
1. Push this folder to GitHub (make sure `.env.local` is **not** committed).
2. Create a Vercel project, import the repo, pick the `contained-site` directory if the repo has multiple projects.
3. Add environment variables from section 2 (Production + Preview).
4. Trigger the first deployment and map the custom domain (e.g. `contained.act.place`).
5. Enable Vercel Analytics for real-time traffic and monitor form submissions via Notion.

## 8. Next actions
- Swap placeholder photos/posters in `public/images` with approved assets.
- Replace seed data with live numbers (Notion automation or manual updates).
- Connect Zapier/Make to push new Notion entries into the live feed or Slack.
- Add transcripts/captions for every Descript video you embed (link field already present in `stories.ts`).

# Admin Dashboard Architecture

## Decision: Option A — Admin as dev-only routes inside the same Next.js app

### Rationale

After analyzing the three options against the project constraints:

1. **Static export on GitHub Pages** — production only serves pre-rendered HTML
2. **Claude Code is the primary editor** — the admin is an operational tool, not a CMS for non-technical users
3. **Speed is the top priority** — no extra build tooling, no separate repo, no extra deps

**Option A wins** because:

- Zero new dependencies: uses the existing Next.js, Tailwind, and lucide-react stack
- The admin route `/admin` works in `next dev` but is automatically excluded from `next build --output export` because it reads filesystem data at render time (server component)
- Single codebase, single `package.json`, single dev server
- The admin can read the actual project files (page configs, templates, images) via Node.js `fs` during development
- No database needed: the page registry is a JSON file that acts as the single source of truth

### Architecture Overview

```
ab-landing-system/
  src/
    app/
      admin/                    # Dev-only admin dashboard
        page.tsx                # Main dashboard — page listing
        layout.tsx              # Admin layout (dark sidebar, no SmoothScroll)
        components/
          Sidebar.tsx           # Navigation sidebar
          PageCard.tsx          # Landing page card in the grid
          StatsBar.tsx          # Top stats bar
          QuickActions.tsx      # Action buttons
      [slug]/page.tsx           # Dynamic landing pages (static export)
      missione-immobiliare/     # Hardcoded landing pages
      missione-immobiliare-v2/
    content/
      pages/
        registry.json           # Master index of all landing pages
        missione-immobiliare.json
        missione-immobiliare-v2.json
        evento-live.json
        corso-online.json
        webinar-gratuito.json
        ebook-gratuito.json
        grazie.json
    lib/
      page-registry.ts         # TypeScript helpers to read/query registry
```

### Page Registry Schema

Each entry in `registry.json`:

```typescript
interface PageRegistryEntry {
  id: string                    // Unique identifier
  slug: string                  // URL path
  name: string                  // Display name
  status: 'draft' | 'live' | 'archived'
  category: 'immobiliare' | 'trading' | 'wake-up-call' | 'webinar' | 'corso' | 'lead-magnet' | 'thank-you' | 'evento'
  template: string              // Template key from templateRegistry
  createdAt: string             // ISO date
  updatedAt: string             // ISO date
  deployedAt?: string           // Last deploy date
  route: string                 // Actual file route (e.g., '/missione-immobiliare' or '/evento-live')
  routeType: 'hardcoded' | 'dynamic' // Whether it uses [slug] or has its own folder
  blocks: number                // Number of blocks/sections
  hasForm: boolean              // Whether it has a HubSpot form
  hasPricing: boolean           // Whether it has pricing
  metrics?: {
    views?: number
    conversions?: number
    conversionRate?: number
  }
  thumbnail?: string            // Path to thumbnail image
  notes?: string                // Internal notes
}
```

### How It Works

1. **Development**: `npm run dev` starts Next.js dev server. Navigate to `/admin` to see the dashboard. The admin page is a server component that reads `registry.json` and project files via Node.js `fs`.

2. **Production Build**: `npm run build` runs `next build` with `output: "export"`. The admin route is excluded because:
   - It uses `dynamic = 'force-dynamic'` which prevents static generation
   - The `next.config.ts` can explicitly exclude `/admin` routes if needed

3. **Workflow**: User (or Claude Code) edits page configs, templates, or hardcoded pages. The admin dashboard reflects the current state by reading the filesystem. To deploy, push to `main` branch which triggers GitHub Pages build.

### Admin Features (Phase 1)

- **Page Listing**: Table/grid view of all pages with metadata
- **Status Management**: Visual status indicators (draft/live/archived)
- **Category Filtering**: Filter by campaign category
- **Quick Actions**: Links to view live page, open source file, copy slug
- **Stats Overview**: Total pages, live pages, pages with forms, pages by category

### Future Phases

- **Phase 2**: JSON config editor with syntax highlighting (Monaco)
- **Phase 3**: Live preview iframe panel
- **Phase 4**: Section drag-and-drop reordering
- **Phase 5**: Image upload and management
- **Phase 6**: Quick Create wizard
- **Phase 7**: Design library and component gallery

### Trade-offs

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Storage | JSON files on disk | No DB needed; git-tracked; Claude Code can edit directly |
| Auth | None (localhost only) | Admin runs only in dev; no production exposure |
| State | Filesystem reads | Always reflects actual project state |
| Styling | Same Tailwind setup | No extra CSS tooling |
| Complexity | Minimal | One codebase, one dev server, zero new deps |

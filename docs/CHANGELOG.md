# CHANGELOG.md — Conversation History

This documents, in order, what actually happened across the working session
that produced the current state of this codebase — separate from `UPDATE.md`
(a prior screenshot-vs-code gap analysis pass) and the original planning docs
(`PROJECT.md`, `ARCHITECTURE.md`, `SKILL.md`, `PROMPT.md`, written before any
code existed). Read this if you want to know *why* a file looks the way it
does, or which of several conflicting instructions won.

## 1. Planning phase (no code yet)

Given the 1Fi SDE Intern assignment PDF and the recruiter email, produced four
planning documents before writing any component:
- `PROJECT.md` — scope, deliverables, evaluation-criteria mapping
- `ARCHITECTURE.md` — stack, folder structure, data models, API contract
- `SKILL.md` — design/engineering conventions, explicitly separating
  *verified* 1Fi facts from *assumed* defaults
- `PROMPT.md` — staged build prompts for driving implementation

At this stage, the only verified facts about the real 1Fi app came from a web
search and a raw HTML fetch of `app.1fi.in/shop`: the brand color `#712CDC`,
the bottom nav order (Home/Shop/EMI Dues/Limit/Profile), and the existing
Top Brands / Nearby Stores tab structure. Everything else was flagged as a
"reasonable default," not a fact.

## 2. Shop shell — first real component files

Given five actual component files (`BottomNav.tsx`, `SearchBar.tsx`,
`ShopHero.tsx`, `ShopShell.tsx`, `ShopTabs.tsx`) plus a real screenshot of the
Nearby Stores tab. From there, a sequence of small, exact styling
instructions came in one at a time, each applied precisely rather than
re-guessed:

1. Hero banner resized to a sharp-cornered `800x400` quadrilateral (no
   rounded corners) — later revised twice more (see below)
2. Tab track opacity removed (`bg-primary-100/70` → solid), sized `468x56`
3. The tabs-through-listing content wrapper fixed at `500x1544.39`
4. Hero banner changed from a fixed-width box to a responsive edge-bleed
   pattern (`-mx-4 -mt-4 overflow-hidden md:-mx-6 md:-mt-6 lg:-mx-8 lg:-mt-8`) —
   required adding matching positive padding to `ShopShell`'s outer container
   for the negative margins to have something to cancel
5. Hero image resized again to an exact `582.2x390.98`, which reintroduced a
   fixed-size-vs-fluid-bleed conflict — flagged, not silently resolved
6. Bottom nav restyled with a real pill-card class string
   (`mx-auto flex max-w-[500px] items-stretch rounded-[28px] ...`) — this class
   string had no `fixed`/`bottom-0` in it, so applying it literally **removed
   the nav's sticky behavior**, which went unnoticed and unflagged for two
   turns until directly caught by "did u checked this?" — then restored:
   `fixed bottom-0 inset-x-0 z-50` added back, `BottomNav` moved back to being
   a sibling *after* the `500x1544.39` wrapper (a `fixed` element ignores
   ancestor nesting entirely, so keeping it nested there would have been
   misleading code even though it doesn't change what renders)
7. Real active-tab pill classes supplied
   (`bg-white text-[#712CDC] shadow-[...]`) — applied exactly, the fabricated
   underline `<span>` from earlier was dropped since the supplied string
   didn't include one
8. A screenshot then showed the underline bar **does** exist after all (it
   lives on the track, not the pill) — added back, plus the real track
   container class (`flex gap-2 rounded-full border border-[#ece5ff]
   bg-[#f5f0ff] p-1.5 shadow-[...]`)
9. Hero wrapper resized again to `532x354` (smaller than the `582.2x390.98`
   image inside it) — flagged as an intentional crop, not a bug, pending
   confirmation
10. Hero centering fixed: the real bug was leftover `-mx-4/md/lg` negative
    margins sitting on the same element as `mx-auto`/`justify-center` —
    negative horizontal margins and auto-centering directly fight each other,
    so centering could never have worked until those were removed
11. Outer container padding above the hero removed entirely per direct
    instruction (`px-4 pt-4 md:px-6 ... lg:px-8 lg:pt-8` stripped from
    `ShopShell`'s root div); `pb-24` was deliberately kept since it's unrelated
    (reserves space for the fixed bottom nav, not padding "above" the hero)

## 3. Marketplace listing — new component

Given a real reference screenshot ("Air India — No-cost EMIs upto 18 months")
and three exact class strings (outer card, image wrapper, text wrapper).
Built `MarketplaceListItem.tsx` (+ a `MarketplaceList` wrapper for the
1-per-block vertical stack) as a new file, since nothing like it existed yet.

Two issues in the supplied text-wrapper class string were caught and fixed
rather than applied blindly:
- `items-between` is not a real Tailwind utility (`items-*` only accepts
  start/end/center/baseline/stretch) — left as a no-op if copied verbatim
- `items-between`/`justify-between` on a `<div>` with no `flex` set do
  nothing at all — `flex flex-col` was added so `justify-between` actually
  spaces the title/subtitle apart

## 4. Reconciling with the full uploaded project

Given eight files at once (`ConfirmationSummary`, `EMIPlanCard`,
`EMIPlanSelector`, `MarketplaceListItem`, `ProceedCTA`, `ProductCard`,
`ProductGrid`, `VariantSelector`) — the first time the actual page-level
consumers and real `Product`/`EMIPlan` types were visible, having previously
only been referenced by import paths, never seen directly.

This surfaced a real conflict: `ProductGrid.tsx` rendered a 2-column
`grid grid-cols-2 gap-3` of `ProductCard`s — directly contradicting the
"1 item per block" listing pattern the new `MarketplaceListItem` was built
for. Two competing listing UIs existed simultaneously.

Resolved by:
- Rewriting `MarketplaceListItem.tsx` to consume the real `Product` type
  directly (id/images/name/brand/basePriceInr) instead of generic
  imageSrc/title/subtitle props, deriving the subtitle via the existing
  `cheapestMonthly()` helper from `lib/mock-server/emiEngine` — matching the
  no-hardcoded-data rule already established in `SKILL.md`
- Retiring `ProductGrid.tsx`'s 2-column grid: turned it into a thin wrapper
  around the new `MarketplaceList`, keeping the same export name and
  `{ products }` prop shape so any existing page import wouldn't break
  without being rewritten
- `ProductCard.tsx` left in place but now has zero consumers anywhere in the
  project — safe to delete, not deleted automatically since only updates were
  requested, not removals

## 5. Verifying against the full real project (package.zip)

Given a full project zip (config files, all pages, all lib/hooks, the real
`products.json`, the actual `MarketplaceListPage.tsx` that consumes
`ProductGrid`). This was the first point where the actual consuming page was
visible — until then, `ProductGrid`'s prop shape had been inferred from
`ProductCard.tsx`'s own code, not confirmed against its real caller.

Cross-checked the zip against locally-fixed files and found:
- The zip's `MarketplaceListItem.tsx` and `ProductGrid.tsx` were **stale**
  (pre-fix versions, predating step 4 above) — confirmed via diff, only
  those two files needed updating, delivered as a 2-file patch
- `MarketplaceListPage.tsx` imports `ProductGrid` with exactly the
  `{ products }` shape the fix already produces — zero page-level changes
  needed, confirmed rather than assumed
- A stray duplicate file, `src/components/shop/ShopTabs (1).tsx`, exists
  alongside the real `ShopTabs.tsx` and is missing every styling fix from
  section 2 above (steps 7–8) — flagged as worth deleting before submission,
  not deleted automatically since it wasn't asked for

## 6. Image cropping question

Asked how to crop the hero banner "internally, like the original." Checked
the real banner file's actual pixel dimensions (`1535x1024`) against the
rendered CSS box sizes, confirmed the existing `object-cover` (on the
`582.2x390.98` image) + `overflow-hidden` (on the `532x354` wrapper)
combination in `ShopHero.tsx` **is** the internal-cropping mechanism —
nothing was broken or missing. Generated actual crop-preview renders (center,
left-anchored, right-anchored via `object-position`) to show the effect is
minimal here since the source aspect ratio (~1.499:1) and the wrapper's
aspect ratio (~1.503:1) are already very close — no code change was made
since none was needed, pending a direction preference if the person wants
the crop biased toward one side.

## Open items not yet acted on

- Delete `ProductCard.tsx` (zero remaining consumers) — pending explicit ask
- Delete or reconcile the stray `ShopTabs (1).tsx` duplicate — pending
  explicit ask
- `object-position` on the hero image — pending a stated crop-bias preference
- A live cross-breakpoint browser check (375/768/1280px) — flagged as still
  manual/outstanding in `UPDATE.md`'s own status table, unchanged since

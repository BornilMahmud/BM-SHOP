# Test Plan — BM SHOP MVP (PR #1)

**Target:** https://dist-pgznxkxc.devinapps.com
**Scope:** Prove the three headline claims of the PRD are actually wired, not just rendered shells.

## What changed (user-visible)

First working slice of BM SHOP: admin suite + storefront + **offline rule-based BM Smart Assistant**, styled in dark + glassmorphism + purple-blue gradient.

## What I'll test

Three adversarial end-to-end flows. Each is designed so a broken implementation would produce visibly different output.

---

### Test 1: BM Smart Assistant actually runs intent → query → response (offline)

**Why this matters:** This is the unique PRD feature. If the intent matcher, query layer, or navigation is broken, the PR fails its headline promise. A "nice UI" alone doesn't prove it works.

**Steps:**
1. Open `https://dist-pgznxkxc.devinapps.com/admin`.
2. Click the floating **Ask BM** button (bottom-right).
3. In the input, type `top product` → press Enter.
4. Observe the assistant reply bubble.
5. Click the suggested chip `pending orders`.
6. Observe the reply.
7. Type `open pos` → press Enter.
8. Observe URL change.

**Pass/fail criteria (all must hold):**
- Step 4: reply text must match the regex `Top seller: .+ with \d+ units\.` AND a table with exactly the headers `Product | Sales | Stock` and **5 rows** must render. *(If intent matching or the `top_product.run()` query is broken, the fallback "Sorry, I didn't understand" would appear instead, or the table would be missing.)*
- Step 6: reply text must match `You have \d+ pending orders\.` AND a table with headers `Order | Customer | Total` must render. *(Suggested chips being clickable proves the `send()` handler re-runs the matcher on canned text.)*
- Step 8: within ~1s, URL must change from `/admin` to `/admin/pos` AND the POS page header "Point of Sale" must be visible. *(If `navigate` isn't wired into the intent result, URL stays on `/admin` — a cosmetic-only implementation would fail here.)*

**Why this is adversarial:** A stub that just echoes the input would show no table, wrong text, and wouldn't navigate. All three would be visibly different.

---

### Test 2: Storefront cart → checkout → order confirmation

**Why this matters:** Proves the customer-facing flow isn't just static pages — state propagates from product page → cart → checkout → order success, and the generated order id round-trips via URL params.

**Steps:**
1. Open `https://dist-pgznxkxc.devinapps.com/`.
2. Click any product card in the "Trending now" grid.
3. On the product page, click **Add to cart**.
4. Click the cart icon in the top-right header.
5. On `/cart`, click **Proceed to checkout**.
6. On `/checkout`, fill required fields (name, phone, address, city), leave payment as "Cash on Delivery (+৳20)".
7. Click **Place order · ৳X**.

**Pass/fail criteria:**
- Step 3→4: cart badge in the header must increment from absent/0 to **1** (a red/pink pill on the cart icon). *(If `addToCart` is broken, badge stays hidden.)*
- Step 5: `/cart` must show the added product's name and `৳<price>` as a line item; summary must show Subtotal, Shipping (৳130), Total = Subtotal + 130. *(If `cartSubtotal` memoization is broken, totals would not match.)*
- Step 6: on `/checkout`, the Total at the button must equal Subtotal + 130 + 20 (COD fee). *(If COD fee toggle is broken, total would be off by ৳20 — a visibly different number.)*
- Step 7: URL must change to `/order/ORD-XXXXX` where `XXXXX` is a 5-digit number, AND page must show the literal text **"Order placed!"**, AND the header cart badge must disappear (cart cleared). *(A broken `clearCart` or navigate would leave the badge or keep the URL on `/checkout`.)*

---

### Test 3: Admin Dashboard renders with correct deterministic values + dark theme chrome

**Why this matters:** Proves the charts, data layer, and Tailwind theme are all wired up — not just the shell. Mock data is seeded (PRNG seed 55), so exact values are predictable.

**Steps:**
1. Open `https://dist-pgznxkxc.devinapps.com/admin`.
2. Observe the four stat cards.
3. Observe the "Revenue · Last 14 days" chart.
4. Observe the "Top Products" list.
5. Observe the "Recent Orders" table.

**Pass/fail criteria:**
- Step 2: Total Revenue card must show **৳569,300**. Active Customers must show **48**. *(If the revenue reducer or customers generator is broken, numbers will differ visibly.)*
- Step 3: An area chart with a purple gradient fill must be visible (`stroke: #7161FF`, gradient id `g1`). Hovering must show a tooltip formatted as `৳<number>`. *(A broken tooltip formatter would show raw numbers without ৳.)*
- Step 4: First row of Top Products must be **"Organic Green Tea"** with **497 sold** (highest `.sales` value in the seeded dataset). *(If the sort is broken, order changes; if mock data is broken, product changes.)*
- Step 5: Recent Orders table must show 6 rows, each with a colored status chip (pending/processing/delivered chips must have distinct background colors — yellow/blue/green tints). *(A broken `StatusChip` map would render every chip identically.)*
- Dark theme: page background must be near-black (`#0B0B12` area) with purple radial-gradient glow visible at top-left. Sidebar's active route must have a visible purple-pink gradient button. *(Proves Tailwind + custom `bg-brand-gradient` utility compiled correctly.)*

---

## Out of scope (explicit)

- Backend / persistence — there is none (mock data, in-memory). Refresh wipes cart.
- Auth — not implemented yet.
- Admin filters (Products category chips, Orders status chips) — regression, skipping.
- Unit tests — none written.
- Vendor panel — deferred per PR description.

## Evidence

Full screen recording + annotated moments + final screenshots + one PR comment with results.

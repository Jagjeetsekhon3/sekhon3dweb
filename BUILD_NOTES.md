# Sekhon Studio redesign

## Existing project

- Ecommerce GitHub repository: https://github.com/Jagjeetsekhon3/sekhon3dweb
- Vercel project: sekhon3dweb (prj_uqflTFHUoBhIeA72l13cAJ8pu2AV)
- Supabase ecommerce project: ouuqfyrejjxsgalxmicu
- Business manager is separate: Sekhon-Studio / sekhon_studio / wsutnwdanufzguglrkjs.
- Neither inspected Vercel project has sekhonstudio.com attached. Domain setup is pending.

## Implemented

Responsive monochrome storefront, floating glass desktop navbar, mobile bottom navigation, catalog search, categories and collection routes, product detail presentation, custom creation information, footer, errors and empty states. Admin overview with protected live data queries, recent orders, order journey, orders listing, and sign-out. Existing admin product creation/editing and authentication retained.
The public /design/admin page is a read-only design preview with explicit illustrative empty-state labels. It has no privileged data queries.

## Local preview

Install dependencies with npm ci, then npm run dev. Set the public Supabase URL and publishable key in .env.local. A server-only SUPABASE_SERVICE_ROLE_KEY is required for existing product management and live admin reporting. Never put that key in a NEXT_PUBLIC variable.
The current computer has no active NVM Node version. A bundled Node executable is available through Codex workspace dependencies.

## Launch work remaining

Add real products, images, categories and site contact information. Finish cart, wishlist, checkout, payment/shipping adapters and business-manager sync. Connect sekhonstudio.com after reviewing the preview.
The connected Vercel tool returned 403 when listing environment settings. Admin data cannot be verified locally without the server credentials.

## Security follow-up before checkout

Existing guest cart policies permit access when customer_id is null without binding a cart to its guest session. Replace this policy model with secure guest ownership before enabling checkout. No database policies or customer records were changed in this UI build.

## Artwork

public/images/studio-hero.png is inspirational artwork, not a live catalog product. Generated with the built-in image generation tool.
Prompt: Premium monochrome studio still life of a white spiral ribbed vase, graphite twisted vase, and white geometric object on a reflective black plinth; fine 3D print layers, soft side lighting, objects on the right and negative space on the left; no text or logos.

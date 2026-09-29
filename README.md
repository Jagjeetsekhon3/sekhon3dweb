# Sekhon Studio Ecommerce

Next.js App Router + Supabase + Vercel storefront for SekhonStudio.com.

## Architecture
- GitHub: `Jagjeetsekhon3/sekhon3dweb`
- Supabase ecommerce DB: `sekhon3dweb`
- Existing Business Manager remains separate and is the operational source for business data.
- Integration layer will sync products, inventory and orders through authenticated server/API calls.
- Vercel: deploy the ecommerce repo separately from the existing Business Manager project.

## Core modules
Catalog, categories, product images, size/color variants, custom product inputs, inventory movements, cart, wishlist, checkout, orders, payments, shipping, coupons, sales, analytics, homepage sections, pages, website settings.

## Payment adapters
Razorpay, Cashfree and PayU are modeled as provider adapters. Admin will enter credentials and enable one or more providers. Credentials must only be handled by server-side code.

## Shipping adapters
NimbusPost, Delhivery, Shiprocket and Ekart are modeled as provider adapters. Admin will enter credentials and enable providers.

## Image storage
Supabase Storage bucket: `product-images`. Public read is enabled for storefront delivery; uploads are intentionally not public and will be performed by authenticated admin/server code.

## Security
RLS is enabled across the ecommerce database. Customer records are scoped to the authenticated customer. Private operational tables have no public access. Service-role credentials must never be exposed to browser code.

## Planned build order
1. Storefront shell + responsive product/category pages
2. Admin authentication + dashboard
3. Product/category/variant/custom-input CRUD
4. Image uploader and homepage builder
5. Cart + wishlist + checkout
6. Payment provider adapters
7. Shipping provider adapters
8. Business Manager sync
9. Analytics dashboard
10. Mobile-app-ready API/data contracts


Deployment initialized for the SekhonStudio.com ecommerce application.

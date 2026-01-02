# Tuvi - E-Commerce Platform

A modern full-stack e-commerce application built with Next.js 15, featuring AI-powered shopping assistance, secure payments, and real-time product management.

## Features

- **AI Shopping Assistant** - Gemini-powered chatbot for personalized product recommendations
- **Secure Payments** - Stripe integration with webhook support for order processing
- **User Authentication** - Clerk authentication with order history tracking
- **Content Management** - Sanity CMS for dynamic product and category management
- **Cart Management** - Persistent shopping cart with Zustand state management
- **Rate Limiting** - Redis-based API protection to prevent abuse
- **Product Caching** - Upstash Redis for faster page loads and reduced database queries
- **Mobile Responsive** - Optimized for all screen sizes with Tailwind CSS
- **Order Management** - Complete order tracking and invoice generation
- **Security Features** - Server-side price validation, input sanitization, and rate limiting

## Tech Stack

**Frontend**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand

**Backend & Services**
- Sanity CMS (Headless CMS)
- Stripe (Payments)
- Clerk (Authentication)
- Google Gemini AI (Chat Assistant)
- Upstash Redis (Caching & Rate Limiting)

**Deployment**
- Vercel

## Installation

1. Clone the repository:
```bash
git clone https://github.com/muski85/tuvi-ai-ecommerce-website.git
cd tuvi
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

Create a `.env.local` file:
```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
SANITY_API_READ_TOKEN=your_read_token

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stripe Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_SECRET_KEY=your_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Upstash Redis
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Access the application at [http://localhost:3000](http://localhost:3000)

6. Access Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio)

## Project Structure

```
tuvi/
├── app/                    # Next.js app directory
│   ├── (client)/          # Client-facing pages
│   ├── api/               # API routes (webhooks, chat, cache)
│   └── studio/            # Sanity Studio
├── components/            # React components
├── lib/                   # Utilities (caching, rate limiting)
├── sanity/               # Sanity schema and queries
├── store/                # Zustand state management
└── actions/              # Server actions
```

## Key Features Implementation

### AI Shopping Assistant
- Real-time product recommendations using Google Gemini
- Context-aware responses based on product catalog
- Rate-limited to prevent API abuse (10 requests/minute)

### Payment Processing
- Stripe checkout sessions with invoice generation
- Webhook integration for order creation
- Server-side price validation to prevent manipulation

### Caching Strategy
- Product data cached for 5-10 minutes in Redis
- Automatic cache invalidation on product updates
- Significantly reduced database queries and improved performance

### Security
- Server-side price validation
- Input sanitization for AI prompts
- Rate limiting on API endpoints
- Strong product references in orders

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run typegen      # Generate TypeScript types from Sanity schema
```

## License

MIT

## Author

GitHub: [@muski85](https://github.com/muski85)

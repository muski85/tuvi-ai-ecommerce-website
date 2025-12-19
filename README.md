# Tuvi - Modern E-Commerce Platform

A full-stack e-commerce application built with Next.js 15, featuring AI-powered shopping assistance, real-time payments, and seamless user experience.

## Features

-  **AI Shopping Assistant** - Google Gemini-powered chatbot for product recommendations
-  **Stripe Payments** - Secure checkout with webhook integration
-  **Authentication** - Clerk-based user management
-  **Product Management** - Sanity CMS for dynamic content
-  **Shopping Cart** - Persistent cart with Zustand state management
-  **Responsive Design** - Mobile-first approach with Tailwind CSS
-  **Smooth Animations** - Framer Motion for delightful UX
-  **Order Tracking** - Complete order history and management

##  Tech Stack

**Frontend:**
- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand

**Backend:**
- Sanity CMS
- Stripe
- Clerk Authentication
- Google Gemini AI

**Deployment:**
- Vercel

##  Installation

1. Clone the repository:
```bash
git clone https://github.com/muski85/tuvi-ai-ecommerce-website.git
cd tuvi-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
SANITY_API_READ_TOKEN=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Gemini AI
GEMINI_API_KEY=

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

##  Screenshots

(Add screenshots here)

## Key Learnings

- Full-stack development with Next.js 15
- AI integration with Google Gemini
- Payment processing with Stripe webhooks
- Headless CMS implementation
- State management patterns
- Real-time data synchronization

## Deployment

Deployed on Vercel: [Live Demo](https://tuvi.vercel.app)

## License

MIT License

## Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

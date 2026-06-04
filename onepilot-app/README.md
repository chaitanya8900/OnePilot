# OnePilot 🚀

OnePilot is the ultimate business growth infrastructure. This Next.js application serves as the primary marketing, lead generation, and client onboarding portal. It consolidates multiple business tools (marketing, AI, automations, operations) into a single, seamless ecosystem.

## Features
- **Tailored Pricing & Services Architecture**: A custom, conversion-optimized funnel for booking strategy calls.
- **Supabase Integration**: Direct backend connection to Supabase for secure contact and lead capture.
- **Responsive Dynamic UI**: Features a bespoke design system with glassmorphism, glowing micro-animations, and custom typography (Inter & Playfair Display).
- **Dark/Light Mode**: Full system-level and user-toggleable theme support.
- **Optimized Performance**: Built on Next.js 15, React 19, and TailwindCSS.

## Getting Started

First, make sure to set up your `.env.local` file with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack
- [Next.js](https://nextjs.org) (App Router)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.com/)
- [Lucide Icons](https://lucide.dev/)

## Security & Deployment
- All environment variables are securely referenced. No secrets are hardcoded.
- The project is configured for seamless deployment on Vercel or any Next.js-compatible hosting provider.

# HeraHealth Frontend

HeraHealth is a role-based fitness coaching portal that brings clients, coaches, and platform administrators into one application. Clients can find coaches, request and manage coaching relationships, follow workout and meal plans, log activity, and review their progress. Coaches can manage availability, client requests, plans, schedules, and conversations. Administrators can manage users, coach applications, exercises, notifications, and payment records.

This repository contains the Next.js frontend. It communicates with the [HeraHealth backend API](https://github.com/mtriana14/NEW-WORKOUT-APP-BACK-END-CS490-) through a server-side proxy and uses Socket.IO directly for real-time chat.

## Tech stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Zustand for session-scoped authentication state
- Recharts for activity and progress visualizations
- Socket.IO Client for real-time messaging
- Lucide React for interface icons
- Tailwind CSS/PostCSS tooling plus shared styles in `app/globals.css`
- Google Identity Services through `@react-oauth/google` (optional)

## Implemented functionality

### Clients

- Email/password registration and sign-in, optional Google sign-in, onboarding, password reset, and profile management
- Coach discovery, coach profiles and reviews, coaching requests, and coach dismissal
- Workout and meal-plan views, including a weekly workout calendar
- Strength, cardio, step, and calorie logging
- Progress trends, fitness goals, and progress-photo uploads
- In-app notifications and real-time chat with coaches
- Saved-card metadata, coaching subscriptions, invoice history, and reviews

### Coaches

- Coach application and profile management
- Availability and weekly schedule management
- Client-request review and active-client views
- Workout-plan and meal-plan builders
- Client activity/progress views
- Revenue summaries, notifications, and real-time chat

### Administrators

- User activation and deactivation
- Coach-application review and coach status management
- Exercise-library management
- Payment summaries, transaction details, and refund-status updates
- Platform reports and notification management

## Project status and known limitations

HeraHealth is a team-built prototype, not a production payment or medical platform.

- The standalone `/nutrition` route still uses demo meal data. The role-specific client and coach meal-plan pages use the backend API.
- The standalone `/activity` route submits activity logs but presents a fixed fallback exercise list.
- Dashboard preference read/write helpers in `app/lib/api.ts` currently return in-memory mock responses.
- Billing stores card brand, expiration, and last-four metadata and creates application-level payment records. It is not connected to a payment processor and must not receive real card data.
- Some older and role-specific routes overlap while the application is being consolidated.
- The current default branch has existing ESLint errors. A production build also downloads the Geist fonts through `next/font`, so the build environment needs access to Google Fonts unless the fonts are made local.

## Project structure

```text
.
├── app/
│   ├── api/backend/[...path]/   # Server-side proxy to the Flask API
│   ├── auth/                    # Login, signup, onboarding, and password reset
│   ├── dashboards/
│   │   ├── admin/               # Administrative portal
│   │   ├── client/              # Client coaching and tracking portal
│   │   ├── coach/               # Coach operations portal
│   │   └── user/                # Earlier client dashboard routes
│   ├── components/              # Portal shells and shared app components
│   ├── lib/                     # Auth/session helpers and legacy API functions
│   └── page.tsx                 # Public landing page
├── components/                  # Shared charts, navigation, and profile UI
├── lib/                         # API client, media, and browser-storage helpers
├── services/                    # Feature-oriented backend API clients
├── store/                       # Zustand authentication store
├── types/                       # Shared TypeScript types
├── public/                      # Static assets
└── package.json
```

## Local setup

### Prerequisites

- Node.js 20.9 or newer
- npm
- A running [HeraHealth backend](https://github.com/mtriana14/NEW-WORKOUT-APP-BACK-END-CS490-)

### 1. Clone and install

```bash
git clone https://github.com/mtriana14/Workout-WebAPP-FRONTEND.git
cd Workout-WebAPP-FRONTEND
npm ci
```

### 2. Configure the environment

Create `.env.local` in the repository root:

```env
# Used by the Next.js server-side API proxy.
BACKEND_API_URL=http://localhost:5000/api

# Used by browser code for Socket.IO and uploaded-media URLs.
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Optional: enables the Google sign-in buttons.
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

The browser-facing API client uses `/api/backend` by default, which keeps normal REST requests same-origin and forwards them to `BACKEND_API_URL`. `NEXT_PUBLIC_API_PROXY_URL` can override that proxy path when needed.

If Google sign-in is enabled, use the same OAuth client ID for `NEXT_PUBLIC_GOOGLE_CLIENT_ID` here and `GOOGLE_CLIENT_ID` in the backend.

### 3. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev    # Start the development server
npm run lint   # Run ESLint
npm run build  # Create a production build
npm run start  # Serve a completed production build
```

## Contributors

The summary below is based primarily on commits, branches, surviving line attribution, and implemented code on the default branch. Git statistics are not treated as exact authorship percentages: the areas overlap, later edits can change blame attribution, and no row claims exclusive ownership of a feature.

| Contributor | Contribution areas visible in repository history |
| --- | --- |
| Melani Triana | Client, coach, and admin dashboard flows; coach discovery, requests, and availability; exercise and payment administration; workout and meal-plan services and integration |
| Kevin Guzman | Landing and dashboard integration; activity/progress charts; notifications; client plan and settings flows; real-time chat; broad API and deployment fixes |
| Gaby Gonzalez | Coach workout and meal-plan builders; coach requests and availability; authentication and dashboard fixes |
| Nick | Coach discovery and profiles; activity and strength-logging interfaces; settings and early nutrition/billing/chat scaffolding; icon and image fixes |
| Michael Kema | Shared portal shells; authentication, profile, and media flows; API integration; billing; admin and coach interfaces |
| Justin Santiago | Client fitness-goal/profile work and chat fixes |

## Related repository

- [HeraHealth backend API](https://github.com/mtriana14/NEW-WORKOUT-APP-BACK-END-CS490-)

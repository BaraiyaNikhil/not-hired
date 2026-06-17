@AGENTS.md

# Project: NotHired

## App Architecture & Routes

- `/` → Landing page (simple, clean, deploy it publicly)
- `/dashboard` → Stats + insights + AI nudges
- `/applications` → Kanban board view
- `/applications/new` → Add application form
- `/applications/[id]` → Detail view + notes + timeline
- `/reminders` → Upcoming follow-ups
- `/insights` → Full AI analysis page with chat bot like mentor

## Tech Stack — Exact Choices

- **Frontend:** Next.js 14 (App Router) - Shows you know modern Next
- **Styling:** Tailwind + shadcn/ui - Fast, looks professional
- **Auth:** Clerk or NextAuth - Don't waste time building auth
- **Database:** PostgreSQL + Prisma - Shows real DB thinking
- **Hosting:** Vercel + Supabase - Free, fast, impressive
- **AI:** Claude API - Ironic and smart choice
- **Drag & Drop:** `@dnd-kit` - Modern, accessible
- **Charts:** Recharts - Simple, works with React

## General Instructions

1. **Components:** must use shadcn ui components when needed make list of components import it refctore and use, for custom components use tailwind css classes and arrange in there page name folder in `@/components/` folder or in `@/components/shared` folder. create new compoentes aggrassively and don't ever make it in same of page file import it to use it. make client components only it necessary not every component must be client component match components with chalk and board theme.
2. **State Management:** use zustand for state management make store for all the moduls and wrap it and if need make one central store for data that need across all the components.
3. **Types:** Always use typescript for type safety and save it under "types" folder.
4. **Auth:** all auth related logic use Clerk or NextAuth.
5. **Database:** use postgresql for database and prisma as orm.
6. **Animation:** use framer-motion for animations.
7. **Theme:** use tailwind css for theming and always give both dark and light mode support to the app by default.
8. **Form & Validation:** Always use react-hook-form and zod for form handling and validation.
9. **Actions:** use next-safe-action for server actions and create actions in "actions" folder with there own folder name.
10. **Services:** create services to use in action and it must be async functions and create all services in "services" folder with there own folder name.
11. **Hooks:** create custom hooks in "hooks" folder.
12. **Types:** create types for each action and its return type.
13. **Component Granularity:** keep components small and focused — one responsibility per component. Aggressively extract sub-components (e.g. a card, a row, a badge) into their own files inside the same feature folder. A component file should rarely exceed ~150 lines. NEVER define a component inside another component or page file; ALWAYS make it a separate component in its own file and import it. Even skeleton components must be separated and placed in the skeleton folder and prefer component reusability.
14. **Mock / Fake Data:** never define static mock or fake data arrays inline inside a component file. All fake data (demo cards, placeholder content, sample stats, etc.) must live in a dedicated `data/` folder, organised by feature (e.g. `data/landing/hero.data.ts`, `data/landing/board.data.ts`). Export the data as typed constants and import them into the component that needs them.
15. **Memorization:** memorize heavy component and heavy function or list of items useCallback hook on functions and memo on components.
16. **Skeleton Loading:** Always implement skeleton loading states using the custom `Skeleton` component (which matches the chalk theme) for pages and components that fetch data or have significant load times and put it under components/skeleton folder with there respective page name folder. Do not use skeletons for simple static pages.

@AGENTS.md

# Project: NotHired

## General Instructions

1. **Componets:** must use shadcn ui components when needed make list of components import it refctore and use, for custom components use tailwind css classes and arrange in there page name folder in '@/components/' folder or in '@/components/shared' folder. create new compoentes aggrassively and don't ever make it in same of page file import it to use it. every component import must get ore theme style
2. **State Management:** use zustand for state management.
3. **types:** Always use typescript for type safety and save it under "types" folder in there respective folder.
4. **auth:** all auth related logic use supabase auth.
5. **Database:** use postgresql for database and prisma as orm.
6. **animation:** use motion for animations.
7. **theme**: use tailwind css for theming and always give both dark and light mode support to the app by default.
8. **Form & Validation:** Always use react-hook-form and zod for form handling and validation.
9. **actions:** use next-safe-action for server actions and create actions in "actions" folder with there own folder name.
10. **services:** create services to use in action and it must be async functions and create all services in "services" folder with there own folder name.
11. **hooks:** create custom hooks in "hooks" folder with there own folder name.
12. **types:** create types for each action and its return type.

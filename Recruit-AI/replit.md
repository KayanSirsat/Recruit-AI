# Recruit-AI

## Overview

Recruit-AI is an AI-powered candidate screening application designed to help recruiters efficiently match job descriptions with resumes. The application follows Material Design 3 principles adapted for professional recruitment workflow tools, prioritizing clarity, efficiency, and data readability.

The system is a full-stack TypeScript application with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables
- **Build Tool**: Vite with hot module replacement

The frontend follows a page-based structure with reusable components. Pages are located in `client/src/pages/` and shared components in `client/src/components/`. The design system uses CSS custom properties for theming with light/dark mode support.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: Node.js with HTTP server
- **API Pattern**: RESTful API with `/api` prefix for all routes
- **Development**: tsx for TypeScript execution, Vite dev server integration

Routes are registered in `server/routes.ts` and the storage layer abstraction is in `server/storage.ts`. The server supports both development mode (with Vite middleware) and production mode (serving static files).

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` using Drizzle's table definitions
- **Migrations**: Managed via Drizzle Kit with output to `./migrations`
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod

Currently implements an in-memory storage class (`MemStorage`) as a placeholder, with the database schema ready for PostgreSQL connection via `DATABASE_URL` environment variable.

### Build System
- **Client Build**: Vite produces optimized bundles to `dist/public`
- **Server Build**: esbuild bundles server code to `dist/index.cjs`
- **Bundling Strategy**: Key dependencies are bundled to reduce cold start times, while others remain external

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### AI/ML Services
- **OpenAI**: AI integration for candidate screening (client library included)
- **Google Generative AI**: Alternative AI provider support

### UI Framework
- **Radix UI**: Headless component primitives (dialog, dropdown, tabs, etc.)
- **shadcn/ui**: Pre-styled component library configured in `components.json`
- **Lucide React**: Icon library

### Form Handling
- **React Hook Form**: Form state management
- **Zod**: Schema validation with `@hookform/resolvers` integration

### Additional Services
- **Stripe**: Payment processing integration
- **Nodemailer**: Email sending capability
- **Passport.js**: Authentication framework with local strategy support
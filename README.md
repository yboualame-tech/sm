# Student Management System

A full-stack web application for managing students with authentication built with:

- **Next.js 16** - React framework with server and API routes
- **Prisma 7** - ORM with SQLite database adapter
- **NextAuth.js** - Authentication and authorization
- **Tailwind CSS** - Styling
- **TypeScript** - Type-safe code

## Features

- User authentication with NextAuth.js (Google OAuth support)
- Student CRUD operations (Create, Read, Update, Delete)
- Session management
- Secure API endpoints
- Responsive UI

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- SQLite (included with better-sqlite3)

### Installation

```bash
npm install
npx prisma migrate dev
npm run dev
```

The application will start at `http://localhost:3000`.

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## API Endpoints

### Students

- `GET /api/students` - Fetch all students
- `POST /api/students` - Create a new student
- `PUT /api/students` - Update a student
- `DELETE /api/students?id=1` - Delete a student

### Authentication

- `POST /api/auth/signin` - Sign in with credentials
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session

## Building for Production

```bash
npm run build
npm run start
```

## Deployment

The application is ready for deployment on Vercel. See `vercel.json` for configuration.

### Deploying to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

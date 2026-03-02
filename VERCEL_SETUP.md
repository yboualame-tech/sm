# PostgreSQL Setup Guide for Vercel Deployment

## 🚀 What Changed?

Your application now uses **PostgreSQL** instead of SQLite. This makes it work on Vercel!

✅ **Before**: SQLite (local files) - **doesn't work on Vercel**
✅ **Now**: PostgreSQL (cloud database) - **works everywhere**

---

## 📋 Setup Instructions

### Step 1: Create a Free PostgreSQL Database

**Option A: Neon.tech** (Recommended - 2 min setup)

1. Go to https://neon.tech
2. Sign up (free account)
3. Create a new project
4. Click "Create database"
5. Copy the **Connection String** (looks like: `postgresql://user:password@...`)

**Option B: Railway.app** (Alternative)

1. Go to https://railway.app
2. Create new project → PostgreSQL
3. Copy connection string from Variables tab

**Option C: Supabase** (Alternative)

1. Go to https://supabase.com
2. Create new project
3. Get connection string from Project Settings → Database

---

### Step 2: Update Vercel Environment Variables

1. Go to **Vercel Dashboard** → Your Project (sm)
2. Go to **Settings** → **Environment Variables**
3. **Update/Create these variables:**

```
DATABASE_URL = postgresql://your:password@host:port/dbname
NEXTAUTH_URL = https://sm.vercel.app  (or your actual Vercel domain)
NEXTAUTH_SECRET = (generate new: openssl rand -base64 32)
```

**To get your Vercel domain:**
- Go to your project in Vercel dashboard
- Look at "Production" deployment
- Your domain looks like: `sm-yboualame-tech.vercel.app`

4. **Click Save**

---

### Step 3: Redeploy on Vercel

1. Go to **Deployments** tab
2. Find your latest failed deployment
3. Click the **⋮ menu** → **Redeploy**

OR manually trigger:
```bash
git push origin main
```

---

## 🧪 Test Locally (Optional)

If you want to test with a PostgreSQL locally:

### Using Docker (Easiest)

```bash
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=student_management \
  -p 5432:5432 \
  postgres:latest
```

Then update `.env.local`:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/student_management"
```

### Manual PostgreSQL Installation

- **macOS**: `brew install postgresql`
- **Ubuntu**: `sudo apt install postgresql`
- **Windows**: Download from https://www.postgresql.org

Create database:
```bash
createdb student_management
```

Update `.env.local`:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/student_management"
```

---

## ✅ Verify It's Working

After deployment:

1. Go to your Vercel domain (e.g., https://sm.vercel.app)
2. Click **Sign Up**
3. Create account with:
   - **Name**: Test User
   - **Email**: test@example.com
   - **Password**: TestPass123
4. Click **Sign In**
5. Create a student

If successful → **You're done!** 🎉

---

## 🆘 Troubleshooting

### Still getting "unable to open database file"?

1. **Check `DATABASE_URL` is set in Vercel**
   - Go to Settings → Environment Variables
   - Verify it starts with `postgresql://`
   - NOT `file://` or empty

2. **Redeploy after setting variables**
   - Variables won't apply until you redeploy
   - Go to Deployments → Redeploy latest

3. **Check database is accessible**
   - Test connection string in terminal (if local PostgreSQL installed)
   - Make sure database exists

### "Error connecting to database"?

- **Wrong connection string?** Copy-paste from database provider again
- **Database down?** Check your database provider dashboard
- **Wrong password?** Verify credentials in connection string

### "NEXTAUTH_URL mismatch"?

Make sure `NEXTAUTH_URL` matches your Vercel domain exactly:
```
Vercel Domain: sm-yboualame-tech.vercel.app
NEXTAUTH_URL: https://sm-yboualame-tech.vercel.app
```

---

## 📚 Useful Links

- Neon.tech: https://neon.tech
- Railway.app: https://railway.app
- Supabase: https://supabase.com
- Vercel Docs: https://vercel.com/docs

---

## Summary

| What | Where | Value |
|------|-------|-------|
| Database | Neon.tech or Railway | PostgreSQL |
| DATABASE_URL | Vercel → Settings | postgresql://... |
| NEXTAUTH_URL | Vercel → Settings | https://your-domain.vercel.app |
| NEXTAUTH_SECRET | Vercel → Settings | Random 32-byte string |

**Once you set these 3 variables, Vercel will work!** 🚀

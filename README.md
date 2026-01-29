# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Supabase + Google OAuth (required)

This app uses **Supabase** for database and **Google OAuth** for sign-in (no demo or email/password).

**First-time setup:** create a Supabase project and configure OAuth:

1. Create a new Supabase project and add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to `.env`
2. Enable Google OAuth in Supabase and add Google Cloud OAuth credentials
3. Run the database migrations

### Database migrations – required for benefits

Apply the migrations so the app can load countries, issuers, card products, and benefits:

```sh
# If using Supabase CLI and a linked project:
supabase db push

# Or run the SQL in supabase/migrations/ manually in the Supabase SQL Editor:
# 1) 20260127180000_create_benefits_schema.sql
# 2) 20260127180100_seed_india_visa_benefits.sql
```

After that, the **Select your card** flow (Country → Bank → Card) will load real benefits from the database. No card numbers are stored; only the selected card product is persisted in `localStorage`.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Deploy on Vercel

1. Push this repo to GitHub (e.g. [Visa](https://github.com/Shashank-V-A/Visa)).
2. Go to [Vercel](https://vercel.com) and sign in with GitHub.
3. Click **Add New** → **Project**, import the **Visa** (or this repo) repository.
4. Leave **Framework Preset** as **Vite**. Build command: `npm run build`, output: `dist`.
5. Add **Environment Variables** (same as `.env`; never commit real values):
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = your Supabase anon/public key
6. Click **Deploy**. Vercel will build and host the app; future pushes to `main` auto-deploy.

**Lovable:** You can also open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and use Share → Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

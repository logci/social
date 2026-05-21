# CJP SOCIAL

iOS-themed social media site built for Vercel.

## Features
- Upload images/videos to Catbox (`https://catbox.moe/user/api.php`)
- Save Catbox direct URL + caption into MongoDB
- Home feed renders media cards with thumbnail/video preview

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file and run:
   ```bash
   cp .env.example .env.local
   npm run dev
   ```
3. Deploy on Vercel and set env vars (`MONGODB_URI`, `MONGODB_DB_NAME`).

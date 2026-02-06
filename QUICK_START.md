# ⚡ Quick Start Guide

## 📥 Just Downloaded? Start Here!

### Step 1: Install Node.js (if you haven't)
- Download from: https://nodejs.org/
- Install the LTS version
- Verify: Open terminal and type `node --version`

### Step 2: Install Dependencies
```bash
cd sri-lanka-tourism
npm install
```
*(This takes 2-3 minutes and creates the node_modules folder)*

### Step 3: Run the Website
```bash
npm run dev
```

### Step 4: Open Your Browser
Go to: **http://localhost:3000**

🎉 **You're done!** The website is running locally.

---

## 📤 Upload to GitHub (3 Ways)

### Option A: GitHub Desktop (Easiest!) ⭐
1. Install: https://desktop.github.com/
2. File → Add Local Repository → Select this folder
3. Publish to GitHub → Done!

### Option B: VS Code
1. Open folder in VS Code
2. Click Source Control icon (left sidebar)
3. Initialize Repository
4. Publish to GitHub

### Option C: Command Line
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
git push -u origin main
```

---

## 🎨 Customize Your Website

### Change Colors
Edit: `tailwind.config.js`

### Update Content
Edit: `src/data/mockData.ts`

### Add Images
Add to: `public/images/` folder
Update image paths in mockData.ts

---

## 🚀 Deploy to Internet (Free!)

### Vercel (Recommended)
1. Go to: https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Click Deploy
5. **Your site is live!** 🌐

### Netlify
1. Go to: https://netlify.com
2. Drag and drop your folder
3. Site is live!

---

## 📁 Project Structure

```
sri-lanka-tourism/
├── src/
│   ├── app/              # All pages
│   ├── components/       # Reusable UI components
│   └── data/            # Mock data
├── public/              # Images and static files
├── package.json         # Dependencies list
└── README.md           # Full documentation
```

---

## ❓ Common Issues

**"npm: command not found"**
→ Install Node.js first

**"Port 3000 already in use"**
→ Close other apps or use: `npm run dev -- -p 3001`

**Changes not showing?**
→ Save files and refresh browser (Ctrl+R)

**Want to stop the server?**
→ Press Ctrl+C in terminal

---

## 🎯 Next Steps

1. ✅ Run locally (`npm run dev`)
2. ✅ Customize content in mockData.ts
3. ✅ Upload to GitHub
4. ✅ Deploy to Vercel
5. ✅ Share your website! 🎉

---

**Need more help?** Check `GITHUB_SETUP.md` or `README.md`

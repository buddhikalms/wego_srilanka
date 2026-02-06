# GitHub Setup Guide

## 📦 What's Included

This is a clean version of the Sri Lanka Tourism Website ready for GitHub.

- ✅ All source code
- ✅ Configuration files
- ✅ README with full documentation
- ✅ .gitignore configured
- ❌ No node_modules (you'll install these)
- ❌ No build files

## 🚀 Quick Upload to GitHub

### Method 1: Using GitHub Desktop (Easiest)

1. **Download and Install GitHub Desktop**
   - Go to: https://desktop.github.com/
   - Install and sign in with your GitHub account

2. **Create New Repository**
   - File → New Repository
   - Name: `wego_srilanka` (or your preferred name)
   - Local Path: Choose where you extracted this folder
   - Click "Create Repository"

3. **Publish to GitHub**
   - Click "Publish repository" button
   - Uncheck "Keep this code private" if you want it public
   - Click "Publish Repository"

Done! ✨

### Method 2: Using Command Line

1. **Navigate to project folder**
```bash
cd path/to/sri-lanka-tourism
```

2. **Initialize Git**
```bash
git init
git add .
git commit -m "Initial commit: Sri Lanka Tourism Website"
```

3. **Create repository on GitHub**
   - Go to https://github.com/new
   - Repository name: `wego_srilanka`
   - Click "Create repository"

4. **Push to GitHub**
```bash
git remote add origin https://github.com/YOUR-USERNAME/wego_srilanka.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## 🔧 After Uploading

When someone (or you on another computer) clones the repository:

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/wego_srilanka.git
cd wego_srilanka

# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:3000

## 📝 Important Notes

### File Size
- This clean version is < 5MB (perfect for GitHub)
- Original with node_modules was > 500MB (too large!)
- Anyone can rebuild node_modules with `npm install`

### What's NOT Included
- `node_modules/` - Install with `npm install`
- `.next/` - Created when you run `npm run dev`
- Build files - Generated when needed

### Production Deployment

For Vercel (Recommended):
1. Go to https://vercel.com
2. Import your GitHub repository
3. It will auto-deploy! ✨

For other platforms, run:
```bash
npm run build
npm start
```

## 🐛 Troubleshooting

**Problem: "git: command not found"**
- Solution: Install Git from https://git-scm.com/

**Problem: Large files error when pushing**
- Solution: Make sure you have the `.gitignore` file
- Run: `git rm -r --cached node_modules` if needed

**Problem: Can't push to GitHub**
- Solution: Make sure you created the repository on GitHub first
- Check your remote URL: `git remote -v`

## 📞 Need Help?

- GitHub Docs: https://docs.github.com/
- Next.js Docs: https://nextjs.org/docs
- Vercel Deploy: https://vercel.com/docs

---

**Built with ❤️ for Sri Lanka Tourism**

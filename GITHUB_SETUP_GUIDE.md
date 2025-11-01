# GitHub Setup Guide for Beginners

## Step 1: Create a GitHub Account (if you don't have one)

1. Go to https://github.com
2. Click "Sign up" in the top right
3. Enter your email, create a password, and choose a username
4. Verify your email address

## Step 2: Create a New Repository on GitHub

1. After logging into GitHub, click the "+" icon in the top right corner
2. Select "New repository"
3. **Repository name**: Choose a name (e.g., "apex-ai-assistant" or "my-apex-project")
4. **Description** (optional): Add a short description like "Apex AI Assistant project"
5. **Visibility**: Choose Public (anyone can see) or Private (only you can see)
6. ⚠️ **IMPORTANT**: Do NOT check any of these boxes:
   - ❌ Don't check "Add a README file" (we already have one)
   - ❌ Don't check "Add .gitignore" (we already have one)
   - ❌ Don't check "Choose a license" (optional, but not needed now)
7. Click the green "Create repository" button

## Step 3: Copy Your Repository URL

After creating the repository, GitHub will show you a page with instructions. You'll see a URL that looks like:
- `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`

**Copy this URL** - you'll need it in the next step!

## Step 4: Open Terminal and Navigate to Your Project

Your project is located at: `/Users/wilsonfarhatjr./v0230`

If you're using Cursor's terminal (which you are), you're already in the right place!

## Step 5: Connect Your Local Project to GitHub

Run these commands one by one in the terminal:

### Replace the URL with YOUR repository URL from Step 3:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Example:** If your username is "johnsmith" and repo name is "apex-ai-assistant", it would be:
```bash
git remote add origin https://github.com/johnsmith/apex-ai-assistant.git
```

### Then push your code:

```bash
git branch -M main
git push -u origin main
```

## Step 6: Authenticate

When you run `git push`, you might be asked to log in:

**If you see a login prompt:**
- Use your GitHub username
- For password: You'll need a **Personal Access Token** (not your regular password)

### How to create a Personal Access Token:

1. Go to GitHub.com → Click your profile picture (top right) → **Settings**
2. Scroll down and click **Developer settings** (left sidebar)
3. Click **Personal access tokens** → **Tokens (classic)**
4. Click **Generate new token** → **Generate new token (classic)**
5. Give it a name like "My Computer"
6. Select expiration (30 days, 90 days, or no expiration)
7. Check the box: **repo** (this gives access to repositories)
8. Click **Generate token** at the bottom
9. **COPY THE TOKEN IMMEDIATELY** - you won't see it again!
10. When asked for password in terminal, paste this token instead of your password

## Step 7: Verify It Worked

1. Go back to your repository page on GitHub
2. Refresh the page
3. You should see all your files there! 🎉

## Troubleshooting

### "fatal: remote origin already exists"
Run this first:
```bash
git remote remove origin
```
Then run Step 5 again.

### "Permission denied" or "Authentication failed"
- Make sure you're using your Personal Access Token (not your password)
- Check that the repository name in the URL matches exactly

### "Repository not found"
- Double-check the repository name and username in the URL
- Make sure the repository exists on GitHub
- Make sure it's not private and you have access

## Need Help?

If you get stuck at any step, let me know what error message you see and I'll help you fix it!


# Push to GitHub - Simple Instructions

Your repository is connected to: https://github.com/fredfarhat55-cpu/v0230.git

## Step 1: Create a Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. **Note**: Give it a name like "My Computer"
4. **Expiration**: Choose 30 days, 90 days, or no expiration
5. **Select scopes**: Check the box for **"repo"** (this gives full repository access)
6. Scroll down and click **"Generate token"**
7. **COPY THE TOKEN** - it looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - ⚠️ You won't see it again, so copy it now!

## Step 2: Push Your Code

You have two options:

### Option A: Push with authentication prompt (Easier)

Run this command in your terminal:
```bash
cd /Users/wilsonfarhatjr./v0230
git push -u origin main
```

When prompted:
- **Username**: `fredfarhat55-cpu`
- **Password**: Paste your Personal Access Token (NOT your GitHub password)

### Option B: Use token in URL (Alternative)

Update the remote URL with your username:
```bash
cd /Users/wilsonfarhatjr./v0230
git remote set-url origin https://fredfarhat55-cpu@github.com/fredfarhat55-cpu/v0230.git
git push -u origin main
```

When prompted for password, paste your Personal Access Token.

## Step 3: Verify

1. Go to: https://github.com/fredfarhat55-cpu/v0230
2. Refresh the page
3. You should see all your files! 🎉

## Need Help?

If you get any errors, let me know and I'll help you fix them!


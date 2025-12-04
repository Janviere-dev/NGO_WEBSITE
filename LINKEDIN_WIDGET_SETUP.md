# LinkedIn Widget Setup Guide - Hope for Tomorrow

## Overview
Your website is ready to display LinkedIn posts in a beautiful grid format (10 posts in squares). Follow these steps to activate the widget.

---

## Step-by-Step Setup

### 1. Create a Curator.io Account (FREE)
- Go to: **https://www.curator.io**
- Click **"Sign Up"** (free plan available)
- Create your account with email

### 2. Connect Your LinkedIn Company Page
- Log in to Curator.io
- Click **"Create New Feed"**
- Select **"LinkedIn"** as the source
- Choose **"Company Page"**
- Enter your company name: **Hope for Tomorrow**
- LinkedIn URL: `https://www.linkedin.com/company/hope-for-tomorro/`
- Authorize the connection (Curator will guide you)

### 3. Configure Feed Settings
In Curator.io dashboard:
- **Number of Posts**: Set to **10** (or your preferred number)
- **Grid Layout**: Select **"Grid"** view
- **Columns**: Set to **5** (for nice squares on desktop)
- **Auto-refresh**: Enable (new posts appear automatically)
- **Style**: Keep default or customize colors

### 4. Get Your Embed Code
- In Curator.io, click **"Embed"** or **"Get Code"**
- Copy the embed script (looks like `<script src="https://..."></script>`)

### 5. Add Code to Your Website
- Open your `index.html` file
- Find this section (around line 160-180):
```html
<!-- Curator.io Widget will be embedded here -->
<!-- Placeholder for LinkedIn feed widget -->
<div id="curator-feed" style="text-align: center; padding: 40px 20px;">
    <p>Loading our latest LinkedIn posts...</p>
    <a href="...">Visit Our LinkedIn Page</a>
</div>
```

- Replace it with your Curator.io embed code from Step 4
- The widget will automatically fetch your 10 latest posts in a grid

### 6. Customize the Style (Optional)
In Curator.io settings, you can:
- Change grid columns/rows
- Adjust spacing between posts
- Set auto-refresh interval
- Customize colors to match your brand (orange #f69e2f, teal #043142)

---

## What Will Happen
✅ Posts display in a clean **5-column grid** on desktop  
✅ Posts appear in **square tiles** with images  
✅ **"Show More" button** loads 10 additional posts  
✅ **New posts automatically appear** when you post on LinkedIn  
✅ No manual updates needed!

---

## URL References
- **Your LinkedIn Company Page**: https://www.linkedin.com/company/hope-for-tomorro/
- **Curator.io**: https://www.curator.io
- **Website Section**: "Hope for Tomorrow at Work" (below Donate CTA)

---

## Troubleshooting

**Q: Widget not showing?**
- Make sure you authorized Curator to access your LinkedIn
- Check that your embed code is correctly pasted in index.html
- Wait a few minutes for the widget to load

**Q: Posts not updating?**
- Enable "Auto-refresh" in Curator.io settings
- Manually refresh your website cache (Ctrl+Shift+R or Cmd+Shift+R)

**Q: Want to change number of posts?**
- Go to Curator.io dashboard → Feed settings → Change post count

---

## Next Steps
1. Sign up at curator.io
2. Connect your LinkedIn company page
3. Get the embed code
4. Send me the code and I'll integrate it into your website
5. Test it on the live website

**Questions?** Let me know once you have the embed code!

# Deploying Kanya's Pleating to Cloudflare Pages

## Folder structure
```
kanyas-pleating/
├── index.html
├── styles.css
└── script.js
```

That's it — no build step, no Node.js required.

---

## Before you deploy: 2 things to update

### 1. WhatsApp number in `script.js`
Open `script.js` and find line:
```js
const WHATSAPP_NUMBER = '91XXXXXXXXXX';
```
Replace `91XXXXXXXXXX` with your actual number.  
Format: country code + number, no spaces, no `+`.  
Example: `+91 98765 43210` → `919876543210`

### 2. Phone links in `index.html`
Search for `91XXXXXXXXXX` in `index.html` and replace with the same number.  
Also update the `telephone` field in the JSON-LD structured data block.

---

## Step-by-step: GitHub → Cloudflare Pages

### Step 1 — Create a GitHub repository
1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. Click **New repository**.
3. Name it `kanyas-pleating` (or any name you like).
4. Set it to **Public** (required for the free Cloudflare tier).
5. Click **Create repository**.

### Step 2 — Upload your files
**Option A — GitHub web UI (easiest)**
1. On your new repo page, click **Add file → Upload files**.
2. Drag and drop `index.html`, `styles.css`, and `script.js`.
3. Click **Commit changes**.

**Option B — Git CLI**
```bash
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kanyas-pleating.git
git push -u origin main
```

### Step 3 — Connect to Cloudflare Pages
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign in (free account works).
2. In the left sidebar, click **Workers & Pages → Pages**.
3. Click **Create a project → Connect to Git**.
4. Authorise Cloudflare to access GitHub and select your `kanyas-pleating` repository.
5. On the **Set up builds and deployments** screen:
   - **Framework preset**: `None`
   - **Build command**: *(leave empty)*
   - **Build output directory**: `/` (root)
6. Click **Save and Deploy**.

Cloudflare will deploy your site in about 30 seconds.  
You'll get a free URL like `https://kanyas-pleating.pages.dev`.

---

## Step 4 — Add a custom domain (optional but recommended)

If you have a domain (e.g., `kanyaspleating.com`):

1. In your Cloudflare Pages project, go to **Custom domains → Set up a custom domain**.
2. Enter your domain name.
3. Follow the DNS instructions — Cloudflare will add the records automatically if your domain is already on Cloudflare, or give you CNAME records to add elsewhere.
4. SSL/HTTPS is provisioned automatically and is free.

---

## Step 5 — Future updates

Every time you push a commit to the `main` branch on GitHub, Cloudflare Pages will **automatically redeploy** within seconds.  
No manual steps needed.

---

## Cost breakdown
| Resource | Cost |
|---|---|
| Cloudflare Pages hosting | Free (unlimited bandwidth) |
| Cloudflare SSL certificate | Free |
| GitHub repository | Free |
| Custom domain (optional) | ~₹800–1,200/year |

**Total running cost: essentially ₹0** (or just the domain if you buy one).

---

## Quick checklist before going live
- [ ] Updated `WHATSAPP_NUMBER` in `script.js`
- [ ] Updated phone links in `index.html`
- [ ] Replaced placeholder gallery images with real photos
- [ ] Updated testimonials with real customer reviews
- [ ] Replaced `og-image.jpg` reference with a real image for social sharing
- [ ] Tested the WhatsApp form on mobile
- [ ] Verified the site looks good on both mobile and desktop

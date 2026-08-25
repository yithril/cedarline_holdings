# Cedar Line Holdings — Website

One-page static site for [cedarline-holdings.com](https://cedarline-holdings.com), hosted free on GitHub Pages.

Vending machine placement and service for businesses in Southeast Michigan.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The entire page: hero, about, how it works, services, why us, service area, contact, footer |
| `styles.css` | Design system (CSS custom properties) plus all component and responsive styles |
| `main.js` | Mobile nav toggle and reveal-on-scroll (about 40 lines, no dependencies) |
| `images/` | Web-optimized photos used by the page |
| `images/originals/` | Full-size licensed originals, not referenced by the site |
| `CNAME` | Tells GitHub Pages the custom domain is `cedarline-holdings.com` |

No build step, no framework, no npm. Edit the files and push.

## Local preview

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

Opening `index.html` directly also works, but a server better matches production.

## Deploy to GitHub Pages

### 1. Push to GitHub

```bash
git add .
git commit -m "Cedar Line Holdings site"
git push origin main
```

### 2. Enable GitHub Pages

1. Repo on GitHub → **Settings** → **Pages**
2. Source: **Deploy from branch** → `main` / `/ (root)`
3. Under **Custom domain**, enter `cedarline-holdings.com`
4. Once DNS resolves, tick **Enforce HTTPS** (the certificate can take up to 24 hours)

### 3. DNS records (registered agent panel)

Log into your domain DNS settings and add:

| Type  | Host / Name    | Value                              |
|-------|----------------|------------------------------------|
| A     | `@` (or blank) | `185.199.108.153`                  |
| A     | `@`            | `185.199.109.153`                  |
| A     | `@`            | `185.199.110.153`                  |
| A     | `@`            | `185.199.111.153`                  |
| CNAME | `www`          | `<your-github-username>.github.io` |

Delete any conflicting A or CNAME records for `@` or `www` first, such as default parking-page records.

Propagation usually takes 15 minutes to a few hours.

## Contact form (required before launch)

The form posts to [Formspree](https://formspree.io) (free tier: 50 submissions per month). It will not work until you connect it:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and set the notification email to `info@cedarline-holdings.com`
3. Copy the form ID
4. In `index.html`, replace `YOUR_FORM_ID`:

```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

The form already includes a hidden `_subject` field so inquiries are labeled in your inbox, and a `_gotcha` honeypot to cut spam.

## Professional email: info@cedarline-holdings.com

### Option A — Registered agent email forwarding (free, try first)

Most registered-agent domain bundles include forwarding:

1. Log into your domain or registered agent portal
2. Find **Email** or **Mail settings**
3. Forward `info@cedarline-holdings.com` to your personal inbox
4. To reply *as* `info@`, set up Gmail **Send mail as** (Settings → Accounts) if they give you SMTP credentials

### Option B — Google Workspace (about $7/user/month)

A real mailbox at your domain. Add Google's MX and TXT verification records in your DNS panel.

### Option C — Zoho Mail (free for 1 user)

Free mailbox at your domain. Add Zoho's MX records in DNS.

## Images

Photos in `images/` are web-optimized derivatives. The full-size licensed files live in `images/originals/`.

| File | Source |
|------|--------|
| `hero-workplace.jpg` | iStock (licensed) |
| `service-placement.jpg` | iStock (licensed) |
| `service-products.jpg` | iStock (licensed) |
| `service-support.jpg` | iStock (licensed) |
| `breakroom.jpg` | Unsplash (free license) |

`images/originals/iStock-1180101097.jpg` (a hand inserting a coin into an older machine) is intentionally unused, because it reads as cash-only and works against the card payment message.

### Regenerating optimized images

Requires [ffmpeg](https://ffmpeg.org). Lower `-q:v` means higher quality and larger files (2 is best, 4 is a good balance).

```bash
ffmpeg -y -i "images/originals/iStock-1341107316.jpg" -vf "scale=1400:-2" -q:v 3 "images/hero-workplace.jpg"
ffmpeg -y -i "images/originals/iStock-2233007333.jpg" -vf "scale=900:-2"  -q:v 4 "images/service-placement.jpg"
ffmpeg -y -i "images/originals/iStock-1216551692.jpg" -vf "scale=900:-2"  -q:v 4 "images/service-products.jpg"
ffmpeg -y -i "images/originals/iStock-2266202972.jpg" -vf "scale=900:-2"  -q:v 4 "images/service-support.jpg"
```

If you swap an image, update the `width` and `height` attributes on the corresponding `<img>` in `index.html` so the browser reserves the right space and the page does not jump while loading.

Replace these with photos of your own machines and locations when you have them. Real photos are more persuasive than stock.

### Michigan map

The outline in the service area section is an inline SVG path derived from public domain US Census boundary data, so there is no license or attribution requirement. The green dot marks Southeast Michigan.

## Design system

Colors, spacing, radii, and container widths are CSS custom properties at the top of `styles.css`. Change a value there and it updates everywhere.

```css
--cedar-700: #1e4534;  /* primary brand: buttons, links, accents */
--cedar-900: #12271d;  /* dark sections and footer */
--paper-50:  #faf9f6;  /* warm off-white section background */
```

Typography is [Inter](https://fonts.google.com/specimen/Inter), loaded from Google Fonts.

## Content notes

The copy is deliberately conservative and should stay that way:

- Machines are described as **set up to accept cards and mobile payment alongside cash**. No claims about smart vending, cameras, or AI.
- No-cost placement is always tied to **qualifying locations**, never promised universally.
- Product selection is described as **adjustable based on what sells**, never as a guarantee that a specific item is always stocked.
- Service area is **Southeast Michigan**. The Okemos address is labeled *mailing address* because it is a registered agent address, not a storefront.
- No testimonials, customer logos, review scores, machine counts, or years in business, since none of those can be substantiated yet.

Update this list if the business changes so the site does not drift into claims it cannot back up.

### Acquisitions section

There is a low-key `#acquire` band above the contact form for operators who want to sell machines, accounts, or routes. It is intentionally quiet: smaller heading, no photo, and only a footer nav link rather than a spot in the main navigation, so the page still reads as a vending service site rather than a buy-out pitch.

The contact form handles both audiences. The **What can we help with?** dropdown routes the inquiry, and `main.js` hides the location-specific questions (type of location, daily headcount) and relaxes the business name requirement when someone selects the selling option. Without JavaScript every field stays visible and only name, business, email, and city are required, so the form still submits.

## Contact details on the site

| Field | Value |
|-------|-------|
| Phone | (734) 488-8012 |
| Email | info@cedarline-holdings.com |
| Mailing address | 2222 W. Grand River Ave, Ste A, Okemos, MI 48864 |
| Service area | Southeast Michigan |

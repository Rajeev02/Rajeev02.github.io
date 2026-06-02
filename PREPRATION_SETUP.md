# Preparation Portal Setup Guide

## ✅ What's Been Done

### 1. **Security Implementation**

- Created password-protected `/prepration` route using SHA-256 hashing
- Access code: `` (never exposed in client code)
- Session-based access control using `sessionStorage`
- Auto-redirects to login if session expires

### 2. **Data Sanitization**

All sensitive information has been replaced with dummy values:

- `IBM` → `TechCorp`
- `Rajeev` → `Candidate`
- `John Doe` → `Alex Smith`
- `Bengaluru` → `TechCity`

### 3. **Portal Features**

✨ **`/prepration/index.html`** - Login/Access page

- Clean, modern lock screen interface
- SHA-256 password verification (client-side)
- No plaintext code storage

✨ **`/prepration/viewer.html`** - Resource viewer

- Sidebar navigation with 3 categories:
  - **Coding** (11 files) - Practice questions, examples
  - **Theory** (37 files) - React Native concepts
  - **Others** (2 files) - Interview notes
- Markdown rendering with syntax highlighting
- Code files displayed in formatted `<pre>` blocks
- Back navigation button
- Responsive design (mobile-friendly)
- Lock & Exit button for security

## 🚀 How to Access

### Step 1: Build & Deploy

```bash
npm run build
```

### Step 2: Visit the Portal

Navigate to: `https://your-domain.com/prepration/`

### Step 3: Enter Access Code

```

```

### Step 4: Browse Resources

- Select files from the sidebar
- Click "Back to Contents" to return to list
- Click "Lock & Exit" to logout

## 🔒 Security Details

### Client-Side Protection

- Uses Web Crypto API's `SHA-256` algorithm
- Hash: `cb7926f58653d799fa54fdf0803d1a66434fd0d3a75f61855405d539eb836abf`
- Session expires when browser tab closes
- No authentication token in URL

### Why This Approach

✅ Simple to maintain (no backend required for GitHub Pages)
✅ Mobile number never exposed in HTML/CSS/JavaScript
✅ Uses browser's native crypto (no external dependencies)
✅ Session-based (not persistent across closures)

### Note for Production

If you need stronger security:

1. Deploy to Netlify/Vercel (add serverless function for verification)
2. Use HTTP Basic Auth (requires server)
3. Implement OAuth/JWT tokens (requires backend)

## 📁 File Structure

```
public/
├── prepration/
│   ├── index.html       (Login screen)
│   └── viewer.html      (File viewer)

src/
└── prepration/
    ├── coding/          (11 practice files)
    ├── theory/          (37 concept files)
    └── others/          (2 interview notes)
```

## 🎨 UI Features

### Design

- Gradient purple theme (#667eea → #764ba2)
- Responsive grid layout
- Sticky sidebar navigation
- Smooth transitions and hover effects

### Accessibility

- Semantic HTML
- Keyboard navigation support
- Mobile-friendly viewport settings
- High contrast text

## 📝 File Navigation

All files are organized by category:

| Category | Count | Content                               |
| -------- | ----- | ------------------------------------- |
| Coding   | 11    | DSA, practice questions, code samples |
| Theory   | 37    | React Native concepts, architecture   |
| Others   | 2     | Interview case studies                |

**Total**: 50 files + 2 HTML pages

## ✨ Next Steps

1. **Test locally**: `npm run dev`, then visit `http://localhost:8080/prepration/`
2. **Build & deploy**: `npm run build`, deploy to GitHub Pages
3. **Share access code**: Only with intended recipients
4. **Monitor**: Check GitHub Pages analytics for access patterns

## 🔧 Customization

To change the access code, update this line in both files:

**In `public/prepration/index.html` (line 93)**:

```javascript
const ACCESS_HASH = "YOUR_NEW_SHA256_HASH";
```

**In `public/prepration/viewer.html` (line 216)**:

```javascript
const ACCESS_HASH = "YOUR_NEW_SHA256_HASH";
```

To generate a new SHA-256 hash:

```bash
echo -n "your-new-code" | shasum -a 256
```

---

✅ **Setup Complete!** Your preparation portal is ready to deploy.

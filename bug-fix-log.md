# Bug Fix Log

## Bug 1 — Contact link used a different email address

### Problem
The email displayed in the Contact section opened a different address from the sidebar and contact form.

### Cause
The Contact link omitted the dot in `ratul.hasan`, so its visible address and `mailto:` destination did not match the portfolio's other contact destinations.

### Fix
Updated the Contact link text and `mailto:` URL in `index.html` to match the sidebar and form recipient.

### Before
```html
<a href="mailto:ratulhasan112002@gmail.com">ratulhasan112002@gmail.com</a>
```

### After
```html
<a href="mailto:ratul.hasan112002@gmail.com">ratul.hasan112002@gmail.com</a>
```

### Testing
Compared the rendered Contact link, sidebar link, and form recipient before the fix and confirmed the Contact link differed. After the fix, all three use `ratul.hasan112002@gmail.com`. Email delivery was not tested.

## Bug 2 — Markdown markers displayed in project description

### Problem
The ScamShield BD project description displayed literal `**` characters around its name.

### Cause
Markdown bold syntax was written directly in an HTML paragraph, where it is ordinary text rather than formatting.

### Fix
Removed the Markdown markers from the paragraph in `index.html`.

### Before
```html
<p>**ScamShield BD** is a full-stack scam detection and community intelligence platform built for users in
```

### After
```html
<p>ScamShield BD is a full-stack scam detection and community intelligence platform built for users in
```

### Testing
Read the rendered paragraph before the fix and confirmed both pairs of asterisks appeared as text. After the fix, the project description starts with `ScamShield BD is` and contains no Markdown markers.

## Bug 3 — Mobile navigation button label stayed incorrect when open

### Problem
On mobile, opening the navigation changed `aria-expanded` to `true`, but the button continued to announce “Open navigation.”

### Cause
The open and close handlers updated the expanded state but did not update the button's accessible label.

### Fix
Updated `openNav()` and `closeNav()` in `script.js` to set the button label to “Close navigation” and “Open navigation” respectively.

### Before
```js
function closeNav() {
  sidebar.classList.remove('is-open');
  navScrim.classList.remove('is-visible');
  navToggle.setAttribute('aria-expanded', 'false');
}
function openNav() {
  sidebar.classList.add('is-open');
  navScrim.classList.add('is-visible');
  navToggle.setAttribute('aria-expanded', 'true');
}
```

### After
```js
function closeNav() {
  sidebar.classList.remove('is-open');
  navScrim.classList.remove('is-visible');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
}
function openNav() {
  sidebar.classList.add('is-open');
  navScrim.classList.add('is-visible');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close navigation');
}
```

### Testing
On a narrow mobile viewport, confirmed before the fix that the open menu had `aria-expanded="true"` while its label remained “Open navigation.” After the fix, opening and closing the menu updates both the expanded state and label; following a navigation link closes the menu.

## Final Testing

- Confirmed all three reported issues are fixed using the rendered page and its DOM state.
- Checked desktop and narrow mobile layouts; neither had horizontal document overflow.
- Confirmed all six local images loaded and all seven primary navigation links target existing sections.
- Opened the mobile navigation, followed its Projects link, and confirmed the menu closed and the URL fragment changed.
- Selected the JavaScript project filter and confirmed four cards remained; selected All and confirmed all six cards returned.
- Confirmed the contact form rejects empty required fields and accepts populated fields that include a valid email format. The `mailto:` handoff and message delivery were not tested.
- Checked all eight project-link destinations; each returned HTTP 200 to a HEAD request with redirects followed.
- No new obvious layout or interaction problems were observed.

Before/after code excerpts are included above; no before/after screenshots were taken.

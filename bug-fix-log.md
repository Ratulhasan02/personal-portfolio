# Bug Fix Log

No additional functional or visual bugs were identified during the performed layout and interaction checks. One incorrect-contact-destination issue was found and fixed.

| Issue | Fix applied | Testing / verification | Final status |
|---|---|---|---|
| The sidebar email link and contact form used a placeholder address, and the sidebar GitHub and LinkedIn links pointed to placeholder profiles. The LinkedIn link in the contact list was also a placeholder. | Updated these destinations to the portfolio's established email (`ratul.hasan112002@gmail.com`), GitHub profile, and LinkedIn profile. | Inspected the rendered link destinations and submitted the invalid contact form to verify client-side validation. Confirmed both sidebar and contact-list profile links now point to the portfolio's established URLs. The form remains a `mailto:` flow and requires an email app to send; message delivery was not tested. | Fixed |

## Testing Performed

- Loaded the page and confirmed the title, all eight main sections, and all six image assets rendered.
- Checked desktop and narrow mobile viewport widths; neither showed horizontal document overflow.
- Opened the mobile navigation, followed the Projects link, and confirmed the menu closed and the URL fragment updated.
- Verified the navigation targets point to existing page sections.
- Selected the JavaScript project filter and confirmed it showed four matching cards; selected All and confirmed all six cards returned.
- Submitted the contact form with required fields missing and an invalid email; the expected validation message appeared.
- Checked project GitHub links, project live demos, and social destinations. The project GitHub and live demo URLs returned successful HTTP responses. The LinkedIn destination could not be conclusively checked over HTTP because the request was blocked by the network; its URL matches the profile listed in the existing README.
- Checked for broken images; all six local images loaded.

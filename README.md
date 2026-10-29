# Thres — Heart-rate Training Club (Threshold)

1:1 Pixel-Perfect Standalone Clone of `https://thresholdtemplate.framer.website/`

Production build deployed at: https://threshold.landingprofile.com

## Architecture
- Static HTML5 / CSS3 / Vanilla JS with full local assets.
- Complete localization of 31 high-res photography assets and 13 `.woff2` web fonts (`./assets/images/` and `./assets/fonts/`).
- Decoupled from Framer telemetry, tracking scripts, and branding badges.
- Native interactive engine for timetable day switcher, FAQ accordions, and mobile navigation (`./assets/js/interactions.js`).
- Apache / LiteSpeed `.htaccess` clean URL rewrite engine (`/timetable` -> `timetable.html`).

## Directory Structure
```
index.html                     # Home page with interactive week timetable
timetable.html                 # Full schedule
classes.html                   # All classes list
classes/
  strength-circuit.html
  engine-row-and-ride.html
  thres-intervals.html
  mobility-and-breath.html
  max-bag-and-sled.html
  long-run-club.html
coaches.html                   # Coaches overview
coaches/
  mara-oyelaran.html
  tomas-brandt.html
  ines-varga.html
  jonah-achebe.html
membership.html                # Membership tiers
studio.html                    # Facility & equipment
journal.html                   # Training blog & articles
journal/
  zone-two-feels-too-easy.html
  what-your-resting-heart-rate-is-telling-you.html
  the-ramp-test-explained.html
  five-signs-you-are-training-too-hard.html
visit.html                     # Visit & booking inquiry
style-guide.html               # Style guide
legal/
  privacy.html
  terms.html
404.html                       # Custom 404 page
assets/
  fonts/                       # 13 local .woff2 font files
  images/                      # 31 local photography & icon assets
  js/interactions.js           # Native JS interactions
.htaccess                      # LiteSpeed clean URLs & caching
sitemap.xml                    # SEO sitemap
robots.txt                     # Robot exclusions
llms.txt                       # LLM discoverability
```

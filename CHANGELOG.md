# Changelog

---

## 1.1.0 - Work in progress!

Working on minor improvements and bug fixes.

- :bug: **FIX**: URLs starting with a capital letter were considered invalid
- :bug: **FIX**: Local storage links now display in newest-to-oldest order
- :bug: **FIX**: Larger links would exceed page width on mobile devices
- :bug: **FIX**: Alias now supports '-' symbol. Other symbols are still invalid for security purposes
- :sparkles: **NEW**: New atomic rate limiting based on IP address of the user that even works on dsitributed servers
- :sparkles: **NEW**: Dark Theme Added (Beta) 
- :sparkles: **NEW**: Revamped navigation to suit for desktop as well as mobile devices
- :sparkles: **NEW**: Added QR code generation for shortened links
- :sparkles: **NEW**: Added .env support for VueJS frontend
- :sparkles: **NEW**: Added .env variable for setting the alias length.
- :sparkles: **NEW**: Shortened links are now stored in browser's localstorage
- :new: **NEW**: Shortened links now expire after 10 days on their own by default
- :new: **NEW**: Changed the directory structure for easy deployment
- :lipstick: **NEW**: Added Particle.js in frontend background
- :package: **UPDATE**: Updated Packages

---

# 1.0.0

## This is the initial working release

- Stable release on `master` branch

---

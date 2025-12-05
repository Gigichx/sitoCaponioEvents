---
description: Repository Information Overview
alwaysApply: true
---

# Caponio Events Website

## Summary

Caponio Events is a static single-page website built with HTML, CSS, and vanilla JavaScript. The site showcases an event organization and management company offering comprehensive services including event planning, entertainment, photography, videography, catering, and various specialized events (weddings, conferences, concerts, etc.). The website features responsive design, smooth navigation, service carousel, collaborator showcase, and a contact form integrated with Formspree.

## Structure

The repository is organized as a simple static website with the following main directories:

- **`/`**: Root directory containing the main `index.html` entry point
- **`static/CSS/`**: Custom stylesheet and image assets for styling
- **`static/JS/`**: JavaScript functionality for interactivity and form handling
- **`.qodo/`**: QoDo workflow automation configuration (agents and workflows)

## Language & Runtime

**Language**: HTML5, CSS3, JavaScript (ES6+)  
**Runtime**: Browser-based (vanilla JavaScript)  
**Build System**: None (static site)  
**Package Manager**: None (CDN-based dependencies)

## Dependencies

**Main External Libraries** (via CDN):
- **Bootstrap**: 5.3.3 (CSS framework from `cdn.jsdelivr.net`)
- **Font Awesome**: 6.5.1 (Icon library from `cdnjs.cloudflare.com`)
- **Formspree**: Email form submission service

**No npm/package.json or build tooling required.**

## Build & Installation

This is a static website with no build step required.

**To serve locally:**
```bash
# Use any simple HTTP server
python -m http.server 8000
# or
npx http-server
# or
npx live-server
```

Open `index.html` in a browser at `http://localhost:8000`.

## Main Files & Resources

**Entry Point**: `index.html` (23.08 KB)  
**Styling**: `static/CSS/style.css` (1320 lines)  
**Interactivity**: `static/JS/script.js` (316 lines)  

**Key Features in JavaScript**:
- Navbar scroll effect with dynamic styling
- Mobile menu toggle functionality
- Smooth scrolling for navigation links
- Formspree integration for contact form submission
- Form state management and user feedback notifications
- Bootstrap carousel controls for services and collaborators

**Static Assets**:
- Logo: `static/CSS/IMG/logo Caponio remove.png`
- Favicon: `static/CSS/IMG/504201617_122131284686668829_8649897990194310644_n.jpg`
- Collaborator avatars loaded via external URLs

## Website Sections

1. **Navigation**: Fixed navbar with responsive mobile menu
2. **Hero Section**: Main call-to-action banner
3. **Eventi in Programma**: Upcoming events showcase
4. **Services**: 21-service carousel covering event organization, entertainment, and specialized events
5. **Collaborators**: Partner profiles with portfolio links
6. **Chi Siamo**: About section
7. **Contact Form**: Formspree-powered email submission

## Design System

**Color Palette** (CSS Variables):
- Primary Red: `#E63946`
- Dark Red: `#c5303d`
- Light Red: `#ff4757`
- Dark theme: Black/Dark Gray background with white text

**Typography**: Segoe UI, Tahoma, Geneva, Verdana (sans-serif stack)

## Deployment

This static site can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Any standard web server (Apache, Nginx, etc.)

Simply push the repository files to the hosting platform.

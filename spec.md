# Magnolia Bakery Showcase

## Current State
New project. No existing backend or frontend.

## Requested Changes (Diff)

### Add
- Public showcase website for a premium bakery (Magnolia-inspired)
- Sections: Hero, Products/Menu, Our Story, Locations, Contact/Footer
- Admin dashboard (authenticated) to edit all showcase content
- Modular Motoko backend: each domain in its own module file, main.mo only imports and re-exports

### Modify
- N/A

### Remove
- N/A

## Implementation Plan

### Backend (Modular Motoko)
- `modules/Hero.mo` — hero headline, subheading, tagline
- `modules/Products.mo` — product list (name, description, price, category)
- `modules/Story.mo` — bakery story/about text sections
- `modules/Locations.mo` — location entries (name, address, hours)
- `modules/Gallery.mo` — gallery image URLs and captions
- `main.mo` — imports all modules, exposes unified public API via single-line imports

### Frontend
- Public landing page with all showcase sections
- Admin dashboard behind authorization (edit hero, products, story, locations)
- Warm, whimsical visual design inspired by Magnolia Bakery

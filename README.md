# Brew Haven - Artisan Coffee Shop Website

A modern, responsive two-page website for a fictional coffee shop, demonstrating advanced CSS Grid, Flexbox layouts, and comprehensive SASS/SCSS features.

Project Overview

This project showcases a fully functional coffee shop website with two pages:
- **Home Page** (`index.html`) - Features hero section, company features, about section, and popular items
- **Menu Page** (`menu.html`) - Displays full coffee menu with hot and cold beverages

Design Features

- Clean, modern UI design without gradients
- Professional color scheme inspired by coffee aesthetics
- Responsive layout that works on all devices
- Smooth animations and transitions
- High-quality images from Unsplash
- **Font Awesome 6.4.2** icon library (CDN) for professional icons

CSS Layout Implementation

### CSS Grid Layouts (4 implementations)

1. **Footer Layout** (`scss/layout/_footer.scss`)
   - 3-column grid for footer sections
   - Responsive collapse to single column on mobile

2. **Features Grid** (`scss/layout/_grid-section.scss`)
   - 3-column grid for feature items
   - Auto-responsive with `repeat(auto-fit, minmax())`

3. **About Section** (`scss/components/_about.scss`)
   - 2-column grid for image and content
   - Aligns items center for visual balance

4. **Menu Grid** (`scss/layout/_grid-section.scss`)
   - Dynamic grid using `repeat(auto-fit, minmax(300px, 1fr))`
   - Automatically adjusts columns based on screen size

### Flexbox Layouts (2 implementations)

1. **Header Navigation** (`scss/layout/_header.scss`)
   - Horizontal flexbox for navigation links
   - Space-between alignment for logo and nav
   - Responsive vertical stack on mobile

2. **Hero Content** (`scss/components/_hero.scss`)
   - Flex-center mixin for vertical and horizontal centering
   - Column direction for stacked content


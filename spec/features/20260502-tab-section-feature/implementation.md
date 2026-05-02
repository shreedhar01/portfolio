# Implementation - Tab Section

## Steps
1. Add a `<nav>` or `<div>` for tabs below the main header in `index.html`.
2. Define CSS for the tab bar:
   - Border-bottom for the container.
   - Flexbox for alignment.
   - Hover and Active states (orange underline for active).
3. Use media queries to hide "Packages" and "Stars" and show a "More" tab on narrow screens.
4. Add placeholder icons (SVGs) for each tab.

## HTML Structure
```html
<nav class="tab-nav">
    <div class="tab-container">
        <a href="#overview" class="tab-item active">
            <span>Overview</span>
        </a>
        <a href="#repositories" class="tab-item">
            <span>Repositories</span>
            <span class="count">12</span>
        </a>
        <a href="#projects" class="tab-item">
            <span>Projects</span>
        </a>
        <div class="tab-item more-tab">
            <span>More</span>
            <div class="dropdown-content">
                <a href="#packages">Packages</a>
                <a href="#stars">Stars</a>
            </div>
        </div>
    </div>
</nav>
```

## CSS Target
- `border-bottom: 1px solid #d0d7de`
- `padding-top: 16px`
- `gap: 8px`
- Active state: `border-bottom: 2px solid #fd8c73`

# Implementation - Header

## Steps
1. Update `index.html` to include a `<header>` element.
2. Define CSS variables for the header's dark theme in `src/css/style.css`.
3. Style the header using Flexbox for alignment.
4. Add hover effects for navigation links.
5. (Optional) Add a simple toggle for mobile view if necessary.

## HTML Structure
```html
<header class="header">
    <div class="header-container">
        <div class="header-left">
            <div class="logo">GitHubPortfolio</div>
            <nav class="nav-links">
                <a href="#projects">Projects</a>
                <a href="#skills">Skills</a>
                <a href="#about">About</a>
            </nav>
        </div>
        <div class="header-right">
            <input type="text" placeholder="Search..." class="search-input">
            <div class="profile-icon"></div>
        </div>
    </div>
</header>
```

## CSS Target
- `background-color: #24292f`
- `color: #ffffff`
- `padding: 16px`
- `display: flex`

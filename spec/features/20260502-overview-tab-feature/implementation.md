# Implementation - Overview Tab

## Steps
1. Create a container inside `#app` with `display: flex`.
2. **Sidebar**:
   - Style a large avatar image (`border-radius: 50%`).
   - Use `h1` for name and a grey `span` for username.
   - Add a "Socials" section with SVG icons and links.
3. **Pinned Repos**:
   - Create a `div` with `display: grid` and `grid-template-columns: 1fr 1fr`.
   - Style `.repo-card` with a border, padding, and GitHub's specific font sizes/colors.
4. Add media queries to switch to `flex-direction: column` on mobile.

## HTML Structure
```html
<div class="overview-container">
    <aside class="profile-sidebar">
        <div class="large-avatar">
            <img src="assets/images/avatar.jpeg" alt="Shreedhar">
        </div>
        <div class="profile-names">
            <h1 class="full-name">Shreedhar Kala Magar</h1>
            <span class="username">shreedhar01</span>
        </div>
        <div class="social-links">
            <a href="https://www.linkedin.com/in/shreedhar-kala-magar-7a66b424b/" id="linkedin-link">LinkedIn</a>
            <a href="https://github.com/shreedhar01" id="github-link">GitHub</a>
        </div>
    </aside>
    <main class="pinned-section">
        <h3>Pinned</h3>
        <div class="repo-grid" id="pinned-repos-container">
            disign this portion card and like to each repo wil be provided when user click wser will navigat to acutual github repo

            "portfolio https://github.com/shreedhar01/portfolio"
            "chatapp-1-1 https://github.com/shreedhar01/chatapp-1-1"
            "project-bootstrap https://github.com/shreedhar01/project-bootstrap"
            "portfolio-in-npm-registry https://github.com/shreedhar01/portfolio-in-npm-registry"
            "backend https://github.com/shreedhar01/backend"
            "genome-biothon-hackthon https://github.com/shreedhar01/genome-biothon-hackthon"
        </div>
    </main>
</div>
```

## CSS Target
- Sidebar Width: `296px` (Standard GitHub size).
- Repo Card Border: `1px solid #d0d7de`.
- Repo Name Color: `#0969da`.

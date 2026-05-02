# Specification - Overview Tab

## Goal
Create the "Overview" page layout that mirrors a GitHub profile, featuring a personal sidebar and a pinned projects grid.

## Requirements
- **Layout**: Two-column layout (Sidebar ~25%, Main Content ~75%).
- **Sidebar (Left)**:
  - Large circular avatar.
  - Full Name (Display Name).
  - Username (@shreedhar01).
  - Social Links: LinkedIn, GitHub (with icons).
  - Optional: Bio or Location.
- **Main Content (Right)**:
  - "Pinned" heading.
  - Grid of project cards (2 columns on desktop).
  - Each card should show: Project name (link), Description, Language (with color dot).
- **Responsive**: 
  - On mobile (< 768px), the sidebar should move to the top and the main content below it.
  - Repositories grid should collapse to 1 column.

## Components
- `.overview-container`: Flex wrapper for the page.
- `.profile-sidebar`: Left-side container.
- `.pinned-repos`: Right-side grid container.
- `.repo-card`: Individual project card.

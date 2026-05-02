# Specification - Tab Section

## Goal
Create a secondary navigation bar (tabs) that mirrors the GitHub profile navigation, allowing users to switch between different views like Overview, Repositories, and Projects.

## Requirements
- Horizontal list of tabs with icons (optional but preferred).
- "Active" state for the current tab (underline and bold text).
- Responsive Behavior:
  - Priority tabs: Overview, Repositories, Projects.
  - Secondary tabs: Packages, Stars (to be moved into a "More" dropdown/tab for smaller viewports).
- Sticky/Fixed behavior when scrolling past the header (optional, standard GitHub behavior).
- Count bubbles (e.g., repository count) next to tab names.

## Components
- `.tab-container`: Wrapper for the tab bar.
- `.tab-item`: Individual tab link.
- `.tab-item.active`: The currently selected tab.
- `.tab-more`: Dropdown for extra tabs.

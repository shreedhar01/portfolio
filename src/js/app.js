console.log("Portfolio initialized.");

async function fetchGitHubData(username) {
    try {
        // Fetch User Data (for repo count)
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error("Failed to fetch user data");
        const userData = await userRes.json();
        
        const repoCountEl = document.getElementById('repo-count');
        if (repoCountEl) {
            repoCountEl.textContent = userData.public_repos;
        }

        // Fetch Starred Repos (for star count)
        const starredRes = await fetch(`https://api.github.com/users/${username}/starred`);
        if (!starredRes.ok) throw new Error("Failed to fetch starred data");
        const starredData = await starredRes.json();

        const starCountEl = document.getElementById('star-count');
        const starCountMobileEl = document.getElementById('star-count-mobile');
        if (starCountEl) {
            starCountEl.textContent = starredData.length;
        }
        if (starCountMobileEl) {
            starCountMobileEl.textContent = starredData.length;
        }

    } catch (error) {
        console.error("Error fetching GitHub data:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubData('shreedhar01');

    const moreTabBtn = document.getElementById('more-tab-btn');
    const moreDropdown = document.getElementById('more-dropdown');

    if (moreTabBtn && moreDropdown) {
        moreTabBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            moreDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            moreDropdown.classList.remove('show');
        });
    }
});

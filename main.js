"use strict";

const GITHUB_USER_NAME = "leracherry";
const TOP_REPOS_COUNT = 6;

async function getUserRepositories(perPage, pageNumber) {
    fetch(getGitHubRepositoriesURL(GITHUB_USER_NAME, perPage, pageNumber)).then(response => response.json()).then(parsed => {
        displayRepos(parsed);
    });
}

function getGitHubRepositoriesURL(userName, perPage, pageNumber) {
    return `https://api.github.com/users/${userName}/repos?per_page=${perPage}&page=${pageNumber}&sort=stargazers`;
}

function displayRepos(repos) {
    const reposList = document.getElementById("repo-list")

    repos.forEach(repo => {
        if (repo.language == null) {
            return;
        }

        const repoCard = document.createElement("div");
        repoCard.className = "repo-card";

        const repoTitle = document.createElement("h5");
        repoTitle.className = "tl-title";
        repoCard.appendChild(repoTitle)

        const repoLink = document.createElement("a");
        repoLink.className = "repo-title"
        repoLink.href = repo.html_url;
        repoLink.innerText = repo.name;
        repoTitle.appendChild(repoLink);

        const repoContainer = document.createElement("div");
        repoCard.appendChild(repoContainer);


        if (repo.description != null && repo.description !== "") {
            const repoDescription = document.createElement("div");
            repoDescription.className = "repo-description";
            repoDescription.innerText = repo.description;
            repoContainer.appendChild(repoDescription);
        }

        const repoTags = document.createElement("div");
        repoTags.className = "repo-tags"
        repoContainer.appendChild(repoTags)

        repo.topics.forEach(topic => {
            const tag = document.createElement("label");
            tag.className = "repo-tag";
            tag.innerText = topic;
            repoTags.appendChild(tag);
        });

        const repoInfo = document.createElement("div");
        repoInfo.className = "repo-info";
        repoContainer.appendChild(repoInfo);

        const repoLanguage = document.createElement("p");
        repoLanguage.innerText = repo.language;
        repoInfo.appendChild(repoLanguage);

        const repoStars = document.createElement("p");
        repoStars.className = "repo-stars-count";
        repoStars.innerText = `${repo.stargazers_count} `;
        repoInfo.appendChild(repoStars);

        const starIcon = document.createElement("i");
        starIcon.className = "fa fa-star";
        repoStars.appendChild(starIcon);

        reposList.appendChild(repoCard);
    });
}

getUserRepositories(TOP_REPOS_COUNT, 1)
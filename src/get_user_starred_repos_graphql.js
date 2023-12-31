
const fetch = require('node-fetch');

const token = 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN'; // Replace with your GitHub token
const username = 'GITHUB_USERNAME'; // Replace with the desired GitHub username

const graphqlQuery = (cursor) => {
    return {
        query: `
      {
        user(login: "${username}") {
          starredRepositories(first: 100, after: ${cursor ? '"' + cursor + '"' : null}) {
            edges {
              node {
                nameWithOwner
                url
                stargazers {
                  totalCount
                }
              }
              cursor
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    `
    };
};

const fetchStarredRepos = async (cursor = null) => {
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphqlQuery(cursor)),
    });

    const data = await response.json();
    return data.data.user.starredRepositories;
};

const getAllStarredRepos = async () => {
    let hasNextPage = true;
    let cursor = null;
    const allStarredRepos = [];

    while (hasNextPage) {
        const { edges, pageInfo } = await fetchStarredRepos(cursor);
        allStarredRepos.push(...edges.map(edge => edge.node));

        hasNextPage = pageInfo.hasNextPage;
        cursor = pageInfo.endCursor;
    }

    return allStarredRepos;
};

getAllStarredRepos().then(repos => {
    console.log('Starred Repositories:', repos);
}).catch(error => {
    console.error('Error fetching starred repositories:', error);
});


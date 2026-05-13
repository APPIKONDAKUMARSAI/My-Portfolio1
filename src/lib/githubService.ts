export async function fetchGitHubUserData(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error('Failed to fetch user data');
    return await response.json();
  } catch (error) {
    console.error('GitHub API Error:', error);
    return null;
  }
}

export async function fetchGitHubRepos(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch repos');
    const repos = await response.json();
    
    // Sort by stars and prioritize specific keywords or non-forks
    return repos
      .filter((repo: any) => !repo.fork)
      .sort((a: any, b: any) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
      .slice(0, 8);
  } catch (error) {
    console.error('GitHub API Error:', error);
    return [];
  }
}

export async function fetchGitHubEvents(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/events/public`);
    if (!response.ok) throw new Error('Failed to fetch events');
    return await response.json();
  } catch (error) {
    console.error('GitHub API Error:', error);
    return [];
  }
}

export async function fetchGitHubFileMetadata(username: string, repo: string, path: string) {
  try {
    const encodedRepo = encodeURIComponent(repo);
    const encodedPath = encodeURIComponent(path);
    const [contentRes, commitsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${username}/${encodedRepo}/contents/${encodedPath}`),
      fetch(`https://api.github.com/repos/${username}/${encodedRepo}/commits?path=${encodedPath}&page=1&per_page=1`)
    ]);

    if (!contentRes.ok) throw new Error('Failed to fetch file content');
    const content = await contentRes.json();
    
    let lastUpdated = null;
    let version = '1.0.0';

    if (commitsRes.ok) {
      const commits = await commitsRes.json();
      if (commits.length > 0) {
        lastUpdated = commits[0].commit.committer.date;
        // Use short SHA as version or sequence count
        version = commits[0].sha.substring(0, 7);
      }
    }

    return {
      size: content.size,
      downloadUrl: content.download_url,
      lastUpdated,
      version,
      name: content.name
    };
  } catch (error) {
    console.error('GitHub File API Error:', error);
    return null;
  }
}

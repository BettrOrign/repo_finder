export async function fetchToGithub(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "github-trending-cli" },
  });

  if (!response.ok) {
    console.error(`GitHub API error: ${response.status} ${response.statusText}`);
    if (response.status === 403) {
      console.error("Rate limit exceeded. Try again later.");
    }
    return null;
  }

  return response;
}

import { fetchToGithub } from "./fetch.js";

export async function handleSearch(keyword, duration, limit) {
  const since = getDateFromDuration(duration);
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(keyword)}+created:>${since}&sort=stars&order=desc`;

  const response = await fetchToGithub(url);
  if (!response) {
    console.error("Failed to fetch data from GitHub API.");
    return;
  }

  const data = await response.json();

  if (!data.items) {
    console.error("Unexpected API response:", data.message || "Unknown error");
    return;
  }

  const cleanData = data.items.slice(0, limit).map((repo) => ({
    Name: repo.full_name,
    Description: repo.description
      ? repo.description.slice(0, 80) + (repo.description.length > 80 ? "..." : "")
      : "(no description)",
    Stars: repo.stargazers_count,
    Language: repo.language || "N/A",
  }));

  console.table(cleanData);
  console.log(`\nTotal results: ${data.total_count}`);
}

function getDateFromDuration(duration) {
  const now = new Date();
  switch (duration) {
    case "day":
      now.setDate(now.getDate() - 1);
      break;
    case "week":
      now.setDate(now.getDate() - 7);
      break;
    case "month":
      now.setMonth(now.getMonth() - 1);
      break;
    case "year":
      now.setFullYear(now.getFullYear() - 1);
      break;
    default:
      now.setDate(now.getDate() - 7);
  }
  return now.toISOString().split("T")[0];
}

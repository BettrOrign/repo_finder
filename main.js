import { handleSearch } from "./src/functions.js";

const args = process.argv.slice(2);

// Help flag
if (args.includes("--help") || args.includes("-h")) {
  console.log(`
Usage: node main.js <keyword> [options]

Search trending GitHub repositories by keyword.

Arguments:
  keyword                         Search keyword (required)

Options:
  --duration <day|week|month|year>  Time range to search (default: week)
  --limit <number>                  Max results to display (default: 10)
  -h, --help                        Show this help message
`);
  process.exit(0);
}

// Parse flags
let duration = "week";
let limit = 10;
let keyword = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--duration") {
    duration = args[++i];
  } else if (args[i] === "--limit") {
    limit = parseInt(args[++i], 10);
  } else if (keyword === null) {
    keyword = args[i];
  }
}

// Validate duration
const validDurations = ["day", "week", "month", "year"];
if (!validDurations.includes(duration)) {
  console.error(
    `Error: Invalid duration "${duration}". Must be one of: ${validDurations.join(", ")}`,
  );
  process.exit(1);
}

// Validate limit
if (isNaN(limit) || limit <= 0) {
  console.error("Error: --limit must be a positive number.");
  process.exit(1);
}

// Check keyword is provided
if (!keyword) {
  console.error("Error: No search keyword provided.");
  console.log(`
Usage: node main.js <keyword> [options]

Search trending GitHub repositories by keyword.

Arguments:
  keyword                         Search keyword (required)

Options:
  --duration <day|week|month|year>  Time range to search (default: week)
  --limit <number>                  Max results to display (default: 10)
  -h, --help                        Show this help message
`);
  process.exit(1);
}

await handleSearch(keyword, duration, limit);

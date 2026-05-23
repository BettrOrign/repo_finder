# GitHub Trending CLI

A CLI tool to search trending GitHub repositories by keyword and time range, sorted by stars.

## Features

- Search repositories by any keyword
- Filter by time range: day, week, month, or year
- Control the number of results displayed
- Clean table output with name, description, stars, and language
- Handles GitHub API rate limits gracefully

## Usage

```bash
node main.js <keyword> [options]
```

### Arguments

| Argument    | Description       | Required |
|-------------|-------------------|----------|
| `keyword`   | Search keyword    | Yes      |

### Options

| Option                 | Description                          | Default |
|------------------------|--------------------------------------|---------|
| `--duration <value>`   | Time range: day, week, month, year   | week    |
| `--limit <number>`     | Maximum number of results            | 10      |
| `-h, --help`           | Show help message                    |         |

### Examples

Search for trending AI repositories from the past week:

```bash
node main.js ai --duration week --limit 5
```

Search for trending Rust projects from the past month:

```bash
node main.js rust --duration month --limit 10
```

Search for trending Python projects from the past day:

```bash
node main.js python --duration day --limit 3
```

Show help:

```bash
node main.js --help
```

### Help Output

```
Usage: node main.js <keyword> [options]

Search trending GitHub repositories by keyword.

Arguments:
  keyword                         Search keyword (required)

Options:
  --duration <day|week|month|year>  Time range to search (default: week)
  --limit <number>                  Max results to display (default: 10)
  -h, --help                        Show this help message
```

## Example Output

```
┌─────────┬──────────────────────────────┬──────────────────────────────────────────────────┬───────┬──────────┐
│ (index) │            Name              │                  Description                    │ Stars │ Language │
├─────────┼──────────────────────────────┼──────────────────────────────────────────────────┼───────┼──────────┤
│    0    │ 'openai/openai-cookbook'     │ 'Examples and guides for using the OpenAI API...'  │ 60000 │  Python  │
│    1    │ 'Significant-Gravitas/Auto...'│ 'An open-source autonomous AI agent...'           │ 45000 │  Python  │
│  ...    │            ...               │                     ...                          │  ...  │   ...    │
└─────────┴──────────────────────────────┴──────────────────────────────────────────────────┴───────┴──────────┘

Total results: 150000
```

## Project Structure

```
├── main.js            # Entry point — CLI argument parsing
├── package.json       # Project config
└── src/
    ├── fetch.js       # GitHub API fetcher with error handling
    └── functions.js   # Search logic & date utilities
```

## API

Uses the [GitHub Search Repositories API](https://docs.github.com/en/rest/search/search#search-repositories).

Query format: `https://api.github.com/search/repositories?q=<keyword>+created:><since>&sort=stars&order=desc`

The `since` date is calculated from the `--duration` flag relative to the current date.

## License

MIT

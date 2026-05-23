# GitHub Trending Repos

A simple CLI tool to search for trending GitHub repositories by keyword and date range, sorted by stars.

## Features

- Search repositories by keyword with date filtering
- View top 10 results sorted by stars in a clean table
- Configure date range interactively (year, month, day)
- Settings persist to `config.json`

## Usage

```bash
node main.js
```

```
Which repo do you interested for (or 'settings' / 'exit'): ai
```

Search with custom date range by appending year, month, day separated by commas:

```
Which repo do you interested for (or 'settings' / 'exit'): rust,2025,01,01
```

### Settings

Type `settings` to view and update the default date values (year, month, day):

```
Settings > 2026,03,15
```

Type `exit` to quit and save settings.

## Configuration

Date defaults are stored in `config.json` and auto-loaded on startup:
```json
{
  "year": 2026,
  "week": "01",
  "day": "01"
}
```

## Project Structure

```
├── main.js            # Entry point — REPL loop
├── config.json        # Persisted settings
└── src/
    ├── default.js     # Default date values
    ├── fetch.js       # GitHub API fetcher
    └── functions.js   # Settings & search logic
```

## API

Uses the [GitHub Search Repositories API](https://docs.github.com/en/rest/search/search#search-repositories) with query format:

https://roadmap.sh/projects/github-trending-cli

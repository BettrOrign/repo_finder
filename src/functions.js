import { fetchToGithub } from "./fetch.js";
import { writeFile, readFile } from "node:fs/promises";
import { Default } from "./default.js";

// write and edit settings
export async function handleSettings(rl) {
  console.clear();
  console.log("========================================");
  console.log("⚙️  CURRENT SETTINGS");
  console.log("========================================");
  console.log(` Год поиска:  ${Default.year}`);
  console.log(` Месяц:       ${Default.week}`);
  console.log(` День:         ${Default.day}`);
  console.log("----------------------------------------");
  console.log(
    "Введите новые значения через запятую (год,месяц,день) или 'back':",
  );
  console.log("========================================");

  const settingsAnswer = (await rl.question("Settings > ")).trim();

  if (settingsAnswer === "back") return;

  const parts = settingsAnswer.split(",");
  // Обновляем статические свойства, если пользователь ввел валидные числа
  if (parts[0] && Number.isInteger(Number(parts[0])))
    Default.year = parts[0].trim();
  if (parts[1] && Number.isInteger(Number(parts[1])))
    Default.week = parts[1].trim();
  if (parts[2] && Number.isInteger(Number(parts[2])))
    Default.day = parts[2].trim();

  console.log("Настройки сохранены в памяти!");
}

export async function readConfig() {
  try {
    const rawConfig = await readFile("config.json", "utf-8");
    const config = JSON.parse(rawConfig);

    console.log("конфиг загружен");
    return config;
  } catch (error) {
    console.log("конфига нет, используется дефолт");
  }
}

export async function writeConfig() {
  const config = JSON.stringify(
    {
      year: Default.year,
      week: Default.week,
      day: Default.day,
    },
    null,
    2,
  );
  await writeFile("config.json", config, "utf-8");
}

// Github search fn

export async function handleSearch(input) {
  const parts = input.split(",");
  if (parts.length < 1 || parts[0] === "") return;

  const URL = `https://api.github.com/search/repositories?q=${parts[0].trim()}+created:>${
    Number.isInteger(Number(parts[1])) ? parts[1].trim() : Default.year
  }-${Number.isInteger(Number(parts[2])) ? parts[2].trim() : Default.week}-${
    Number.isInteger(Number(parts[3])) ? parts[3].trim() : Default.day
  }&sort=stars&order=desc`;

  const response = await fetchToGithub(URL);
  const data = await response.json();

  const cleanData = data.items.slice(0, 10).map((repo) => ({
    Name: repo.full_name,
    Stars: repo.stargazers_count,
    Url: repo.html_url,
  }));

  console.table(cleanData);
  console.log(`Total count: ${data.total_count}`);
}

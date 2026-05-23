import { createInterface } from "node:readline/promises";
import {
  handleSearch,
  handleSettings,
  readConfig,
  writeConfig,
} from "./src/functions.js";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

await readConfig();

let running = true;

while (running) {
  const answer = (
    await rl.question(
      "Which repo do you interested for (or 'settings' / 'exit'): ",
    )
  ).trim();

  if (answer === "exit") {
    await writeConfig();
    running = false;
    rl.close();
  } else if (answer === "settings") {
    await handleSettings(rl);
  } else {
    await handleSearch(answer);
  }
}

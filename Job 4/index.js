import { readdir } from "node:fs/promises";

const path = "..";

readdir(path).then((files) => {
  for (const file of files) {
    console.log(file);
  }
});

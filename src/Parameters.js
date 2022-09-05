import { readFile, writeFile } from "fs/promises";
import path from "path";
import { ParamsFile } from "../config/Params.js";
const parameters = ParamsFile(process.cwd());
export function setNewParams(param) {
  return new Promise(async function (resolve, reject) {
    const parametrosSankhya = parameters;

    parametrosSankhya[param] = `\${${param}}`;

    try {
      await writeFile(
        path.join(process.cwd(), "params.json"),
        JSON.stringify(parametrosSankhya)
      );
      resolve(`${param}`);
    } catch (error) {
      reject(rror);
    }
  });
}
export function removeParam(param) {
  return new Promise(async function (resolve, reject) {
    const parametrosSankhya = parameters;

    delete parametrosSankhya[param];

    try {
      await writeFile(
        path.join(process.cwd(), "params.json"),
        JSON.stringify(parametrosSankhya)
      );
      resolve(`${param}`);
    } catch (error) {
      reject(rror);
    }
  });
}

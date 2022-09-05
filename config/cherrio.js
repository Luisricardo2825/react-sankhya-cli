import * as fs from "fs";
import * as cheerio from "cheerio";
import { ParamsFile } from "./Params.js";

const parameters = JSON.stringify(ParamsFile(process.cwd()));

const sleep = (ms = 0) => new Promise((r) => setTimeout(r, ms));
export async function Sanitizehtml(file, spinner) {
  var $ = cheerio.load(fs.readFileSync(file), {
    xmlMode: true,
    decodeEntities: false,
    selfClosingTags: false,
  });
  spinner.color = "cyan";
  spinner.text = `Alterando caminho dos links...`;
  $("head link").each(async function (i, elm) {
    $(this).attr("href", "${BASE_FOLDER}" + $(this).attr("href"));
  });
  await sleep();
  spinner.color = "yellow";
  spinner.text = `Alterando caminho dos scripts...`;
  $("head script").each(async function (i, elm) {
    if ($(this).attr("src")) {
      $(this).attr("src", "${BASE_FOLDER}" + $(this).attr("src"));
    }
  });

  await sleep();
  spinner.color = "green";
  spinner.text = `Injetando parametros do sankhya...`;
  $("#sankhyaVariable").each(async function (i, elm) {
    $(this).text(`var param = ${parameters};
    localStorage.setItem("base_folder", "\${BASE_FOLDER}");`);
  });
  await sleep();

  return $.xml().toString();
}

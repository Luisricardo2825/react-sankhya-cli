import { AskForMissing, CreateOption, ask } from "./ask.js";
import { ParamsFile } from "./Params.js";
import { checkIfFileExists } from "./file.js";
import { CommandString, TreatDefaultValues } from "./Command.js";

export {
  AskForMissing,
  ask,
  CreateOption,
  ParamsFile,
  checkIfFileExists,
  CommandString,
  TreatDefaultValues,
  CaptalizeString,
};

function CaptalizeString(string) {
  return (
    `${string[0]}`.toUpperCase() +
    string.substring(1, string.length).toLowerCase()
  );
}

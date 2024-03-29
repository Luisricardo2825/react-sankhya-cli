import inquirer from "inquirer";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

function getPrompts(options) {
  return Object.entries(options).map(
    ([name, { choices, default: _default, message, type, ...rest }]) => ({
      choices,
      default: _default,
      message,
      name,
      type,
      ...rest,
    })
  );
}

function getOptions(options) {
  return Object.entries(options).reduce(
    (
      previous,
      [name, { choices, default: _default, demandOption, describe, type }]
    ) => {
      previous[name] = {
        default: _default,
        demandOption,
        describe,
        type,
      };
      return previous;
    },
    {}
  );
}

export const ask = async (options) => {
  const hideBinArgv = hideBin(process.argv);
  let inquirerOptions = getPrompts(options);
  let selectedOptions = [];

  inquirerOptions = inquirerOptions.filter(
    (option) => !selectedOptions.includes(option.name) && option
  );

  const answers = await inquirer.prompt(inquirerOptions);
  Object.entries(answers).forEach(([key, value]) => {
    value && hideBinArgv.push(`--${key}`, value);
  });

  const argv = yargs(hideBinArgv)
    .usage("Usage: npx $0")
    .command("new:component")
    .options(getOptions(options))
    .parseSync();

  return argv;
};

export const AskForMissing = async function (params, argv) {
  const options = {};

  params.forEach((key) => {
    if (argv[key.name] === undefined) {
      Object.assign(
        options,
        CreateOption({
          name: key.name,
          value: key.value,
          message: key.message,
          type: key.type,
          ...key,
        })
      );
    }
  });

  argv = { ...argv, ...(await ask(options)) };
  return argv;
};

export const CreateOption = function ({ name, message, type, ...rest }) {
  return {
    [name]: {
      // inquirer
      message: message,
      // shared
      type: type || "string",
      ...rest,
    },
  };
};

const { resolve } = require("path");
const { readFileSync, readdirSync } = require("fs");
const { optimize: optimizeSvg } = require("svgo");

const partialFileExtensions = Object.freeze(["hbs", "svg"]);

module.exports = function loadPartials(partialsPath) {
  return readdirSync(partialsPath)
  .reduce(function (partialsConfig, fileName) {
    const fileNameSplit = fileName.split(".");
    const name = fileNameSplit[0];
    const extension = fileNameSplit.pop();

    if (!partialFileExtensions.includes(extension)) { return partialsConfig; }

    const filePath = resolve(partialsPath, fileName);
    const contents = readFileSync(filePath, "utf-8");
    const partial = extension === "svg" ?
      optimizeSvg(contents, { path: fileName }).data :
      contents;

    partialsConfig[name] = {
      filePath,
      partial,
    };

    return partialsConfig;
  }, {});
}

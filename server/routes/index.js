const fs = require("fs");

/**
 * @swagger
 * securityDefinitions:
 *   Bearer:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js" || file.substr(file.lastIndexOf(".") + 1) !== "js")
      return;
    const name = file.substr(0, file.indexOf("."));
    // eslint-disable-next-line
    require(`./${name}`)(app);
  });
};

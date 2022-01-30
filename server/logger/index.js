const pino = require("pino")({
  enabled: process.env.NODE_ENV !== "test",
  level: "debug",
  prettyPrint: {
    levelFirst: true,
    colorize: true,
  },
});

module.exports = pino;

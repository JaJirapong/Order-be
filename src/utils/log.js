var fs = require("fs");
var pino = require("pino-multi-stream");

/* prepare log folder */
if (!fs.existsSync(`${process.env.DATA_PATH}/log`)){
  fs.mkdirSync(`${process.env.DATA_PATH}/log`, { recursive: true });
}

const streams = [
  {
    stream: pino.prettyStream({
      prettyPrint: {
        colorize: true,
        translateTime: "SYS:standard",
      },
    }),
    level: `${process.env.PINO_LOG_LEVEL}` || "info",
  },
  {
    stream: fs.createWriteStream(`${process.env.DATA_PATH}/log/combined.log`, {
      flags: "a",
    }),
    level: `${process.env.PINO_LOG_LEVEL}` || "info",
  },
];

module.exports = pino(
  { level: `${process.env.PINO_LOG_LEVEL}` || "info" },
  pino.multistream(streams)
);

const { createLogger, transports, format } = require("winston"); // Logging

const options = {
  file: {
    level: "info",
    filename: `app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  format: format.combine(format.timestamp(), format.json()),
};

// Initiate the logger
const logger = createLogger({
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;

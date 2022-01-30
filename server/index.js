// Imports
const app = require("./server");
const logger = require("./logger");

// Set PORT
const port = process.env.PORT || 3333;

// Start server
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
  logger.info(`Env: ${process.env.NODE_ENV}`);
});

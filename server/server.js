// Imports
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const pinoHttp = require("pino-http");
const logger = require("./logger");
const { errors } = require("celebrate");
const { RateLimiterMemory } = require("rate-limiter-flexible");

// Init
const app = express();

// Proxy
app.set("trust proxy", true);

// Cors support
app.use(cors());

// Security headers
app.use(helmet());

// Compression
app.use(compression());

// Logger
app.use(pinoHttp({ logger }));

// Protects from DDoS and brute force attacks
const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 points
  duration: 1, // Per second
});
app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
    });
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true, limit: "128mb" }));

// JSON support
app.use(express.json({ limit: "128mb" }));

// Handle error
app.use((error, request, response, next) => {
  logger.error(error);
  return response.status(500).json({
    message: error.message,
  });
});

// Health check
app.get("/healthcheck", (request, response) => {
  response.set("Content-Type", "text/plain");
  response.status(200).send("OK");
});

// Routes
require("./routes")(app);

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "NuBank API Bridge",
      description: "Server para facilitar o uso de API NuBank (Não oficial)",
      servers: ["http://localhost:3333"],
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware celebrate
app.use(errors());

// Export app
module.exports = app;

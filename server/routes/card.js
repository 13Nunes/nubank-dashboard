// Imports
const CardController = require("../controllers/cardController");

// Controllers instance
const cardController = new CardController();

// Middleware
// const { validateCredential } = require("../middlewares/validations");
const { checkToken } = require("../middlewares/parseNuBankToken");

// Init router
module.exports = (app) => {
  /**
   * @swagger
   * /card/getFeed:
   *  get:
   *    tags:
   *      - Card
   *    description: Use to request card feed
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *        description: A successful response
   */
  app.get("/card/getFeed", checkToken, cardController.getFeed);

  /**
   * @swagger
   * /card/getTransactions:
   *  get:
   *    tags:
   *      - Card
   *    description: Use to request card transations
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *        description: A successful response
   */
  app.get("/card/getTransactions", checkToken, cardController.getTransactions);
};

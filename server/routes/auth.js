// Imports
const AuthController = require("../controllers/authController");

// Controllers instance
const authController = new AuthController();

// Middleware
const { validateCredential } = require("../middlewares/validations");

// Init router
module.exports = (app) => {
  /**
   * @swagger
   * definitions:
   *   Credential:
   *     properties:
   *       login:
   *         type: string
   *         format: email
   *       password:
   *         type: string
   *       hash:
   *         type: string
   *     required:
   *      - login
   *      - password
   *      - hash
   */

  /**
   * @swagger
   * /login:
   *   post:
   *     tags:
   *       - Auth
   *     description: Authenticate and get token
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: credentials
   *         description: Credentials object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Credential'
   *     responses:
   *       200:
   *         description: Successfully authenticated
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *               description: Success
   *               default: true
   *       400:
   *         description: Invalid data
   */
  app.post("/login", validateCredential, authController.index);

  /**
   * @swagger
   * /login/myProfile:
   *  get:
   *    tags:
   *      - Auth
   *    security:
   *      - Bearer: []
   *    description: Use to request my data
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *        description: A successful response
   */
  app.get("/myProfile", authController.myProfile);
};

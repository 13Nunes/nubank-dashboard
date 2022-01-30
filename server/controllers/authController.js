// Imports
const { NubankApi } = require("nubank-api");

// Services
const api = new NubankApi();

class AuthController {
  async index(request, response) {
    // Body params
    let { login, password, hash } = request.body;

    // Auth data
    let token = null;

    try {
      await api.auth.authenticateWithQrCode(login, password, hash);
      token = JSON.stringify(api.authState);
    } catch (e) {
      console.error(e.stack);
      return response.json({
        success: false,
        message: "Erro ao autenticar",
      });
    }

    // Output
    return response.json({
      success: true,
      token,
    });
  }

  async forgotPassword(request, response) {}

  async changePassword(request, response) {}

  async myProfile(request, response) {}

  async saveMyProfile(request, response) {}
}

module.exports = AuthController;

// Imports
const moment = require("moment");
const { NubankApi } = require("nubank-api");

class CardController {
  async getFeed(request, response) {
    try {
      // Query string
      const { expiration } = request.query;

      // Token data
      const token = request.decoded;

      // Services
      const api = new NubankApi(token);

      // Get UTC expiration
      const expirationUTC = new Date(new Date(expiration).toUTCString());

      // Get feed
      let feed = await api.card.getFeed();

      // Filter by expiration
      if (expiration) {
        feed = feed.filter((t) => new Date(t.time) >= new Date(expirationUTC));
      }

      // Output
      return response.json({
        success: true,
        feed,
      });
    } catch (e) {
      console.log(e);

      // Output
      return response.json({
        success: false,
        error: e.message,
      });
    }
  }

  async getTransactions(request, response) {
    try {
      // Query string
      const { expiration } = request.query;

      // Token data
      const token = request.decoded;

      // Services
      const api = new NubankApi(token);

      // Get UTC expiration
      const expirationUTC = moment(expiration).utc();
      let limit = moment(expiration).utc();
      limit.date(14).add(1, "months");

      // Get transation
      let transactions = await api.card.getTransactions();

      // Filter by expiration
      if (expiration) {
        transactions = transactions.filter(
          (t) => new Date(t.time) >= expirationUTC.toDate()
        );

        // limit = expirationUTC.date(14).add(1, "months");
        transactions = transactions.filter(
          (t) => new Date(t.time) < limit.toDate()
        );
      }

      // Output
      return response.json({
        success: true,
        filters: {
          start: expirationUTC?.format(),
          finish: limit?.format(),
        },
        transactions,
      });
    } catch (e) {
      console.log(e);

      // Output
      return response.json({
        success: false,
        error: e.message,
      });
    }
  }
}

module.exports = CardController;

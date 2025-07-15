const tmdbService = require("../services/tmdbService");

const tvController = {
  getTrendingTV: async (req, res) => {
    try {
      const { timeWindow = "week", language = "en-US" } = req.query;
      const data = await tmdbService.getTrendingTV(timeWindow, language);

      res.json({
        success: true,
        data: data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(error.response?.status || 500).json({
        success: false,
        error:
          error.response?.data?.status_message || "Failed to fetch trending TV",
        code: error.response?.data?.status_code || 500,
      });
    }
  },
};

module.exports = tvController;

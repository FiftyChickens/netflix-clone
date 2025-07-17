const tmdbService = require("../services/tmdbService");

const searchController = {
  search: async (req, res) => {
    const { query, language = "en-US", page = 1 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: "Search query is required",
      });
    }

    try {
      const data = await tmdbService.searchMulti(query, language, page);
      res.json({
        success: true,
        data: data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(error.response?.status || 500).json({
        success: false,
        error:
          error.response?.data?.status_message || "Failed to perform search",
        code: error.response?.data?.status_code || 500,
      });
    }
  },
};

module.exports = searchController;

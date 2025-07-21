const tmdbService = require("../services/tmdbService");

const movieController = {
  getTrendingMovies: async (req, res) => {
    try {
      const { timeWindow = "week", language = "en-US" } = req.query;
      const data = await tmdbService.getTrendingMovies(timeWindow, language);

      res.json({
        success: true,
        data: data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(error.response?.status || 500).json({
        success: false,
        error:
          error.response?.data?.status_message ||
          "Failed to fetch trending movies",
        code: error.response?.data?.status_code || 500,
      });
    }
  },
  getMoviesByGenre: async (req, res) => {
    const genreId = req.query.genre;
    if (!genreId) {
      return res
        .status(400)
        .json({ success: false, error: "Missing genre parameter" });
    }

    try {
      const data = await tmdbService.getMoviesByGenre(genreId);
      res.json({
        success: true,
        count: data.results.length,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(error.response?.status || 500).json({
        success: false,
        error:
          error.response?.data?.status_message ||
          "Failed to fetch genre movies",
        code: error.response?.data?.status_code,
      });
    }
  },
};

module.exports = movieController;

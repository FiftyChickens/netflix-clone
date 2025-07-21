const request = require("supertest");
const { _createTmdbService } = require("../services/tmdbService")._testExports;
const createApp = require("../createApp");

const mockAxiosInstance = { get: jest.fn() };
const mockService = _createTmdbService(mockAxiosInstance);

// Mock Data
const mockTrendingMovies = [
  { id: 1, title: "Mock trending Movie 1", vote_average: 7.5 },
  { id: 2, title: "Mock trending Movie 2", vote_average: 8.0 },
];

const mockMovieGenres = [
  { id: 1, title: "Mock Movie genre 1", genreId: 16 },
  { id: 2, title: "Mock Movie genre 2", genreId: 80 },
];

const mockTrendingTV = [
  { id: 101, name: "Mock trending TV Show 1", vote_average: 8.5 },
  { id: 102, name: "Mock trending TV Show 2", vote_average: 7.8 },
];

const mockTVGenres = [
  { id: 101, name: "Mock TV Show genre 1", genreId: 10751 },
  { id: 102, name: "Mock TV Show genre 2", genreId: 37 },
];

const mockSearchResults = [
  { id: 1001, title: "Mock Movie Search Result", media_type: "movie" },
  { id: 1002, name: "Mock TV Search Result", media_type: "tv" },
];

// Mock Controllers
const movieController = {
  getTrendingMovies: async (req, res) => {
    try {
      const data = await mockService.getTrendingMovies();
      res.json({ success: true, data });
    } catch {
      res
        .status(500)
        .json({ success: false, error: "Failed to fetch trending movies" });
    }
  },
  getMoviesByGenre: async (req, res) => {
    try {
      const { genre } = req.query;
      if (!genre) {
        return res.status(400).json({
          success: false,
          error: "Genre parameter is required",
        });
      }
      const data = await mockService.getMoviesByGenre(genre);
      res.json({ success: true, data });
    } catch {
      res
        .status(500)
        .json({ success: false, error: "Failed to fetch movies by genre" });
    }
  },
};

const tvController = {
  getTrendingTV: async (req, res) => {
    try {
      const data = await mockService.getTrendingTV();
      res.json({ success: true, data });
    } catch {
      res
        .status(500)
        .json({ success: false, error: "Failed to fetch trending TV shows" });
    }
  },
  getTvByGenre: async (req, res) => {
    try {
      const { genre } = req.query;
      if (!genre) {
        return res.status(400).json({
          success: false,
          error: "Genre parameter is required",
        });
      }
      const data = await mockService.getTvByGenre(genre);
      res.json({ success: true, data });
    } catch {
      res
        .status(500)
        .json({ success: false, error: "Failed to fetch TV shows by genre" });
    }
  },
};

const searchController = {
  searchMulti: async (req, res) => {
    try {
      const { query } = req.query;
      const data = await mockService.searchMulti(query);
      res.json({ success: true, data });
    } catch {
      res
        .status(500)
        .json({ success: false, error: "Failed to perform search" });
    }
  },
};

const app = createApp({ movieController, tvController, searchController });

describe("TMDB Service API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Shared test cases for both movies and TV
  const testMediaEndpoints = (mediaType) => {
    const isMovie = mediaType === "movie";
    const typeLabel = isMovie ? "Movie" : "TV Show";
    const endpointPrefix = isMovie ? "/api/movies" : "/api/tv";
    const mockData = isMovie ? mockTrendingMovies : mockTrendingTV;
    const mockGenreData = isMovie ? mockMovieGenres : mockTVGenres;

    describe(`${typeLabel} Endpoints`, () => {
      describe(`Trending ${typeLabel}s`, () => {
        it(`should fetch trending ${typeLabel.toLowerCase()}s`, async () => {
          mockAxiosInstance.get.mockResolvedValueOnce({
            data: { results: mockData },
          });

          const res = await request(app).get(`${endpointPrefix}/trending`);

          expect(res.statusCode).toBe(200);
          expect(res.body.success).toBe(true);
          expect(res.body.data.results).toEqual(mockData);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/trending/${mediaType}/week`,
            { params: { language: "en-US" } }
          );
        });

        it(`should handle errors when fetching trending ${typeLabel.toLowerCase()}s`, async () => {
          mockAxiosInstance.get.mockRejectedValueOnce({
            response: { status: 500, data: { status_code: 500 } },
          });

          const res = await request(app).get(`${endpointPrefix}/trending`);

          expect(res.statusCode).toBe(500);
          expect(res.body.success).toBe(false);
          expect(res.body.error).toBe(
            `Failed to fetch trending ${isMovie ? "movies" : "TV shows"}`
          );
        });
      });

      describe(`${typeLabel} by Genre`, () => {
        it(`should fetch ${typeLabel.toLowerCase()}s by genre`, async () => {
          const genreId = isMovie ? 16 : 10751;
          mockAxiosInstance.get.mockResolvedValueOnce({
            data: { results: mockGenreData },
          });

          const res = await request(app).get(
            `${endpointPrefix}/genre?genre=${genreId}`
          );

          expect(res.statusCode).toBe(200);
          expect(res.body.success).toBe(true);
          expect(res.body.data.results).toEqual(mockGenreData);

          const expectedParams = {
            language: "en-US",
            sort_by: "popularity.desc",
            with_genres: genreId.toString(),
            without_genres: isMovie
              ? "35,80,99,18,10751,9648,37"
              : "16,35,80,99,18,9648,37",
          };

          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/discover/${mediaType}`,
            { params: expectedParams }
          );
        });

        it(`should handle errors when fetching ${typeLabel.toLowerCase()}s by genre`, async () => {
          mockAxiosInstance.get.mockRejectedValueOnce({
            response: { status: 500, data: { status_code: 500 } },
          });

          const res = await request(app).get(
            `${endpointPrefix}/genre?genre=16`
          );

          expect(res.statusCode).toBe(500);
          expect(res.body.success).toBe(false);
          expect(res.body.error).toBe(
            `Failed to fetch ${isMovie ? "movies" : "TV shows"} by genre`
          );
        });
      });
    });
  };

  // Test both movie and TV endpoints
  testMediaEndpoints("movie");
  testMediaEndpoints("tv");

  describe("Search Endpoints", () => {
    const testCases = [
      {
        query: "Movie",
        expectedCount: 1,
        expectedTitle: "Mock Movie Search Result",
        description: "should return movie results",
      },
      {
        query: "TV",
        expectedCount: 1,
        expectedName: "Mock TV Search Result",
        description: "should return TV results",
      },
      {
        query: "Result",
        expectedCount: 2,
        description: "should return both movies and TV shows",
      },
      {
        query: "Nonexistent",
        expectedCount: 0,
        description: "should return empty array for no matches",
      },
      {
        query: "mOcK",
        expectedCount: 2,
        description: "should be case insensitive",
      },
    ];

    testCases.forEach(
      ({ query, expectedCount, expectedTitle, expectedName, description }) => {
        it(description, async () => {
          mockAxiosInstance.get.mockResolvedValue({
            data: {
              results: mockSearchResults.filter((item) => {
                const title = item.title?.toLowerCase() || "";
                const name = item.name?.toLowerCase() || "";
                return (
                  title.includes(query.toLowerCase()) ||
                  name.includes(query.toLowerCase())
                );
              }),
            },
          });

          const res = await request(app).get(`/api/search?query=${query}`);

          expect(res.statusCode).toBe(200);
          expect(res.body.success).toBe(true);
          expect(res.body.data.results).toHaveLength(expectedCount);

          if (expectedTitle) {
            expect(res.body.data.results[0].title).toBe(expectedTitle);
          }
          if (expectedName) {
            expect(res.body.data.results[0].name).toBe(expectedName);
          }

          expect(mockAxiosInstance.get).toHaveBeenCalledWith("/search/multi", {
            params: {
              query,
              language: "en-US",
              page: 1,
            },
          });
        });
      }
    );

    it("should handle search API errors", async () => {
      mockAxiosInstance.get.mockRejectedValue({
        response: { status: 500, data: { status_code: 500 } },
      });

      const res = await request(app).get("/api/search?query=error");

      expect(res.statusCode).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe("Failed to perform search");
    });
  });
});

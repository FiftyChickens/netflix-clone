const request = require("supertest");
const { _createTmdbService } = require("../services/tmdbService")._testExports;
const createApp = require("../createApp");

const mockAxiosInstance = { get: jest.fn() };
const mockService = _createTmdbService(mockAxiosInstance);

// Mock Data
const mockTrendingMovies = [
  { id: 1, title: "Mock Movie 1", vote_average: 7.5 },
  { id: 2, title: "Mock Movie 2", vote_average: 8.0 },
];

const mockTrendingTV = [
  { id: 101, name: "Mock TV Show 1", vote_average: 8.5 },
  { id: 102, name: "Mock TV Show 2", vote_average: 7.8 },
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
};

const app = createApp({ movieController, tvController });

describe("API Endpoints with Mocks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch mocked trending movies", async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: { results: mockTrendingMovies },
    });

    const res = await request(app).get("/api/movies/trending");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data.results).toHaveLength(2);
  });

  it("should fetch mocked trending TV shows", async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: { results: mockTrendingTV },
    });

    const res = await request(app).get("/api/tv/trending");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data.results).toHaveLength(2);
  });

  it("should handle API errors", async () => {
    mockAxiosInstance.get.mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          status_code: 500,
        },
      },
    });

    const res = await request(app).get("/api/movies/trending");

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body.error).toBe("Failed to fetch trending movies");
  });
});

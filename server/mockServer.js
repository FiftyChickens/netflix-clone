require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Mock Data
const mockTrendingMovies = [
  {
    id: 1,
    title: "Mock Movie 1",
    poster_path: "/mock_movie1.jpg",
    backdrop_path: "/mock_backdrop1.jpg",
    overview: "This is a mock movie for testing purposes",
    vote_average: 7.5,
  },
  {
    id: 2,
    title: "Mock Movie 2",
    poster_path: "/mock_movie2.jpg",
    backdrop_path: "/mock_backdrop2.jpg",
    overview: "Another mock movie for testing",
    vote_average: 8.0,
  },
];

const mockTrendingTV = [
  {
    id: 101,
    name: "Mock TV Show 1",
    poster_path: "/mock_tv1.jpg",
    backdrop_path: "/mock_tv_backdrop1.jpg",
    overview: "This is a mock TV show",
    vote_average: 8.5,
  },
  {
    id: 102,
    name: "Mock TV Show 2",
    poster_path: "/mock_tv2.jpg",
    backdrop_path: "/mock_tv_backdrop2.jpg",
    overview: "Another mock TV series",
    vote_average: 7.8,
  },
];

// Mock Routes
app.get("/api/trending/movies", (req, res) => {
  console.log("Mock: Returning trending movies");
  res.json({
    success: true,
    data: { results: mockTrendingMovies },
    mediaType: "movie",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/trending/tv", (req, res) => {
  console.log("Mock: Returning trending TV shows");
  res.json({
    success: true,
    data: { results: mockTrendingTV },
    mediaType: "tv",
    timestamp: new Date().toISOString(),
  });
});

// Error simulation route
app.get("/api/trending/error", (req, res) => {
  console.log("Mock: Simulating error");
  res.status(500).json({
    success: false,
    error: "Mock error for testing",
    code: 500,
  });
});

// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
  console.log("Available endpoints:");
  console.log(`- GET http://localhost:${PORT}/api/trending/movies`);
  console.log(`- GET http://localhost:${PORT}/api/trending/tv`);
  console.log(
    `- GET http://localhost:${PORT}/api/trending/error (simulates error)`
  );
});

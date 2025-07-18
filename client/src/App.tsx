import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import HomePage from "./pages/HomePage/HomePage";
import RootLayout from "./layouts/RootLayout";
import SearchPage from "./pages/SearchPage/SearchPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="browse" element={<HomePage />} />
      <Route path="search" element={<SearchPage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

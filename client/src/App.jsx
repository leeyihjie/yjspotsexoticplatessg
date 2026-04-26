import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Search from "./pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/upload", element: <Upload /> },
      { path: "/search", element: <Search /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

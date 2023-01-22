import { useMaterialUIController } from "@/context";
import { ErrorPage, Home, Profile } from "@/pages";
import { ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { themeDark, themeLight } from "@/themes";

function App() {
  const [controller] = useMaterialUIController();
  const { lightMode } = controller;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "*",
      element: <Home />,
    },
  ]);

  return (
    <ThemeProvider theme={lightMode ? themeLight : themeDark}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

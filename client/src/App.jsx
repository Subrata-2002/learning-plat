import React from "react";


import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Error from "./pages/Error";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";


import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';


function App() {

  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          
          <Outlet />
         
        </QueryClientProvider>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/courses",
          element: <Courses />
        },
        {
          path: "/*",
          element: <Error/>
        },


      ]
    },
  ]);


  return (
    <div>

      <RouterProvider router={router} />

    </div>
  )
}

export default App

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Register from "@/pages/Register/Register"
import Login from "./pages/Login/Login"
import Akun from "./pages/Akun/Akun"
import TopUp from "./pages/TopUp/TopUp"
import Transaction from "./pages/Transaction/Transaction"
import Home from "./pages/Home/Home"
import Payment from "./pages/Home/Payment"

const routes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { 
        path: "register",
        element: <Register />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "akun",
        element: <Akun />,
      },
      {
        path: "top-up",
        element: <TopUp />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
    ]
  }
]

const router = createBrowserRouter(routes)

function App() {
 return(<RouterProvider router={router} />)
}

export default App

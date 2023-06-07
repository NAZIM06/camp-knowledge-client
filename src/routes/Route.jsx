import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Error from "../pages/Shared/Error";
import Login from "../pages/Login";
import Home from "../pages/Home/Home";
import Register from "../pages/Register";




const route = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home />
            },
          
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
     
      
        ]
    }
])

export default route;
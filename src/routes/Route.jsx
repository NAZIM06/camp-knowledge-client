import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Error from "../pages/Shared/Error";
import Login from "../pages/Login";
import Home from "../pages/Home/Home";




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
            }
     
      
        ]
    }
])

export default route;
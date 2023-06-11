import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Error from "../pages/Shared/Error";
import Login from "../pages/Login";
import Home from "../pages/Home/Home";
import Register from "../pages/Register";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Dashboard from "../layout/Dashboard";
import InstructorRoute from "./InstructorRoute";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import AdminRoute from "./AdminRoute";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import StudentRoute from "./StudentRoute";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import MyEnrolledClasses from "../pages/Dashboard/MyEnrolledClasses/MyEnrolledClasses";
import MySelectedClasses from "../pages/Dashboard/MySelectedClasses/MySelectedClasses";




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
            },
            
            {
                path: 'instructors',
                element: <Instructors/>
            },
            {
                path: 'classes',
                element: <Classes/>
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
                errorElement: <Error></Error>,
                children: [
                    {
                        path: 'add-class',
                        element: <InstructorRoute><AddClass /></InstructorRoute>
                    },
                    {
                        path: 'my-classes',
                        element: <InstructorRoute><MyClasses /></InstructorRoute>
                    },
                    {
                        path: 'manage-users',
                        element: <AdminRoute><ManageUsers/></AdminRoute>
                    },
                    {
                        path: 'manage-classes',
                        element: <AdminRoute><ManageClasses/></AdminRoute>
                    },
                    {
                        path: 'my-selected-classes',
                        element: <StudentRoute><MySelectedClasses/></StudentRoute>
                    },
                    {
                        path: 'payment/:id',
                        element : <StudentRoute><Payment/></StudentRoute>,
                        loader : ({params}) => fetch(`${import.meta.env.VITE_BASE_URL}/selected-class/${params.id}`) 
                    },
                    {
                        path: 'my-enrolled-classes',
                        element: <StudentRoute><MyEnrolledClasses/></StudentRoute>
                    },
                    {
                        path: 'payment-history',
                        element: <StudentRoute><PaymentHistory/></StudentRoute>
                    }
                ]
            }
     
      
        ]
    }
])

export default route;
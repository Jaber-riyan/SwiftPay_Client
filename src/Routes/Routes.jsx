import { createBrowserRouter } from 'react-router-dom';
import ErrorForRoot from '../Error/ErrorForRoot';
import Login from '../Pages/Shared/AuthComponents/Login';
import Register from '../Pages/Shared/AuthComponents/Register';
import MainLayout from '../Layout/MainLayout/MainLayout';
import Home from '../Pages/Home/Home';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import AdminDashboard from '../Pages/Admin/AdminDashboard/AdminDashboard';
import AgentDashboard from '../Pages/Agent/AgentDashboard/AgentDashboard';
import UserDashboard from '../Pages/Users/UserDashboard/UserDashboard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorForRoot></ErrorForRoot>,
        children: [
            {
                path: '/',
                element: <PrivateRoutes><Home></Home></PrivateRoutes>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'admin/dashboard',
                element: <PrivateRoutes><AdminDashboard></AdminDashboard></PrivateRoutes>
            },
            {
                path: 'agent/dashboard',
                element: <PrivateRoutes><AgentDashboard></AgentDashboard></PrivateRoutes>
            },
            {
                path: 'user/dashboard',
                element: <PrivateRoutes><UserDashboard></UserDashboard></PrivateRoutes>
            }
        ]
    },
])

export default router;
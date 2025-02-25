import { createBrowserRouter } from 'react-router-dom';
import ErrorForRoot from '../Error/ErrorForRoot';
import Login from '../Pages/Shared/AuthComponents/Login';
import Register from '../Pages/Shared/AuthComponents/Register';
import MainLayout from '../Layout/MainLayout/MainLayout';
import Home from '../Pages/Home/Home';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';

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
        ]
    },
])

export default router;
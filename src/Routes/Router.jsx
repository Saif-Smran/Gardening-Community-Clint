import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import Register from '../Components/Register';
import Login from '../Components/Login';
import AuthLayout from '../Layouts/AuthLayout';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'share-tip',
                element: <PrivateRoute><div>Share Tip Page</div></PrivateRoute>
            },
            {
                path: 'my-tips',
                element: <PrivateRoute><div>My Tips Page</div></PrivateRoute>
            },
            {
                path: 'explore-gardeners',
                element: <PrivateRoute><div>Explore Gardeners Page</div></PrivateRoute>
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/register',
                element: <Register />
            }
        ]
    }
]);

export default router;
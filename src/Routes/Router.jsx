import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import Register from '../Components/Register';
import Login from '../Components/Login';
import AuthLayout from '../Layouts/AuthLayout';
import PrivateRoute from './PrivateRoute';
import ShareTip from '../Components/ShareTip';
import BrowseTips from '../Components/BrowseTips';
import TipDetails from '../Components/TipDetails';
import ExploreGardeners from '../Components/ExploreGardeners';

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
                element: <PrivateRoute><ShareTip /></PrivateRoute>
            },
            {
                path: 'my-tips',
                element: <PrivateRoute><div>My Tips Page</div></PrivateRoute>
            },
            {
                path: 'explore-gardeners',
                element: <ExploreGardeners />
            },
            {
                path: 'browse-tips',
                element: <BrowseTips />
            },
            {
                path: 'tip-details/:tipId',
                element: <TipDetails />
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
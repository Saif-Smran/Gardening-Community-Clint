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
import MyTips from '../Components/MyTips';
import UpdateTip from '../Components/UpdateTip';
import NotFound from '../Pages/NotFound';
import ErrorBoundary from '../Components/ErrorBoundary';

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
                element: <PrivateRoute><MyTips /></PrivateRoute>
            },
            {
                path: 'update-tip/:tipId',
                element: <PrivateRoute><UpdateTip /></PrivateRoute>
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
                element: <PrivateRoute><TipDetails /></PrivateRoute>
            }
        ]
    },
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />,
        errorElement: <ErrorBoundary />
    }
]);

export default router;
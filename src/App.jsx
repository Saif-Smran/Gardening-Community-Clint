import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Router';
import AuthProvider from './providers/AuthProvider';
import ThemeProvider from './providers/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
    return (
        <HelmetProvider>
            <ThemeProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </ThemeProvider>
        </HelmetProvider>
    );
};

export default App;

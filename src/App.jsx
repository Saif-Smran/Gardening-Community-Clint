import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Router';
import AuthProvider from './providers/AuthProvider';
import ThemeProvider from './providers/ThemeProvider';

const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;

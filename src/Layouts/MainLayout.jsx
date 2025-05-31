import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Foother from '../Components/Foother';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Foother></Foother>
            <Toaster position="top-right" />
        </div>
    );
};

export default MainLayout;
import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaBars, FaTimes, FaTachometerAlt, FaListUl, FaPlus, FaSeedling } from 'react-icons/fa';
import Foother from '../Components/Foother';
import Navbar from '../Components/Navbar';

const dashboardLinks = [
    { to: '/dashboard', label: 'Overview', icon: <FaTachometerAlt /> },
    { to: '/browse-tips', label: 'All Tips', icon: <FaListUl /> },
    { to: '/dashboard/share-tip', label: 'Share Tip', icon: <FaPlus /> },
    { to: '/dashboard/my-tips', label: 'My Tips', icon: <FaSeedling /> },
];

const DashboardLayout = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen flex bg-base-100">
                {/* Sidebar for desktop */}
                <aside className="hidden lg:flex lg:flex-col w-64 bg-base-200 border-r border-base-300 p-6 space-y-4">
                    <Link to="/dashboard" className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
                        <FaSeedling /> Dashboard
                    </Link>
                    <nav className="flex flex-col gap-2">
                        {dashboardLinks.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${isActive ? 'bg-primary text-primary-content' : 'hover:bg-base-300'}`
                                }
                                end={link.to === '/dashboard'}
                            >
                                {link.icon} {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                {/* Hamburger for mobile */}
                {/* <div className="md:hidden fixed top-4 left-4 z-30">
                    <button
                        className="btn btn-ghost btn-circle"
                        onClick={() => setDrawerOpen(true)}
                        aria-label="Open dashboard menu"
                    >
                        <FaBars className="text-2xl" />
                    </button>
                </div> */}
                {/* Drawer overlay */}
                {/* {drawerOpen && (
                    <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setDrawerOpen(false)}></div>
                )} */}
                {/* Drawer menu */}
                {/* <aside
                    className={`fixed top-0 left-0 z-50 w-64 h-full bg-base-200 border-r border-base-300 p-6 space-y-4 transform transition-transform duration-300 md:hidden ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <div className="flex items-center justify-between mb-8">
                        <Link to="/dashboard" className="text-2xl font-bold text-primary flex items-center gap-2" onClick={() => setDrawerOpen(false)}>
                            <FaSeedling /> Dashboard
                        </Link>
                        <button className="btn btn-ghost btn-circle" onClick={() => setDrawerOpen(false)} aria-label="Close dashboard menu">
                            <FaTimes className="text-2xl" />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-2">
                        {dashboardLinks.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${isActive ? 'bg-primary text-primary-content' : 'hover:bg-base-300'}`
                                }
                                end={link.to === '/dashboard'}
                                onClick={() => setDrawerOpen(false)}
                            >
                                {link.icon} {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </aside> */}

                {/* Main content */}
                <main className="flex-1 min-h-screen bg-base-100 p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
            <div className='hidden lg:block border-t-1 border-black bg-black w-full h-1'></div>
            <Foother></Foother>
        </div>
    );
};

export default DashboardLayout; 
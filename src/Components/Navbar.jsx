import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaSeedling, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../providers/ThemeProvider';

const Navbar = () => {
    const { user, Logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = async () => {
        await Logout();
        navigate('/');
    };

    return (
        <div className="navbar bg-base-300 shadow-md">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/browse-tips">Browse Tips</NavLink></li>
                        {user && (
                            <>
                                <li><NavLink to="/share-tip">Share Tip</NavLink></li>
                                <li><NavLink to="/my-tips">My Tips</NavLink></li>
                            </>
                        )}
                        <li><NavLink to="/explore-gardeners">Explore Gardeners</NavLink></li>
                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-2">
                    <FaSeedling className="text-primary text-2xl" />
                    <span className="text-xl font-bold text-primary">GardenGlow</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/browse-tips">Browse Tips</NavLink></li>
                    {user && (
                        <>
                            <li><NavLink to="/share-tip">Share Tip</NavLink></li>
                            <li><NavLink to="/my-tips">My Tips</NavLink></li>
                        </>
                    )}
                    <li><NavLink to="/explore-gardeners">Explore Gardeners</NavLink></li>
                </ul>
            </div>

            <div className="navbar-end gap-2">
                <button 
                    onClick={toggleTheme}
                    className="btn btn-ghost btn-circle"
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme !== 'light' ? (
                        <FaMoon className="text-xl" />
                    ) : (
                        <FaSun className="text-xl text-yellow-500" />
                    )}
                </button>

                {!user ? (
                    <Link to="/auth/login" className="btn btn-primary btn-sm">
                        Login
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end z-10">
                        <div 
                            tabIndex={0} 
                            role="button" 
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img 
                                    alt="user avatar" 
                                    src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52">
                            <li className="menu-title px-2 font-semibold text-primary">
                                {user.displayName || "User"}
                            </li>
                            <li>
                                <button 
                                    onClick={handleLogout}
                                    className="text-error"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;

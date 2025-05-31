import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import ThemeToggle from './ThemeToggle';
import { FaSeedling } from 'react-icons/fa';

const Navbar = () => {
  const { user, Logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await Logout();
    setShowDropdown(false);
    navigate('/');
  };

  const navItems = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Home</NavLink></li>
      <li><NavLink to="/explore-gardeners" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Explore Gardeners</NavLink></li>
      <li><NavLink to="/browse-tips" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Browse Tips</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/share-tip" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Share a Tip</NavLink></li>
          <li><NavLink to="/my-tips" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>My Tips</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navItems}
          </ul>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <FaSeedling className="text-primary text-2xl" />
          <span className="text-xl font-bold text-primary">GardenGlow</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navItems}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />
        
        {!user ? (
          <Link 
            to="/auth/login" 
            className="btn btn-sm btn-primary"
          >
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end z-10">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img 
                  alt="user avatar" 
                  src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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

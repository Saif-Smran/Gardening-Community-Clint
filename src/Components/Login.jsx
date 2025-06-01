import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login, googleLogin, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";
    const [loadingState, setLoading] = useState(false);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            setLoading(true);
            await login(email, password);
            
            await Swal.fire({
                title: 'Welcome back! 🌱',
                text: 'Successfully logged in',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: '#DCEDC8',
                iconColor: '#4CAF50'
            });
            
            // Check for redirect URL
            const redirectUrl = localStorage.getItem('redirectAfterLogin');
            // Clear the stored redirect URL
            localStorage.removeItem('redirectAfterLogin');
            
            // Navigate to the redirect URL if it exists, otherwise go to home
            navigate(redirectUrl || '/');
        } catch (error) {
            console.error('Login error:', error);
            Swal.fire({
                title: 'Login Failed',
                text: error.message || 'Failed to login. Please try again.',
                icon: 'error',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            await Swal.fire({
                title: 'Welcome to GardenGlow! 🌱',
                text: 'Successfully signed in with Google',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: '#DCEDC8',
                iconColor: '#4CAF50'
            });
            
            // Check for redirect URL after Google login too
            const redirectUrl = localStorage.getItem('redirectAfterLogin');
            localStorage.removeItem('redirectAfterLogin');
            navigate(redirectUrl || from, { replace: true });
        } catch (error) {
            Swal.fire({
                title: 'Login Failed',
                text: error.message || 'Failed to login with Google',
                icon: 'error',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        }
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-10 px-4">
            <Helmet>
                <title>Login - GardenGlow</title>
                <meta name="description" content="Log in to your GardenGlow account to share tips, connect with fellow gardeners, and grow your gardening knowledge." />
                <meta name="keywords" content="login, sign in, gardening community, account access" />
            </Helmet>
            <div className="max-w-md w-full space-y-8 bg-base-300 p-8 rounded-xl shadow-lg border border-primary/10">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary">Welcome Back! 🌿</h2>
                    <p className="mt-2 text-base-content/70">Log in to continue your gardening journey</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input 
                            name="email" 
                            type="email" 
                            placeholder="your@email.com" 
                            onChange={handleChange} 
                            className="input input-bordered w-full focus:border-primary" 
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input 
                            name="password" 
                            type="password" 
                            placeholder="••••••••" 
                            onChange={handleChange} 
                            className="input input-bordered w-full focus:border-primary" 
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary w-full"
                    >
                        Login
                    </button>
                </form>

                <div className="divider">OR</div>

                <button 
                    onClick={handleGoogleLogin}
                    className="btn btn-outline w-full gap-2 mb-4 hover:bg-primary hover:text-white"
                >
                    <FaGoogle className="text-xl" /> Continue with Google
                </button>

                <div className="text-center space-y-4">
                    <p className="text-sm">
                        New to GardenGlow? {" "}
                        <Link 
                            to="/auth/register" 
                            state={{ from: location.state?.from }}
                            className="text-primary hover:underline"
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

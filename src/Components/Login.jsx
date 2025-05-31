import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login, googleLogin, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form.email, form.password);
            await Swal.fire({
                title: 'Welcome back! 🌱',
                text: 'Successfully logged in to GardenGlow',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                background: '#DCEDC8',
                iconColor: '#4CAF50'
            });
            navigate(from, { replace: true });
        } catch (error) {
            Swal.fire({
                title: 'Oops!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            await Swal.fire({
                title: 'Welcome to GardenGlow! 🌱',
                text: 'Successfully signed in with Google',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                background: '#DCEDC8',
                iconColor: '#4CAF50'
            });
            navigate(from, { replace: true });
        } catch (error) {
            Swal.fire({
                title: 'Oops!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        }
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <div className="max-w-md w-full p-8 bg-base-300 shadow-xl rounded-xl border border-primary/10">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-primary">Welcome Back! 🌿</h2>
                            <p className="text-base-content/70 mt-2">Please login to your account</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
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
            </div>
        </section>
    );
};

export default Login;

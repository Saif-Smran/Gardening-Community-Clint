import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaGoogle, FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', photoURL: '' });
    const [showPasswordReqs, setShowPasswordReqs] = useState(false);
    const [isTypingPassword, setIsTypingPassword] = useState(false);
    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        special: false
    });
    const { CreatUser, updateUser, googleLogin, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        
        if (name === 'password') {
            setPasswordChecks({
                length: value.length >= 8,
                uppercase: /[A-Z]/.test(value),
                lowercase: /[a-z]/.test(value),
                special: /[!@#$%^&*]/.test(value)
            });
            setIsTypingPassword(value.length > 0);
        }
    };

    const validatePassword = (password) => {
        const isValid = 
            password.length >= 8 && 
            /[A-Z]/.test(password) && 
            /[a-z]/.test(password) && 
            /[!@#$%^&*]/.test(password);

        if (!isValid) {
            Swal.fire({
                title: 'Invalid Password',
                text: 'Please meet all password requirements',
                icon: 'warning',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
            return false;
        }
        return true;
    };

    const saveUserToBackend = async (userData) => {
        try {
            const response = await fetch('https://gardening-community-server-theta.vercel.app/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: userData.name,
                    email: userData.email,
                    photoURL: userData.photoURL,
                    creationTime: new Date().toISOString(),
                    lastSignInTime: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save user data');
            }
        } catch (error) {
            console.error('Error saving user to backend:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validatePassword(form.password)) {
            return;
        }

        try {
            const result = await CreatUser(form.email, form.password);
            
            if (result?.user) {
                await updateUser({
                    displayName: form.name,
                    photoURL: form.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'
                });

                await saveUserToBackend({
                    name: form.name,
                    email: form.email,
                    photoURL: form.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'
                });

                await Swal.fire({
                    title: 'Welcome to GardenGlow! 🌱',
                    text: 'Your account has been created successfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#DCEDC8',
                    iconColor: '#4CAF50'
                });
                
                navigate(from, { replace: true });
            }
        } catch (error) {
            Swal.fire({
                title: 'Registration Failed',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await googleLogin();
            if (result?.user) {
                await saveUserToBackend({
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL
                });

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
            }
        } catch (error) {
            Swal.fire({
                title: 'Sign Up Failed',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        }
    };

    const PasswordRequirement = ({ met, text }) => (
        <div className="flex items-center gap-2 text-sm">
            {met ? (
                <FaCheck className="text-success" />
            ) : (
                <FaTimes className="text-error" />
            )}
            <span className={met ? "text-success" : "text-error"}>{text}</span>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-10 px-4">
            <Helmet>
                <title>Join GardenGlow - Create Account</title>
                <meta name="description" content="Join the GardenGlow community! Create your account to share gardening tips, connect with fellow gardeners, and grow your knowledge." />
                <meta name="keywords" content="register, sign up, create account, join gardening community" />
            </Helmet>
            <div className="max-w-md w-full space-y-8 bg-base-300 p-8 rounded-xl shadow-lg border border-primary/10">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary">Join Our Garden! 🌱</h2>
                    <p className="mt-2 text-base-content/70">Create your account and start your gardening journey</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input 
                            name="name" 
                            type="text" 
                            placeholder="John Doe" 
                            value={form.name}
                            onChange={handleChange} 
                            className="input input-bordered w-full focus:border-primary" 
                            required 
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input 
                            name="email" 
                            type="email" 
                            placeholder="your@email.com"
                            value={form.email}
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
                            value={form.password}
                            onChange={handleChange}
                            onFocus={() => {
                                setShowPasswordReqs(true);
                                setIsTypingPassword(true);
                            }}
                            className="input input-bordered w-full focus:border-primary" 
                            required 
                        />
                        {isTypingPassword && (
                            <div className="mt-2 p-3 bg-base-200 rounded-lg space-y-1">
                                <PasswordRequirement 
                                    met={passwordChecks.length} 
                                    text="At least 8 characters" 
                                />
                                <PasswordRequirement 
                                    met={passwordChecks.uppercase} 
                                    text="One uppercase letter" 
                                />
                                <PasswordRequirement 
                                    met={passwordChecks.lowercase} 
                                    text="One lowercase letter" 
                                />
                                <PasswordRequirement 
                                    met={passwordChecks.special} 
                                    text="One special character (!@#$%^&*)" 
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Profile Photo URL (Optional)</span>
                        </label>
                        <input 
                            name="photoURL" 
                            type="text" 
                            placeholder="https://example.com/your-photo.jpg"
                            value={form.photoURL}
                            onChange={handleChange} 
                            className="input input-bordered w-full focus:border-primary" 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                <div className="divider">OR</div>

                <button 
                    onClick={handleGoogleSignUp}
                    className="btn btn-outline w-full gap-2 mb-4 hover:bg-primary hover:text-white"
                    disabled={loading}
                >
                    <FaGoogle className="text-xl" /> Continue with Google
                </button>

                <div className="text-center space-y-4">
                    <p className="text-sm">
                        Already have an account? {" "}
                        <Link 
                            to="/auth/login" 
                            className="text-primary hover:underline"
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
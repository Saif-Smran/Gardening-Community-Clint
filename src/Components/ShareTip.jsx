import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';

const ShareTip = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        topic: '',
        difficulty: 'Easy',
        description: '',
        image: '',
        category: 'Plant Care',
        availability: 'Public',
    });

    if (authLoading) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-primary mb-4">Please Login</h2>
                    <p className="text-base-content/70">You need to be logged in to share gardening tips.</p>
                </div>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            Swal.fire({
                title: 'Missing Title',
                text: 'Please provide a title for your gardening tip',
                icon: 'warning',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
            return false;
        }

        if (!formData.description.trim() || formData.description.length < 50) {
            Swal.fire({
                title: 'Insufficient Description',
                text: 'Please provide a detailed description (at least 50 characters)',
                icon: 'warning',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
            return false;
        }

        if (!formData.image.trim() || !formData.image.match(/^https?:\/\/.+/)) {
            Swal.fire({
                title: 'Invalid Image URL',
                text: 'Please provide a valid image URL starting with http:// or https://',
                icon: 'warning',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
            return false;
        }

        return true;
    };

    const getOrCreateUser = async () => {
        try {
            // First try to get the user
            let response = await fetch(`https://gardening-community-server-theta.vercel.app/users/${user.email}`);
            
            if (response.ok) {
                return await response.json();
            }
            
            // If user doesn't exist, create them
            if (response.status === 404) {
                response = await fetch('https://gardening-community-server-theta.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL || 'https://i.ibb.co/5GzXkwq/user.png',
                        creationTime: new Date().toISOString(),
                        lastSignInTime: new Date().toISOString(),
                        tipCount: 0,
                        lastActivity: 'Account created',
                        lastActivityTime: new Date().toISOString()
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to create user');
                }

                return await response.json();
            }

            throw new Error('Failed to get or create user');
        } catch (error) {
            console.error('Error in getOrCreateUser:', error);
            throw error;
        }
    };

    const updateUserTipCount = async () => {
        try {
            // Get or create user first
            const userData = await getOrCreateUser();
            
            // Update user with new tip count and activity
            const response = await fetch(`https://gardening-community-server-theta.vercel.app/users/${user.email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lastSignInTime: new Date().toISOString(),
                    tipCount: (userData.tipCount || 0) + 1,
                    lastActivity: 'Shared a gardening tip',
                    lastActivityTime: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating user tip count:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // First save the tip
            const tipData = {
                ...formData,
                author: user?.displayName,
                authorPhoto: user?.photoURL || 'https://i.ibb.co/5GzXkwq/user.png',
                email: user?.email,
                date: new Date().toISOString(),
                likes: 0,
                comments: []
            };

            const tipResponse = await fetch('https://gardening-community-server-theta.vercel.app/tips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tipData),
            });

            if (!tipResponse.ok) {
                throw new Error('Failed to share tip');
            }

            // Then update user data
            await updateUserTipCount();

            await Swal.fire({
                title: 'Success! 🌱',
                text: 'Your gardening tip has been shared with the community',
                icon: 'success',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8',
                timer: 2000,
                showConfirmButton: false
            });
            
            setFormData({
                title: '',
                topic: '',
                difficulty: 'Easy',
                description: '',
                image: '',
                category: 'Plant Care',
                availability: 'Public',
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error',
                text: error.message || 'Failed to share your gardening tip. Please try again.',
                icon: 'error',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-200px)] py-10 px-2 sm:px-4">
            <Helmet>
                <title>Share Garden Tip - GardenGlow</title>
                <meta name="description" content="Share your gardening knowledge and tips with the GardenGlow community. Help fellow gardeners grow and flourish." />
                <meta name="keywords" content="share tips, gardening advice, garden wisdom, community contribution" />
            </Helmet>
            <div className="w-full sm:w-11/12 max-w-3xl mx-auto p-4 sm:p-8 bg-base-300 rounded-xl shadow-xl border border-primary/10">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-2">Share Your Garden Wisdom 🌱</h2>
                <p className="text-center text-base-content/70 mb-6 sm:mb-8">Help fellow gardeners grow and flourish with your tips</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="E.g., Secret to Growing Juicy Tomatoes"
                            value={formData.title}
                            onChange={handleChange}
                            className="input input-bordered focus:input-primary"
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Plant Type / Topic</span>
                            </label>
                            <input
                                type="text"
                                name="topic"
                                placeholder="E.g., Tomatoes, Herbs, etc."
                                value={formData.topic}
                                onChange={handleChange}
                                className="input input-bordered focus:input-primary"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Difficulty Level</span>
                            </label>
                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="select select-bordered focus:select-primary"
                                required
                            >
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            name="description"
                            placeholder="Share your detailed gardening tip here..."
                            value={formData.description}
                            onChange={handleChange}
                            className="textarea textarea-bordered focus:textarea-primary min-h-[150px]"
                            required
                        ></textarea>
                        <label className="label">
                            <span className="label-text-alt text-base-content/70">Minimum 50 characters</span>
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input
                            type="url"
                            name="image"
                            placeholder="https://example.com/your-garden-image.jpg"
                            value={formData.image}
                            onChange={handleChange}
                            className="input input-bordered focus:input-primary"
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="select select-bordered focus:select-primary"
                                required
                            >
                                <option>Plant Care</option>
                                <option>Composting</option>
                                <option>Vertical Gardening</option>
                                <option>Indoor Plants</option>
                                <option>Soil Health</option>
                                <option>Pest Control</option>
                                <option>Seasonal Tips</option>
                                <option>Water Management</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Visibility</span>
                            </label>
                            <select
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                className="select select-bordered focus:select-primary"
                                required
                            >
                                <option>Public</option>
                                <option>Hidden</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Author</span>
                            </label>
                            <input
                                type="text"
                                value={user?.displayName || ''}
                                readOnly
                                className="input input-bordered bg-base-200"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                readOnly
                                className="input input-bordered bg-base-200"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Sharing...
                            </>
                        ) : (
                            <>Share Tip 🌱</>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShareTip;

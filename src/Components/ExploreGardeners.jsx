import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaSeedling, FaLeaf, FaHeart } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from './LoadingAnimation';

const ExploreGardeners = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [gardeners, setGardeners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        experience: 'all',
        status: 'all',
        gender: 'all',
        sortBy: 'experience'
    });

    useEffect(() => {
        fetchGardeners();
    }, [filter]);

    const fetchGardeners = async () => {
        try {
            setLoading(true);
            setError(null);
            let url = 'https://gardening-community-server-theta.vercel.app/gardeners';
            
            const params = new URLSearchParams();
            if (filter.experience !== 'all') params.append('experience', filter.experience);
            if (filter.status !== 'all') params.append('status', filter.status);
            if (filter.gender !== 'all') params.append('gender', filter.gender);
            if (filter.sortBy) params.append('sortBy', filter.sortBy);
            
            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch gardeners');
            
            const data = await response.json();
            
            // Process numeric values
            const processedData = data.map(gardener => ({
                ...gardener,
                experience: getNumericValue(gardener.experience),
                totalTips: getNumericValue(gardener.totalTips),
                sharedTips: getNumericValue(gardener.sharedTips),
                likesReceived: getNumericValue(gardener.likesReceived),
                age: getNumericValue(gardener.age)
            }));
            
            setGardeners(processedData);
        } catch (error) {
            console.error('Error fetching gardeners:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getExperienceBadgeColor = (experience) => {
        const expNum = Number(experience);
        if (expNum >= 10) return 'badge-success';
        if (expNum >= 5) return 'badge-warning';
        return 'badge-info';
    };

    const formatSpecialization = (specialization) => {
        if (!specialization) return '';
        return specialization
            .split(/[-\s]/)
            .filter(word => word.length > 0)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const getNumericValue = (value) => {
        if (!value) return 0;
        if (typeof value === 'object' && '$numberInt' in value) {
            return Number(value.$numberInt);
        }
        if (typeof value === 'string') {
            return Number(value) || 0;
        }
        return Number(value) || 0;
    };

    const handleLike = async (gardenerId) => {
        if (!user) {
            Swal.fire({
                title: 'Login Required',
                text: 'Please login to like gardeners',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }

        // Add your like functionality here
        // This is where you would make the API call to update likes
    };

    if (loading) {
        return <LoadingAnimation />;
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-error mb-4">Failed to Load Gardeners</h2>
                    <p className="text-base-content/70 mb-4">{error}</p>
                    <button 
                        onClick={() => fetchGardeners()} 
                        className="btn btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] py-10 px-4">
            <Helmet>
                <title>Explore Gardeners - GardenGlow</title>
                <meta name="description" content="Connect with passionate gardeners from our community. Find experts, share experiences, and learn from fellow garden enthusiasts." />
                <meta name="keywords" content="gardeners, garden experts, community members, gardening network, plant enthusiasts" />
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-primary mb-2">
                    Explore Gardeners <FaSeedling className="inline-block ml-2" />
                </h2>
                <p className="text-center text-base-content/70 mb-8">
                    Connect with passionate gardeners from our community
                </p>

                {/* Filters and Sorting */}
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    <select 
                        className="select select-bordered select-primary"
                        value={filter.sortBy}
                        onChange={(e) => setFilter({...filter, sortBy: e.target.value})}
                    >
                        <option value="experience">Sort by Experience</option>
                        <option value="totalTips">Sort by Total Tips</option>
                        <option value="likesReceived">Sort by Likes Received</option>
                    </select>

                    <select 
                        className="select select-bordered select-primary"
                        value={filter.experience}
                        onChange={(e) => setFilter({...filter, experience: e.target.value})}
                    >
                        <option value="all">All Experience Levels</option>
                        <option value="beginner">Beginner (0-2 years)</option>
                        <option value="intermediate">Intermediate (3-5 years)</option>
                        <option value="experienced">Experienced (6-10 years)</option>
                        <option value="expert">Expert (11+ years)</option>
                    </select>

                    <select 
                        className="select select-bordered select-primary"
                        value={filter.status}
                        onChange={(e) => setFilter({...filter, status: e.target.value})}
                    >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <select 
                        className="select select-bordered select-primary"
                        value={filter.gender}
                        onChange={(e) => setFilter({...filter, gender: e.target.value})}
                    >
                        <option value="all">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Gardeners Grid */}
                {gardeners.length === 0 ? (
                    <div className="text-center py-10">
                        <h3 className="text-xl font-semibold mb-2">No gardeners found</h3>
                        <p className="text-base-content/70">Try adjusting your filters or check back later!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gardeners.map((gardener) => (
                            <div key={gardener._id} className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-primary/10 overflow-hidden">
                                <figure className="relative h-64">
                                    <img 
                                        src={gardener.image} 
                                        alt={gardener.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <h3 className="text-xl font-bold text-white truncate">{gardener.name}</h3>
                                        <p className="text-white/90 text-sm">
                                            {gardener.age} years old • {gardener.gender}
                                        </p>
                                    </div>
                                </figure>
                                
                                <div className="card-body p-4">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`badge ${getExperienceBadgeColor(gardener.experience)} gap-1 py-3 text-center`}>
                                                <FaLeaf className="shrink-0" /> 
                                                <span className="truncate">{gardener.experience} years</span>
                                            </span>
                                            <span className={`badge ${gardener.status === 'active' ? 'badge-success' : 'badge-error'} gap-1 py-3 text-center`}>
                                                {gardener.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-base-content/70">Total Tips</span>
                                            <span className="font-semibold badge badge-neutral">{gardener.totalTips}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-base-content/70">Likes</span>
                                            <span className="font-semibold badge badge-neutral flex items-center gap-1">
                                                <FaHeart className="text-red-500" /> {gardener.likesReceived}
                                            </span>
                                        </div>
                                        {gardener.specialization && (
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-base-content/70">Specialization</span>
                                                <span className="font-semibold text-right ml-2 max-w-[280px] py-3 text-center badge badge-neutral">
                                                    {formatSpecialization(gardener.specialization)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-3">
                                        <h4 className="font-semibold text-sm mb-1">About</h4>
                                        <p className="text-base-content/70 text-sm line-clamp-2">
                                            {gardener.bio}
                                        </p>
                                    </div>

                                    <div className="card-actions justify-end mt-3">
                                        <button 
                                            className={`btn ${user ? 'btn-primary' : 'btn-disabled'} btn-sm`}
                                            onClick={() => handleLike(gardener._id)}
                                            disabled={!user}
                                            title={!user ? 'Login to like gardeners' : ''}
                                        >
                                            <FaHeart className={user ? 'text-white' : 'text-gray-400'} />
                                            Like
                                        </button>
                                        <button className="btn btn-outline btn-sm">Follow</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExploreGardeners; 
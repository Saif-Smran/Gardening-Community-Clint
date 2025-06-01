import React, { useState, useEffect } from 'react';
import { FaSeedling, FaLeaf, FaHeart } from 'react-icons/fa';

const ExploreGardeners = () => {
    const [gardeners, setGardeners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        experience: 'all',
        status: 'all',
        gender: 'all'
    });

    useEffect(() => {
        fetchGardeners();
    }, [filter]);

    const fetchGardeners = async () => {
        try {
            let url = 'http://localhost:3000/gardeners';
            
            // Add filters if selected
            const params = new URLSearchParams();
            if (filter.experience !== 'all') params.append('experience', filter.experience);
            if (filter.status !== 'all') params.append('status', filter.status);
            if (filter.gender !== 'all') params.append('gender', filter.gender);
            
            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch gardeners');
            
            const data = await response.json();
            setGardeners(data);
        } catch (error) {
            console.error('Error fetching gardeners:', error);
        } finally {
            setLoading(false);
        }
    };

    const getExperienceBadgeColor = (experience) => {
        if (experience >= 10) return 'badge-success';
        if (experience >= 5) return 'badge-warning';
        return 'badge-info';
    };

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-primary mb-2">
                    Explore Gardeners <FaSeedling className="inline-block ml-2" />
                </h2>
                <p className="text-center text-base-content/70 mb-8">
                    Connect with passionate gardeners from our community
                </p>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    <select 
                        className="select select-bordered select-primary"
                        value={filter.experience}
                        onChange={(e) => setFilter({...filter, experience: e.target.value})}
                    >
                        <option value="all">All Experience Levels</option>
                        <option value="beginner">Beginner (0-2 years)</option>
                        <option value="intermediate">Intermediate (3-5 years)</option>
                        <option value="experienced">Experienced (5-10 years)</option>
                        <option value="expert">Expert (10+ years)</option>
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
                                            <span className="font-semibold badge badge-neutral">{gardener?.totalTips || 0}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-base-content/70">Likes</span>
                                            <span className="font-semibold badge badge-neutral flex items-center gap-1">
                                                <FaHeart className="text-red-500" /> {gardener?.likesReceived || 0}
                                            </span>
                                        </div>
                                        {gardener.specialization && (
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-base-content/70">Specialization</span>
                                                <span className="font-semibold truncate ml-2 max-w-[150px] badge badge-neutral">{gardener.specialization}</span>
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
                                        <button className="btn btn-primary btn-sm">View Profile</button>
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
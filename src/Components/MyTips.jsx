import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import LoadingSpinner from './LoadingSpinner';

const MyTips = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyTips();
    }, [user]);

    const fetchMyTips = async () => {
        try {
            const response = await fetch(`https://gardening-community-server-theta.vercel.app/tips/my-tips/${user.email}`);
            if (!response.ok) throw new Error('Failed to fetch tips');
            
            const data = await response.json();
            setTips(data);
        } catch (error) {
            console.error('Error fetching tips:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to load your tips',
                icon: 'error',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (tipId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4CAF50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            background: '#DCEDC8'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://gardening-community-server-theta.vercel.app/tips/${tipId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) throw new Error('Failed to delete tip');

                // Remove tip from state
                setTips(tips.filter(tip => tip._id !== tipId));

                await Swal.fire({
                    title: 'Deleted!',
                    text: 'Your tip has been deleted.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#DCEDC8',
                    iconColor: '#4CAF50'
                });
            } catch (error) {
                console.error('Error deleting tip:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to delete tip',
                    icon: 'error',
                    confirmButtonColor: '#4CAF50',
                    background: '#DCEDC8'
                });
            }
        }
    };

    const handleUpdate = (tipId) => {
        navigate(`/update-tip/${tipId}`);
    };

    const handleViewDetails = (tipId) => {
        navigate(`/tip-details/${tipId}`);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-[calc(100vh-200px)] py-8 sm:py-10 px-2 sm:px-4">
            <Helmet>
                <title>My Garden Tips - GardenGlow</title>
                <meta name="description" content="Manage your gardening tips, track their performance, and share your gardening knowledge with the community." />
                <meta name="keywords" content="my tips, gardening advice, personal garden tips, tip management" />
            </Helmet>
            <div className="w-full sm:w-11/12 max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-2">
                    My Garden Tips 🌿
                </h2>
                <p className="text-center text-base-content/70 mb-6 sm:mb-8">
                    Manage your shared gardening tips
                </p>

                {tips.length === 0 ? (
                    <div className="text-center py-8 sm:py-10">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">No tips found</h3>
                        <p className="text-base-content/70 mb-4">You haven't shared any tips yet.</p>
                        <button 
                            onClick={() => navigate('/share-tip')}
                            className="btn btn-primary btn-sm sm:btn-md"
                        >
                            Share Your First Tip
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        {/* Mobile View */}
                        <div className="sm:hidden space-y-4">
                            {tips.map((tip) => (
                                <div key={tip._id} className="card bg-base-300 shadow-md">
                                    <div className="card-body p-4">
                                        <h3 className="card-title text-primary text-lg">{tip.title}</h3>
                                        <div className="space-y-2">
                                            <p className="text-sm">
                                                <span className="font-medium">Category:</span> {tip.category}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-sm">Difficulty:</span>
                                                <span className={`badge badge-sm ${
                                                    tip.difficulty === 'Easy' ? 'badge-success' :
                                                    tip.difficulty === 'Medium' ? 'badge-warning' :
                                                    'badge-error'
                                                }`}>
                                                    {tip.difficulty}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-sm">Status:</span>
                                                <span className={`badge badge-sm ${tip.status === 'public' ? 'badge-primary' : 'badge-ghost'}`}>
                                                    {tip.status}
                                                </span>
                                            </div>
                                            <div className="flex gap-4 text-sm">
                                                <span>👍 {tip.likes || 0} likes</span>
                                                <span>💬 {tip.comments?.length || 0} comments</span>
                                            </div>
                                        </div>
                                        <div className="card-actions justify-end mt-4">
                                            <button
                                                onClick={() => handleViewDetails(tip._id)}
                                                className="btn btn-ghost btn-sm"
                                                title="View Details"
                                            >
                                                <FaEye className="text-primary" />
                                            </button>
                                            <button
                                                onClick={() => handleUpdate(tip._id)}
                                                className="btn btn-ghost btn-sm"
                                                title="Edit Tip"
                                            >
                                                <FaEdit className="text-warning" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(tip._id)}
                                                className="btn btn-ghost btn-sm"
                                                title="Delete Tip"
                                            >
                                                <FaTrash className="text-error" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop View */}
                        <div className="hidden sm:block">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Difficulty</th>
                                        <th>Status</th>
                                        <th>Likes</th>
                                        <th>Comments</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tips.map((tip) => (
                                        <tr key={tip._id}>
                                            <td className="font-medium">{tip.title}</td>
                                            <td>{tip.category}</td>
                                            <td>
                                                <span className={`badge ${
                                                    tip.difficulty === 'Easy' ? 'badge-success' :
                                                    tip.difficulty === 'Medium' ? 'badge-warning' :
                                                    'badge-error'
                                                }`}>
                                                    {tip.difficulty}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${tip.status === 'public' ? 'badge-primary' : 'badge-ghost'}`}>
                                                    {tip.status}
                                                </span>
                                            </td>
                                            <td>{tip.likes || 0}</td>
                                            <td>{tip.comments?.length || 0}</td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleViewDetails(tip._id)}
                                                        className="btn btn-ghost btn-sm"
                                                        title="View Details"
                                                    >
                                                        <FaEye className="text-primary" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdate(tip._id)}
                                                        className="btn btn-ghost btn-sm"
                                                        title="Edit Tip"
                                                    >
                                                        <FaEdit className="text-warning" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(tip._id)}
                                                        className="btn btn-ghost btn-sm"
                                                        title="Delete Tip"
                                                    >
                                                        <FaTrash className="text-error" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTips; 
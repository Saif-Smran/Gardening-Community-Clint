import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingSpinner from './LoadingSpinner';

const UpdateTip = () => {
    const { tipId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        difficulty: '',
        description: '',
        image: '',
        status: ''
    });

    useEffect(() => {
        const fetchTip = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tips/${tipId}`);
                if (!response.ok) throw new Error('Failed to fetch tip');
                
                const tipData = await response.json();
                setFormData({
                    title: tipData.title,
                    category: tipData.category,
                    difficulty: tipData.difficulty,
                    description: tipData.description,
                    image: tipData.image,
                    status: tipData.status
                });
            } catch (error) {
                console.error('Error fetching tip:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to load tip data',
                    icon: 'error',
                    confirmButtonColor: '#4CAF50',
                    background: '#DCEDC8'
                }).then(() => {
                    navigate('/my-tips');
                });
            } finally {
                setFetchLoading(false);
            }
        };

        fetchTip();
    }, [tipId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:3000/tips/${tipId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to update tip');

            await Swal.fire({
                title: 'Success!',
                text: 'Tip updated successfully',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: '#DCEDC8',
                iconColor: '#4CAF50'
            });

            navigate('/my-tips');
        } catch (error) {
            console.error('Error updating tip:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to update tip',
                icon: 'error',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-[calc(100vh-200px)] py-10 px-2 sm:px-4">
            <Helmet>
                <title>{formData.title ? `Edit: ${formData.title} - GardenGlow` : 'Edit Tip - GardenGlow'}</title>
                <meta name="description" content="Update your gardening tip and improve your contribution to the GardenGlow community." />
                <meta name="keywords" content="edit tip, update gardening advice, improve garden tip" />
            </Helmet>
            <div className="w-full sm:w-11/12 max-w-2xl mx-auto bg-base-300 p-4 sm:p-6 rounded-lg shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">Update Tip</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="Plant Care">Plant Care</option>
                                <option value="Composting">Composting</option>
                                <option value="Vertical Gardening">Vertical Gardening</option>
                                <option value="Indoor Plants">Indoor Plants</option>
                                <option value="Soil Health">Soil Health</option>
                                <option value="Pest Control">Pest Control</option>
                                <option value="Seasonal Tips">Seasonal Tips</option>
                                <option value="Water Management">Water Management</option>
                            </select>
                        </div>

                        <div>
                            <label className="label">Difficulty</label>
                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="label">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full h-32"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="label">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/my-tips')}
                            className="btn btn-ghost"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`btn btn-primary ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Tip'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTip; 
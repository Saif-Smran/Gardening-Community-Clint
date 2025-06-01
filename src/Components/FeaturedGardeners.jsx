import React, { useEffect, useState } from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const FeaturedGardeners = () => {
    const [gardeners, setGardeners] = useState([]);

    const [text] = useTypewriter({
        words: ['Featured Gardeners', 'Expert Plant Enthusiasts', 'Green Thumbs', 'Garden Masters'],
        loop: true,
        delaySpeed: 2000,
        typeSpeed: 70,
        deleteSpeed: 50
    });

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

    useEffect(() => {
        fetch('http://localhost:3000/gardeners/active')
            .then(res => res.json())
            .then(data => {
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
            })
            .catch(err => console.error('Error loading gardeners:', err));
    }, []);

    return (
        <section className="my-10 px-4 md:px-10">
            <h2 className="text-3xl font-bold text-center text-primary mb-6">
                🌿 <span>{text}</span>
                <span className="text-success"><Cursor cursorStyle="_" /></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gardeners.map(gardener => (
                    <div
                        key={gardener._id}
                        className="bg-base-300 shadow-xl rounded-xl p-4 border border-primary/20"
                    >
                        <img
                            src={gardener.image}
                            alt={gardener.name}
                            className="w-full h-56 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold text-primary">{gardener.name}</h3>
                        <p className="text-sm text-gray-600">Age: {gardener.age} | Gender: {gardener.gender}</p>
                        <p className="mt-2 text-sm italic">"{gardener.bio}"</p>
                        <p className="mt-2 text-sm">Experience: {gardener.experience} years</p>
                        <p className="text-sm">Tips Shared: <strong>{gardener.sharedTips}</strong></p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedGardeners;

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const EventSlider = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/slides') // Replace with your real API endpoint
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(event => event?.backgroundImage); // Ensure valid slides
                setEvents(filtered);
            });
    }, []);

    return (
        <div className="my-8">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop={true}
                className="rounded-xl"
            >
                {events.map((event, idx) => (
                    <SwiperSlide key={event._id || idx}>
                        <div
                            className="h-[400px] bg-cover bg-center flex items-center justify-center text-white px-8"
                            style={{ backgroundImage: `url(${event.backgroundImage})` }}
                        >
                            <div className="bg-black/50 p-6 rounded-xl max-w-xl text-center">
                                <h2 className="text-3xl font-bold mb-2">{event.title}</h2>
                                <p className="mb-4">{event.description}</p>
                                <a
                                    href='#'
                                    className="btn btn-primary text-white"
                                >
                                    {event.buttonText}
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default EventSlider;

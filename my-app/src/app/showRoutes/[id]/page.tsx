"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Route {
    _id: string
    origin: string
    destination: string
    departureTime: string
    availableSeats: string
}
export default function BookingDetailPage() {
    const params = useParams();
    const routeId = params.id;
    const [route, setRoute] = useState<Route>();

    useEffect(() => {
        const getRouteData = async () => {
            try {
                const response = await fetch(`/api/route/${routeId}`);
                const data = await response.json();
                setRoute(data.route);
            } catch (error) {
                console.error("Failed to load route", error);
            }
        };

        if (routeId) getRouteData();
    }, [routeId]);

    if (!route) return <div className="p-20 text-center">Loading Trip Details...</div>;

    return (
        <div className="min-h-screen bg-blue-50 p-6 flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full"
            >
                <h2 className="text-2xl font-bold text-blue-900 mb-4 border-b pb-2">
                    Confirm Your Trip
                </h2>

                <div className="space-y-3 text-gray-700">
                    <p><strong>From:</strong> {route.origin}</p>
                    <p><strong>To:</strong> {route.destination}</p>
                    <p><strong>Time:</strong> {route.departureTime}</p>
                    <p><strong>Available Seats:</strong> {route.availableSeats}</p>
                </div>

                <button className="w-full mt-8 bg-blue-900 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition">
                    Complete Booking
                </button>
            </motion.div>
        </div>
    );
}
"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {useRouter} from "next/navigation"

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
    const router = useRouter()

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
    const handleBooking = () => {
        router.push('/make-booking')
    }
    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-blue-50
         p-4 sm:p-8">
            <motion.div
                className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-auto overflow-hidden rounded-2xl
                shadow-lg cursor-pointer"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
            >
                <motion.img
                    src="/images (1).jpeg"
                    alt="Trip"
                    className="w-full h-full object-cover rounded-2xl"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                />
            </motion.div>
            <div className="w-full lg:w-1/2 flex justify-center items-center mt-6 lg:mt-0 lg:ml-12 px-2 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl max-w-lg w-full flex flex-col"
                    style={{ minHeight: "400px" }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 border-b
                    border-blue-300 pb-3">
                        Confirm Your Trip
                    </h2>

                    <div className="space-y-4 text-gray-700 flex-grow text-base sm:text-lg">
                        <p><strong>From:</strong> {route.origin}</p>
                        <p><strong>To:</strong> {route.destination}</p>
                        <p><strong>Time:</strong> {new Date(route.departureTime).toLocaleString()}</p>
                        <p><strong>Available Seats:</strong> {route.availableSeats}</p>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBooking}
                        className="w-full mt-auto bg-blue-900 text-white py-3 rounded-xl font-bold
                        hover:bg-blue-800 transition duration-300 shadow-md hover:shadow-lg">
                        Complete Booking
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}
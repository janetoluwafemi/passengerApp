"use client"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import { motion } from "framer-motion"

interface AllRoutes {
    _id: string
    origin: string
    destination: string
    departureTime: string
    availableSeats: string
}
const ShowRoutes = () => {
    const [routes, setRoutes] = useState<AllRoutes[]>([])
    const router = useRouter()
    const handleOnClick = (id: string) => {
        sessionStorage.setItem('_id', id)
        router.push(`/showRoutes/${id}`);
    }
    useEffect(() => {
        async function getAllRoutes() {
            try {
                const response = await fetch('/api/route')

                const data = await response.json()

                console.log("API RESPONSE:", data)

                if (response.ok && Array.isArray(data.routes)) {
                    setRoutes(data.routes)
                } else {
                    setRoutes([])
                }

            } catch (error) {
                console.log(error)
                setRoutes([])
            }
        }

        getAllRoutes()
    }, [])
    return (
        <div className="w-full min-h-screen flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-gray-800 text-center mb-6"
            >
                All Routes Made
            </motion.div>

            <div className="w-full max-w-6xl flex-1">
                {routes && routes.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {routes.map((route) => (
                            <motion.li
                                key={route._id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ scale: 1.02 }}
                                className="list-none bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
                            >
                                <p className="text-gray-700 mb-1">
                                    Origin: <strong>{route.origin}</strong>
                                </p>
                                <p className="text-gray-700 mb-1">
                                    Destination: <strong>{route.destination}</strong>
                                </p>
                                <p className="text-gray-700 mb-1">
                                    Departure Time: <strong>{route.departureTime}</strong>
                                </p>
                                <p className="text-gray-700 mb-4">
                                    Available Seats: <strong>{route.availableSeats}</strong>
                                </p>
                                <div className="w-full text-center">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleOnClick(route._id)}
                                        className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors shadow"
                                    >
                                        Show Route
                                    </motion.button>
                                </div>
                            </motion.li>
                        ))}
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <h3 className="text-2xl font-semibold text-blue-900 mb-2">No Routes Found</h3>
                        <p className="text-gray-500 text-center max-w-xs">
                            Checking for available travel routes...
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShowRoutes

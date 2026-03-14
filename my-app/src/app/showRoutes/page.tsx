"use client"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"


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
        router.push('/make-booking')
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
            <div className="text-2xl font-bold text-gray-800 text-center mb-6">
                All Routes Made
            </div>
            <div className="w-full max-w-6xl flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {routes.map((route) => (
                        <li
                            key={route._id}
                            className="list-none bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
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
                                <button
                                    onClick={() => handleOnClick(route._id)}
                                    className="w-full bg-blue-900 text-white py-2 rounded-lg
                                    hover:bg-blue-700 transition shadow"
                                >
                                    Book Route
                                </button>
                            </div>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShowRoutes

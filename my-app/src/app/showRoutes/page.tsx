"use client"
import {useEffect, useState} from "react"
import AllRoutes from "@/app/all-routes/page"
import {useRouter} from "next/navigation"


type AllRoutes = {
    _id: '',
    origin: '',
    destination: '',
    departureTime: '',
    availableSeats: ''
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
                const response = await fetch('http://localhost:3000/api/auth/route',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                const allRoutes = await response.json()
                setRoutes(await allRoutes.routes)
                console.log(routes)
                console.log(allRoutes)
            }
            catch (error) {
                console.log(error, "Error Returning All Routes")
                alert(`Error Returning All Routes`)
            }
        }
        getAllRoutes()
    }, [])
    return (
        <div className="w-full min-h-screen flex flex-col items-center p-5">
            <div className="text-xl font-bold text-center mb-5">
                All Routes Made
            </div>
            <div className="w-full max-w-5xl flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
                    {routes.map((route) => (
                        <li key={route._id}>
                            <p>Origin: <strong>{route.origin}</strong></p>
                            <p>Destination: <strong>{route.destination}</strong></p>
                            <p>Departure Time: <strong>{route.departureTime}</strong></p>
                            <p>Available Seats: <strong>{route.availableSeats}</strong></p>
                            <div className="bg-white w-1/3 text-center">
                                <button onClick={() => handleOnClick(route._id)} className="text-black">Book Route</button>
                            </div>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShowRoutes

"use client"
import axios from 'axios'
import {useState} from "react";


type Routes = {
    id: '',
    origin: '',
    destination: '',
    departureTime: '',
    availableSeats: ''
}
const AllRoutes = () => {
    const [route, setRoute] = useState<Routes[]>([])
    const handleSubmit = async () => {
        try {
            const response = await axios.get<Routes[]>('http://localhost:3000/api/auth/route')
            const routes = response.data
            setRoute(routes)
            console.log(response.data, "All Routes Successfully Returned")
            alert(`All Routes Successfully Returned`)
        }
        catch (error) {
            console.log(error, "Error Returning All Routes")
            alert(`Error Returning All Routes`)
        }
    }
    return (
        <div className="flex justify-center items-center w-full h-screen flex-col gap-5">
            <button onSubmit={handleSubmit}>Get All Routes</button>
            <div className="text-xl font-bold text-center mb-7">All Routes Made</div>
            <div className="flex flex-col gap-7">
                <div>
                    {route && (
                        <div>{route.map(route => (
                            <div key={route.id}>{route.id} {route.origin} {route.destination} {route.departureTime} {route.availableSeats}</div>
                        ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AllRoutes

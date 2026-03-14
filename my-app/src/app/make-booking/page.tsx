"use client"
import {useRouter} from "next/navigation"
import React, {useEffect, useState} from "react";

const MakeBooking = () => {
    const router = useRouter()
    const [theRouteId, setTheRouteId] = useState<string | null>(null)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const routeId = sessionStorage.getItem('_id')
            setTheRouteId(routeId)
            console.log(routeId)
        }
    }, []);
    const [formData, setFormData] = useState({passengerName: ''})
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const allFormData = {...formData, routeId: theRouteId}
            const response = await fetch('/api/bookings', {
                body: JSON.stringify(allFormData),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (theRouteId) {
                console.log(`RouteId inside formData: ${theRouteId}`);
            } else {
                console.log(`RouteId is null`);
            }
            const data = await response.json()
            console.log(data.message)
            alert(data.message)
        }
        catch (error) {
            console.log(error, "Error creating A Booking")
            alert(`Error creating A Booking`)
        }
    }
    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50
         to-blue-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create A Booking For Passenger
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">
                            Passenger Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter passenger name"
                            required={true}
                            value={formData.passengerName}
                            onInvalid={() => console.log("Passenger Name Is Required")}
                            onChange={(e) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    passengerName: e.target.value
                                }))
                            }}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2
                             focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700 transition shadow"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MakeBooking

"use client"
import React, {useEffect, useState} from "react"
import {useRouter} from "next/navigation"


const CreateRoute = () => {
    const router = useRouter()
    const [formattedDate, setFormattedDate] = useState('')
    const [formData, setFormData] = useState(
        {
            origin: '',
            destination: '',
            departureTime: '',
            availableSeats: ''
        }
    )
    useEffect(() => {
        const now = new Date()
        const offset = now.getTimezoneOffset()
        const localTime = new Date(now.getTime() - offset * 60000)
            .toISOString()
            .slice(0, 16)
        formData.departureTime = localTime
        setFormattedDate(formData.departureTime)
    }, [])
    let formatted: string
    if(formData.departureTime){
        try {
            const date = formData.departureTime
            if(!date || isNaN(new Date(date).getTime())){
                alert("Invalid date")
            }
            formatted = new Date(date).toISOString()
        } catch (error) {
            console.error("Conversion error:", error)
            alert("Invalid departure time format")
            return
        }
        console.log(formatted)
        formData.departureTime = formatted
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!formData.origin || !formData.destination || !formData.availableSeats) {
                alert("Please fill in all required fields: origin, destination, and available seats.")
                return
            }
            const response = await fetch('/api/route', {
                body: JSON.stringify(formData),
                method: 'POST',
                headers: {'content-type': 'application/json'
                }
            })
            console.log(formData.departureTime)
            const responseJson = await response.json()
            console.log(responseJson)
            alert(responseJson.message)
        }
        catch (error) {
            console.log(error, "Error creating Route")
            console.log(`Error creating Route`)
        }
    }
    return (
        <div className="flex justify-center items-center w-full min-h-screen flex-col gap-5 bg-gradient-to-br
         from-blue-50 to-blue-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <div className="text-2xl font-bold text-gray-800 text-center mb-7">
                    Create Routes For Passengers
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Origin</label>
                        <input
                            type="text"
                            placeholder="Origin"
                            required={true}
                            value={formData.origin}
                            onChange={(e) => {
                                setFormData({ ...formData, origin: e.target.value })
                            }}
                            onInvalid={() => console.log("Origin Is Required")}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2
                             focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Destination</label>
                        <input
                            type="text"
                            placeholder="Destination"
                            required={true}
                            value={formData.destination}
                            onChange={(e) => {
                                setFormData({ ...formData, destination: e.target.value })
                            }}
                            onInvalid={() => console.log("Destination Is Required")}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2
                            focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Departure Time</label>

                        <input
                            type="datetime-local"
                            placeholder="Departure Time"
                            required={true}
                            value={formattedDate}
                            onInvalid={() => console.log("Departure Time Is Required")}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2
                             focus:ring-blue-500"
                            onChange={(e) => setFormattedDate(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Available Seats</label>
                        <input
                            type="text"
                            placeholder="Available Seats"
                            required={true}
                            value={formData.availableSeats}
                            onChange={(e) => {
                                setFormData({ ...formData, availableSeats: e.target.value })
                            }}
                            onInvalid={() => console.log("Available Seats Is Required")}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none
                            focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-center text-center flex-row gap-4 mt-4">
                        <div className="w-1/2">
                            <button
                                type="button"
                                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300
                                 transition"
                                onClick={() => router.back()}
                            >
                                Back
                            </button>
                        </div>
                        <div className="w-1/2">
                            <button
                                type="submit"
                                className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700
                                 transition shadow"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateRoute

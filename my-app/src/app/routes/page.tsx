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
            const response = await fetch('/api/auth/route', {
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
        <div className="flex justify-center items-center w-full h-screen flex-col gap-5">
            <div className="text-xl font-bold text-center mb-7">Create Routes For Passengers</div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label>Origin: </label>
                    <input type="text" placeholder="Origin" required={ true } value={formData.origin}
                           onChange={(e) => {
                               setFormData({...formData, origin: e.target.value})
                           }}
                           onInvalid={() => console.log("Origin Is Required")} className="border border-white"
                    ></input>
                </div>
                <div>
                    <label>Destination: </label>
                    <input type="text" placeholder="Destination" required={ true } value={formData.destination}
                           onChange={(e) => {
                                setFormData({...formData, destination: e.target.value})
                           }}
                           onInvalid={() => console.log("Destination Is Required")} className="border border-white"
                    />
                </div>
                <div>
                    <label>Departure Time: </label>
                    <input type="datetime-local" placeholder="Departure Time" required={ true }
                           onInvalid={() => console.log("Departure Time Is Required")}
                           value={formattedDate}
                           className="border border-white" onChange={(e) => setFormattedDate(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label>Available Seats: </label>
                    <input type="text" placeholder="Available Seats" required={ true } value={formData.availableSeats}
                           onChange={(e) => {
                                setFormData({...formData, availableSeats: e.target.value})
                           }}
                           onInvalid={() => console.log("Available Seats Is Required")} className="border border-white"
                    />
                </div>
                <div className="flex justify-center text-center flex-row gap-3">
                    <div className="bg-amber-100 w-1/3">
                        <button className="text-black" onClick={() => router.back()}>Back</button>
                    </div>
                    <div className="bg-white w-1/3">
                        <button type="submit" className="text-black">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateRoute

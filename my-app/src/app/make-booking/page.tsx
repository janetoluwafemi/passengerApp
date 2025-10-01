"use client"
import useRouter from "next/router"
import {useEffect, useState} from "react";



const MakeBooking = () => {
    const [routeId, setRouteId] = useState<string | null>(null)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const routeId = sessionStorage.getItem('_id')
            setRouteId(routeId)
            console.log(routeId)
        }
    }, []);
    const router = useRouter
    const [formData, setFormData] = useState({
        passengerName: '',
        routeId: routeId
    })
    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/auth/bookings', {
                body: JSON.stringify(formData),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
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
        <div className="flex justify-center items-center w-full h-screen flex-col gap-5">
            <div className="text-xl font-bold text-center mb-7">Create A Booking For Passenger</div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div className="">
                    <label>Passenger Name: </label>
                    <input type="text" placeholder="Passenger Name" required={ true } className="border border-white"
                           onInvalid={() => console.log("Passenger Name Is Required")} value={formData.passengerName}
                           onChange={(e) => {
                               setFormData((prevState) => ({
                                   ...prevState,
                                   passengerName: e.target.value
                               }))
                           }}
                    ></input>
                </div>
                <div className="flex justify-center text-center flex-row gap-3">
                    <div className="bg-amber-100 w-1/3">
                        <button onClick={() => router.back()} className="text-black">Back</button>
                    </div>
                    <div className="bg-white w-1/3">
                        <button type="submit" className="text-black">Submit</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default MakeBooking

"use client"
import {useEffect, useState} from "react";

type Booking = {
    passengerName: '',
    id: '',
    route: {
        _id: '',
        origin: '',
        destination: '',
        departureTime: '',
        availableSeats: ''
    }
}
const MakeBooking = () => {
    const [bookings, setBookings] = useState<Booking[]>([])
    useEffect(() => {
        async function getAllBookings() {
            try {
                const response = await fetch('/api/auth/bookings', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const booking = await response.json()
                setBookings(booking.allBookings)
                console.log(bookings)
            }
            catch (error) {
                console.log(error, "Error Returning All Bookings")
                alert(`Error Returning All Bookings`)
            }
        }
        getAllBookings()
    }, []);
    return (
        <div className="w-full min-h-screen flex flex-col items-center p-5">
            <div className="text-xl font-bold text-center mb-5">
                All Bookings Made
            </div>
            <div className="w-full max-w-5xl flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
                    {bookings.map((booking) => (
                        <li key={booking.id}>
                            <p>Booking ID: <strong>{booking.id}</strong></p>
                            <p>Passenger Name: <strong>{booking.passengerName}</strong></p>
                            {booking.route ? (
                                <div>
                                    Route: <p>Route ID: <strong>{booking.route._id}</strong></p>
                                    <p>Origin: <strong>{booking.route.origin}</strong></p>
                                    <p>Destination: <strong>{booking.route.destination}</strong></p>
                                    <p>Departure Time: <strong>{booking.route.departureTime}</strong></p>
                                    <p>Available Seats: <strong>{booking.route.availableSeats}</strong></p>
                                </div>
                            ): (
                                <p>No route found for this booking.</p>
                            )}
                        </li>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MakeBooking

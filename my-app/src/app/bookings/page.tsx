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
                const response = await fetch('/api/bookings', {
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
        <div className="w-full min-h-screen flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100">

            <div className="text-2xl font-bold text-gray-800 text-center mb-6">
                All Bookings Made
            </div>
            <div className="w-full max-w-6xl flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <li
                            key={booking.id}
                            className="list-none bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
                        >
                            <p className="text-gray-700 mb-1">
                                Booking ID: <strong>{booking.id}</strong>
                            </p>
                            <p className="text-gray-700 mb-3">
                                Passenger Name: <strong>{booking.passengerName}</strong>
                            </p>
                            {booking.route ? (
                                <div className="border-t pt-3 text-gray-700 space-y-1">
                                    <p className="font-semibold text-blue-900 mb-1">
                                        Route Information
                                    </p>
                                    <p>
                                        Route ID: <strong>{booking.route._id}</strong>
                                    </p>
                                    <p>
                                        Origin: <strong>{booking.route.origin}</strong>
                                    </p>
                                    <p>
                                        Destination: <strong>{booking.route.destination}</strong>
                                    </p>
                                    <p>
                                        Departure Time: <strong>{booking.route.departureTime}</strong>
                                    </p>
                                    <p>
                                        Available Seats: <strong>{booking.route.availableSeats}</strong>
                                    </p>
                                </div>
                            ) : (
                                <p className="text-red-500">
                                    No route found for this booking.
                                </p>
                            )}
                        </li>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MakeBooking

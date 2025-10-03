import connect from '@/lib/db'
import Booking from '@/lib/model/booking'
import Passenger from '@/lib/model/passenger'
import { NextResponse } from 'next/server'
import Route from "@/lib/model/route";

interface BookingRequest {
    passengerName: string
    routeId: string
}
export const POST = async (request: Request) => {
    try{
        const body: BookingRequest = await request.json()
        console.log(body)
        await connect()
        const passenger = await Passenger.find({})
        if (passenger) {
            const booking = new Booking(body)
            const trimmedRouteId = body.routeId.trim()
            const routeId = await Route.findById(trimmedRouteId)
            if (routeId) {
                console.log(routeId)
                const findAvailableSeats = await Route.findById(routeId)
                console.log(findAvailableSeats)
                const availableSeats = findAvailableSeats.availableSeats
                console.log(availableSeats)
                const intAvailableSeats = parseInt(availableSeats)
                console.log(intAvailableSeats)
                const remainingAvailableSeats = intAvailableSeats - 1
                const stringRemainingAvailableSeats = remainingAvailableSeats.toString()
                if(stringRemainingAvailableSeats === "0"){
                    return new NextResponse(JSON.stringify({
                        message: "No available seats left",
                    }))
                }
                await booking.save()
                return new NextResponse(JSON.stringify({
                    message: "Passenger successfully booked a seat",
                    booking,
                }))
            }
            else {
                return new NextResponse(JSON.stringify({
                    message: "Route doesn't exist",
                }))
            }
        }
        else {
            return new NextResponse(JSON.stringify({
                message: "Passenger doesn't exist",
            }))
        }
    }
    catch (error) {
        console.log(error, "Error Trying To Create Booking")
        return new NextResponse(JSON.stringify({
            message: "Error Trying To Create bookings",
        }))
    }
}

export const GET = async () => {
    try {
        await connect()
        const bookings = await Booking.find({})
        const allBookings = await Promise.all(
            bookings.map(async (booking) => {
                const routes = await Route.findById(booking.routeId)
                return {
                    ...booking.Object,
                    passengerName: booking.passengerName,
                    id: booking.id,
                    route: routes
                }
            })
        )
        return new NextResponse(JSON.stringify({
            allBookings
        }))
    }
    catch (error) {
        console.log(error, "Error Trying To Get Bookings")
        return new NextResponse(JSON.stringify({
            message: "Error Trying To Get Bookings",
        }))
    }
}

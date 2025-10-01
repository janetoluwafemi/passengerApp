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
            await booking.save()
            return new NextResponse(JSON.stringify({
                message: "Passenger successfully booked a seat",
                booking,
            }),{
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'https://passenger-app-jmnj.vercel.app/',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            })
        }
        else {
            return new NextResponse(JSON.stringify({
                message: "Passenger doesn't exist",
            }),{
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'https://passenger-app-jmnj.vercel.app/',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }
            })
        }
    }
    catch (error) {
        console.log(error, "Error Trying To Create Booking")
        return new NextResponse(JSON.stringify({
            message: "Error Trying To Create bookings",
        }),{
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://passenger-app-jmnj.vercel.app/',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        })
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
        }),{
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://passenger-app-jmnj.vercel.app/',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        })
    }
    catch (error) {
        console.log(error, "Error Trying To Get Bookings")
        return new NextResponse(JSON.stringify({
            message: "Error Trying To Get Bookings",
        }),{
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://passenger-app-jmnj.vercel.app/',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        })
    }
}

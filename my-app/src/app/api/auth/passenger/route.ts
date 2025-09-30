import connect from '@/lib/db'
import Passenger from '@/lib/model/passenger'
import { NextResponse } from 'next/server'


interface passengerRequest {
    passengerName: string
    email: string
}
export const POST = async (request: Request) => {
    try {
        const body: passengerRequest = await request.json()
        await connect()
        const passenger = await Passenger.findOne({ email: body.email });
        if (passenger) {
            return new NextResponse(JSON.stringify({
                message: "Passenger already exists",
                status: 409
            }))
        }
        const User = new Passenger(body)
        await User.save()
        return new NextResponse(JSON.stringify({user: User,
            message: "Passenger created successfully",
            passenger_id: User.id,
            status: 200
        }))
    }
    catch (error) {
        console.log(error, "Error Trying To Create A Passenger")
        return new NextResponse(JSON.stringify({
            message: "Error Trying To Create A Passenger",
            status: 500
        }))
    }
}

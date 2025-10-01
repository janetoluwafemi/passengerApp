import connect from '@/lib/db'
import Route from '@/lib/model/route'
import { NextResponse } from 'next/server'
import route from "@/lib/model/route";


interface RouteRequest {
    origin: string
    destination: string
    departureTime: Date
    availableSeats: string
}
export const POST = async (request: Request) => {
    try {
        await connect()
        const savedRoute =  await Route.findOne({origin: "", destination: ""})
        if (savedRoute) {
            return new NextResponse(JSON.stringify({
                message: "Route already exists",
                savedRoute
            }),{
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'https://passenger-app-jmnj.vercel.app',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            })
        }
        const body: RouteRequest = await request.json()
        if (!body.origin || !body.destination || !body.departureTime || !body.availableSeats) {
            console.log("Error: Missing required fields")
        }
        console.log(body)
        const routes = new Route(body)
        await routes.save()
        return new NextResponse(JSON.stringify({
            route,
            Routes_id: routes.id,
            message: "Route created successfully"
        }),{
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://passenger-app-jmnj.vercel.app',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        })
    }
    catch (error) {
        console.log(error, "Error Trying To Create Route")
        return new NextResponse(JSON.stringify({
            message: "Error Trying To Create Route"
        }),{
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://passenger-app-jmnj.vercel.app',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        })
    }
}

export const GET = async () => {
    try {
        await connect()
        const routes = await Route.find({})
        return new NextResponse(JSON.stringify({
            routes
        }),{
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://passenger-app-jmnj.vercel.app',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        })
    }
    catch (error) {
        console.log(error, "Error Trying To Get Routes")
        return new NextResponse(JSON.stringify({
            message: "Error Trying To Get Routes"
        }),{
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://passenger-app-jmnj.vercel.app',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        })
    }
}
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Route from "@/lib/model/route";

export const GET = async (_request: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = params;

        await connectDB();
        const route = await Route.findById(id);

        if (!route) {
            return NextResponse.json({ message: "Route not found" }, { status: 404 });
        }

        return NextResponse.json({ route });
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
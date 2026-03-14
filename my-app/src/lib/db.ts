import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(MONGO_URL!, {
            dbName: "passengersApp",
            bufferCommands: false,
            serverSelectionTimeoutMS: 15000,
        });
        console.log("MongoDB Connected ✅");
    } catch (error) {
        console.error("MongoDB Connection Error ❌:", error);
        throw error;
    }
};
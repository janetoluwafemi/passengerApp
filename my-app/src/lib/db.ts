import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const MONGO_URL = process.env.MONGO_URL
console.log("Mongo URL:", process.env.MONGO_URL);

const connectDB = async () => {
    const connectionDB = mongoose.connection.readyState
    if (connectionDB === 1) {
        console.log("Already connected to database")
    }
    if (connectionDB === 2) {
        console.log("Connecting to database...")
    }
    try {
        await mongoose.connect(MONGO_URL!, {
            dbName: "myPassengerApp",
            bufferCommands: true
        })
        console.log("Connected to database")
    }
    catch (error) {
        console.log(error)
    }
}

export default connectDB
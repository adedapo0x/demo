import mongoose from "mongoose"
import app from "./app.js"

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI
        if (!uri){
            throw new Error("Connection string URI not defined")
        }
        await mongoose.connect(uri)
        console.log("Database successfully connected")
    } catch (err) {
        console.log("Unable to connect to the database: ", err)
    }
}

const startServer = async () => {
    try {
        await connectDB()
        const PORT = process.env.PORT || 3200
        app.listen(PORT, () => {
            console.log("Server up and running!")
        })
    } catch (e) {
        console.log("Failed to start Server", e)
    }
}

startServer()



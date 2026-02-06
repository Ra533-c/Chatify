import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI is not defined in .env file");
            return;
        }

        // Debugging: Check what URI is actually being used
        const uriPreview = process.env.MONGO_URI.split("://")[0];
        console.log(`Attempting to connect using protocol: ${uriPreview}://...`);

        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connect successfully.");
    } catch (e) {
        console.error("MongoDB connection error:", e.message);
        if (e.message.includes("ECONNREFUSED")) {
            console.error("Tip: Check if your IP is whitelisted in MongoDB Atlas and your internet connection is stable.");
        }
    }
}
export default connectDB; 
import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("DB connect."))
        .catch((e) => console.log("Error is :", e));
}
export default connectDB; 
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://peshara335:WovLcQhwmK2hIjUI@cluster0.y91roa3.mongodb.net/evoicedb?retryWrites=true&w=majority", {});
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
};
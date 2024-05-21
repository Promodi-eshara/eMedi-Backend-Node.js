import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    email: String,
    password: String,
    emergencyNumber: String,
    bloodGroup: String,
    allergies: String,
    medications: String,
    weight: String,
    height: String,
    gender: String,
    address: String
});

export default mongoose.model('User', userSchema);
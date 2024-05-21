import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Get user profile
router.get("/get-user/:_id", async (req, res) => {
    // Implementation
    try {
        const { _id } = req.params;
        const user = await User.findOne({ _id: _id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update user details
router.put("/update-user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedUserData = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;
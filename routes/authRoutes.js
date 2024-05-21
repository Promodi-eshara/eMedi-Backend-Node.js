import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import User from '../models/User.js';

const router = express.Router();
const secretKey = crypto.randomBytes(32).toString('hex');

// Register a new user
router.post("/register", async (req, res) => {
    // Registration logic
    console.log(req.body);
    const { name, mobile, password } = req.body;
    try {
        const existingUser = await User.findOne({ mobile: mobile });
        if (existingUser) {
            return res.send({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, mobile, password: hashedPassword });
        await newUser.save();
        res.send({ message: "Success" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});


// dear mata e folder eka thiyena thana aran denna   ... ml eka da  //waitt dan oyge  whatsapp ekt file ekk ewi eka folder ekt dnn  ok 

// User login
router.post("/login", async (req, res) => {
    // Login logic
    console.log("Request body:", req.body);
    try {
        const { identifier, password } = req.body;
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { mobile: identifier }
            ]
        });

        if (!user) {
            return res.status(401).json({ message: "User does not exist" });
        }
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid password for user:", user.mobile);
            return res.status(401).json({ message: "Invalid mobile or password" });
        }

        const tokenPayload = {
            userId: user._id,
            identifier: user.identifier
        };

        const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });
        res.status(200).json({ token, message: "login success", user: user });

        // res.send({message:"login sucess",user:user})
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Logout user
router.post("/logout", (req, res) => {
    // Logout logic
    res.clearCookie("token").json({ message: "Logout successful" });
});

export default router;
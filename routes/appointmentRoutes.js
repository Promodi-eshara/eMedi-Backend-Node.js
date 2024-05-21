import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// CREATE: Create a new appointment
router.post("/appointmentSave", async (req, res) => {
    try {
        const { doctor, date, time } = req.body;

        const existingAppointment = await Appointment.findOne({
            doctor: doctor,
            date: date,
            time: time
        });

        if (existingAppointment) {
            return res.status(201).json({
                status: "error",
                message: "Doctor is not available at the specified date and time"
            });
        }

        const appointment = new Appointment(req.body);
        const savedAppointment = await appointment.save();

        res.status(201).json({
            status: "success",
            message: "Appointment created successfully",
            appointment: savedAppointment
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ: Get all appointments
router.get("/appointments", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/pastAppointments/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const pastAppointments = await Appointment.find({ patient: userId, date: { $lt: new Date() } });
        res.json({ pastAppointments });
    } catch (err) {
        console.error("Error fetching past appointments:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/upcomingAppointments/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const upcomingAppointments = await Appointment.find({ patient: userId, date: { $gte: new Date() } });
        res.json({ upcomingAppointments });
    } catch (err) {
        console.error("Error fetching upcoming appointments:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// READ: Get a specific appointment by ID



router.patch("/updateAppoinment/:id", async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const updatedFields = {};

        // Check if date is provided in the request body
        if (req.body.date != null) {
            updatedFields.date = req.body.date;
        }

        // Check if time is provided in the request body
        if (req.body.time != null) {
            updatedFields.time = req.body.time;
        }

        // Find the appointment by ID
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Update the appointment with the provided fields
        Object.assign(appointment, updatedFields);

        // Save the updated appointment
        await appointment.save();

        // Send a success response
        res.json({ message: 'Appointment updated successfully', appointment });
    } catch (err) {
        console.error("Error updating appointment:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE: Delete a specific appointment by ID
router.delete("/appointments/:id", getAppointment, async (req, res) => {
    try {
        await res.appointment.remove();
        res.json({ message: "Deleted appointment" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware function to get appointment by ID
async function getAppointment(req, res, next) {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (appointment == null) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.appointment = appointment;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default router;

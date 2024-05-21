import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    doctor: {
        type: String,
        required: true
    },
    patient: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    symptoms: [String],
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Appointment', appointmentSchema);

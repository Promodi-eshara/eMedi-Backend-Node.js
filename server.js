import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

connectDB();

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/appointment", appointmentRoutes);

// backend/server.js
// const { SpeechClient } = require('@google-cloud/speech');
// const fs = require('fs');

// Initialize Google Cloud Speech client
// const speechClient = new SpeechClient();

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to receive audio data and transcribe
// app.post('/transcribe', async (req, res) => {
//   try {
//     // Assuming audio data is sent as a Base64-encoded string in the request body
//     const audioData = req.body.audioData;

//     // Decode audio data (if needed) and write to a temporary file
//     const audioBuffer = Buffer.from(audioData, 'base64');
//     fs.writeFileSync('audio.wav', audioBuffer);

//     // Transcribe audio using Google Cloud Speech-to-Text API
//     const [response] = await speechClient.recognize({
//       audio: { content: audioBuffer },
//       config: { encoding: 'LINEAR16', sampleRateHertz: 16000, languageCode: 'en-US' },
//     });

//     // Get transcription from the API response
//     const transcription = response.results
//       .map(result => result.alternatives[0].transcript)
//       .join('\n');

//     // Send transcription back to frontend
//     res.json({ transcription });
//   } catch (error) {
//     console.error('Error transcribing audio:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


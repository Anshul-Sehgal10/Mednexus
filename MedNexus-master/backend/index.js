require("dotenv").config();
require("./websocket");
const express = require("express");
const cors = require("cors");
const http = require('http');
const connectDB = require("./db");
const { initChatWebSocket } = require('./websocket-chat');

const axios = require("axios");
const geminiRoutes = require('./routes/geminiRoutes');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Connect to MongoDB
connectDB();

// Initialize Chat WebSocket
initChatWebSocket(server);

// Routes
app.use('/api/ai', geminiRoutes);
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/emergency", require("./routes/emergencyRoutes"));
app.use("/api/chat", require("./routes/chatRoutes")); // New chat routes

app.get("/api/directions", async (req, res) => {
    const { start, end } = req.query;
    const API_KEY = process.env.MAPBOX_API_KEY;

    if (!start || !end) {
        return res.status(400).json({ error: "Missing start or end parameters" });
    }

    // If no API key, return a simple straight line route
    if (!API_KEY) {
        const [startLng, startLat] = start.split(',').map(Number);
        const [endLng, endLat] = end.split(',').map(Number);
        
        return res.json({
            routes: [{
                geometry: {
                    coordinates: [
                        [startLng, startLat],
                        [endLng, endLat]
                    ]
                }
            }]
        });
    }

    // Make request to Mapbox API
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start};${end}?access_token=${API_KEY}&geometries=geojson`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching route:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch directions" });
    }
});

// Start Server
const PORT = process.env.PORT || 3004;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
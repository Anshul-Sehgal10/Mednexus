# 🏥 MedNexus - AI-Powered Emergency Healthcare Platform

**MedNexus** is a real-time emergency healthcare management system that connects patients with medical professionals through AI-powered disease prediction, live location tracking, and instant communication.

---

## 🎯 Project Overview

MedNexus solves critical problems in emergency healthcare:
- **Instant Emergency Response**: Patients can trigger emergencies with severity levels (normal/moderate/critical)
- **Smart Matching**: Automatically routes emergencies to appropriate responders (nurses for normal, doctors for moderate, ambulances for critical)
- **Real-Time Tracking**: Live GPS tracking with route visualization between patient and responder
- **AI Health Assistant**: Gemini-powered chatbot for health queries and disease prediction
- **WebSocket Communication**: Real-time chat between patients and responding medical professionals

---

## ✨ Key Features

### 🚨 Emergency Management System
- **Three-tier severity system**: Normal → Nurse, Moderate → Doctor, Critical → Ambulance
- **Live location tracking** with map visualization (Leaflet.js)
- **Route calculation** between patient and responder
- **Status management**: Pending → In Progress → Resolved
- **Active/Sleep toggle** for responders to manage availability

### 👥 User Roles & Dashboards
- **Patients**: Trigger emergencies, track responder location, chat with medical professionals
- **Medical Professionals**: View assigned emergencies, navigate to patients, manage active status
- **Profile Management**: Upload profile pictures (Cloudinary), specialization, license info

### 🤖 AI Integration
- **Gemini AI Chatbot**: Real-time health consultation and disease prediction
- **Streaming responses** for better user experience
- **Context-aware conversations** with chat history

### 💬 Real-Time Communication
- **WebSocket-based chat** between patients and responders during emergencies
- **Message persistence** with MongoDB
- **Live connection status** indicators

---

## 🛠️ Tech Stack

### Backend
- **Node.js & Express**: REST API and WebSocket server
- **MongoDB & Mongoose**: Database for users, emergencies, and chat messages
- **WebSocket (ws)**: Real-time bidirectional communication
- **Google Gemini AI**: AI-powered health assistant
- **Cloudinary**: Image upload and storage
- **Multer**: File upload middleware
- **bcrypt & JWT**: Authentication and security

### Frontend
- **Next.js 14**: React framework with App Router
- **Tailwind CSS**: Styling and responsive design
- **Framer Motion**: Smooth animations and transitions
- **Leaflet.js**: Interactive maps and location visualization
- **Axios**: HTTP client for API calls
- **shadcn/ui**: Modern UI components

### APIs & Services
- **Mapbox Directions API**: Route calculation (with fallback for development)
- **Google Gemini 1.5 Pro**: AI chatbot integration
- **Cloudinary**: Cloud-based image storage

---

## 📂 Project Architecture

```
MedNexus-master/
├── backend/
│   ├── controllers/         # Business logic
│   │   ├── emergencyController.js
│   │   └── userController.js
│   ├── models/              # Database schemas
│   │   ├── Emergency.js
│   │   ├── User.js
│   │   └── ChatMessage.js (in websocket-chat.js)
│   ├── routes/              # API endpoints
│   │   ├── emergencyRoutes.js
│   │   ├── userRoutes.js
│   │   ├── geminiRoutes.js
│   │   └── chatRoutes.js
│   ├── middlewares/         # Custom middleware
│   │   └── multer.js
│   ├── websocket.js         # Location tracking WebSocket
│   ├── websocket-chat.js    # Chat WebSocket
│   ├── index.js             # Server entry point
│   └── .env                 # Environment variables
│
└── disease-predictor/       # Next.js Frontend
    ├── src/
    │   ├── app/             # Pages (App Router)
    │   │   ├── login/
    │   │   ├── register/
    │   │   ├── dashboard/   # Professional dashboard
    │   │   ├── Emergency/   # Patient emergency page
    │   │   ├── predict/     # AI chatbot
    │   │   └── ...
    │   └── components/      # Reusable components
    │       ├── chat-dialog.jsx
    │       ├── EmergencyChat.jsx
    │       └── NavBar.jsx
    └── ...
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend:
   ```bash
   cd MedNexus-master/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure `.env`:
   ```env
   PORT=3004
   MONGO_URI=mongodb://127.0.0.1:27017/MedNexus
   GOOGLE_API_KEY=your_gemini_api_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   MAPBOX_API_KEY=optional_for_real_routing
   ```

4. Start server:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:3004`

### Frontend Setup

1. Navigate to frontend:
   ```bash
   cd MedNexus-master/disease-predictor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:3000`

---

## 🎮 How to Use

### For Patients
1. **Register** as a patient at `/register`
2. **Login** at `/login` (redirects to home)
3. Navigate to **Emergency** page
4. Select severity level (Normal/Moderate/Critical)
5. Click **Trigger Emergency** (shares your location)
6. View assigned responder details and live location
7. Use **chat** to communicate with responder
8. Confirm **doctor arrival** when they reach you

### For Medical Professionals
1. **Register** as doctor/nurse/ambulance with credentials
2. Upload **profile picture** during registration
3. **Login** at `/login` (redirects to `/dashboard`)
4. Toggle **Active/Sleep** status to receive emergencies
5. View incoming emergencies matching your role:
   - Nurses see **normal** severity
   - Doctors see **moderate** severity  
   - Ambulances see **critical** severity
6. **Accept emergency** to start navigation
7. View live route on map to patient location
8. Use **chat** to communicate during response

### AI Health Assistant
1. Go to `/predict` or `/ai` page
2. Ask health-related questions
3. Get AI-powered responses using Gemini
4. Chat history maintained during session

---

## 🔑 Key API Endpoints

### User Management
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `POST /api/users/toggle-active` - Toggle responder status
- `POST /api/users/upload` - Upload profile picture

### Emergency Management
- `POST /api/emergency/trigger` - Create emergency
- `GET /api/emergency/requests` - Get all emergencies
- `POST /api/emergency/accept` - Accept emergency
- `GET /api/emergency/accepted` - Get accepted emergencies
- `POST /api/emergency/update-location` - Update responder location
- `POST /api/emergency/doctor-arrival` - Confirm arrival

### AI Chat
- `POST /api/ai/chat` - Send message to Gemini AI
- `POST /api/ai/stream` - Stream AI responses

### Other
- `GET /api/directions` - Get route between two points

---

## 🎯 Interview Talking Points

### Problem Solved
"MedNexus addresses the critical gap in emergency healthcare response by providing instant connectivity between patients and appropriate medical professionals based on severity, with real-time tracking and communication."

### Technical Highlights
- **WebSocket implementation** for real-time location tracking and chat
- **Role-based routing** that intelligently assigns emergencies
- **AI integration** with streaming responses for better UX
- **Geolocation API** usage with live map visualization
- **Clean separation** of concerns (MVC architecture)
- **Error handling** and fallbacks throughout the application

### Challenges Overcome
- Managing multiple WebSocket connections efficiently
- Handling React strict mode with WebSocket connections
- Implementing fallback routing when Mapbox API unavailable
- Cross-origin WebSocket communication
- File upload with Cloudinary integration

### Scalability Considerations
- MongoDB for horizontal scaling
- WebSocket connection pooling by emergency ID
- Cloudinary for distributed image storage
- Stateless JWT authentication

---

## 📊 Database Models

### User Schema
- Basic info: name, email, password (hashed)
- Role: patient/doctor/nurse/ambulance
- Professional fields: specialization, licenseNo, yearsOfExperience
- Status: active/inactive (for responders)
- Images: coverImage URL

### Emergency Schema
- Patient reference and location
- Severity: normal/moderate/critical
- Status: pending/inProgress/resolved
- Responder reference and location
- Timestamps

### ChatMessage Schema
- Sender and receiver references
- Emergency reference
- Message content and timestamp
- Sender type: patient/doctor

---

## 🐛 Known Issues & Solutions

All major bugs have been fixed including:
- ✅ Google Gemini API model compatibility
- ✅ File upload directory creation
- ✅ Login redirection logic
- ✅ Nested button HTML error
- ✅ WebSocket chat with proper ID handling
- ✅ Emergency request filtering by role
- ✅ React strict mode WebSocket disconnections

---

## 🚀 Future Enhancements

- Push notifications for emergency alerts
- Video call integration for remote consultation
- Medical history tracking
- Prescription management
- Multi-language support
- Analytics dashboard for hospitals

---

## 📜 License

MIT License - Feel free to use this project for learning and development.

---

**Built with ❤️ for better emergency healthcare response**

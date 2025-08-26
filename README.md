# 🏥 MedNexus  

**MedNexus** is a comprehensive healthcare platform for **disease prediction**, **emergency management**, and **real-time healthcare communication**.  
It combines a **Node.js/Express backend** with a **Next.js frontend**, integrating AI-powered prediction, chat, and user management features.  

---

## ✨ Features  

### 🔮 Disease Predictor (Frontend)  

- Built with **Next.js** and **Tailwind CSS**  
- **AI-powered disease prediction** (Gemini integration)  
- Patient **registration & login**  
- Hospital **dashboard & management**  
- **Emergency chat** and communication  
- Modern, responsive UI  

### ⚙️ Backend API  

- **Node.js/Express REST API**  
- User & emergency management  
- **WebSocket**-based real-time chat  
- **Cloudinary integration** for file uploads  
- CSV-based ML training/testing datasets  
- Modular **controllers, models, and routes**  

---

## 📂 Project Structure  

```bash
MedNexus-master/
├── backend/                 # Node.js/Express backend
│   ├── index.js             # Entry point
│   ├── db.js                # Database connection
│   ├── Cloudinary.js        # Cloudinary integration
│   ├── websocket.js         # WebSocket server
│   ├── controllers/         # Route controllers
│   ├── middlewares/         # Express middlewares
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── Training.csv         # ML training data
│   ├── Testing.csv          # ML testing data
│   └── app.py               # Optional Python ML script
│
├── disease-predictor/       # Next.js frontend
│   ├── src/                 # Pages & components
│   ├── public/              # Static assets
│   └── ...                  # Configs & build files
└── ...
```

---

## 🚀 Getting Started  

### ✅ Prerequisites  

- [Node.js](https://nodejs.org/) (v16+)  
- npm or yarn  
- [Python](https://www.python.org/) (if using `app.py`)  

---

### 🔧 Backend Setup  

1. Navigate to backend:  

   ```powershell
   cd MedNexus-master/backend
   ```

2. Install dependencies:

   ```powershell
   npm install
   ```

3. Configure environment variables in **.env**.  
4. Start backend server:

   ```powershell
   npm start
   ```

---

### 🎨 Frontend Setup  

1. Navigate to frontend:

   ```powershell
   cd MedNexus-master/disease-predictor
   ```

2. Install dependencies:

   ```powershell
   npm install
   ```

3. Start development server:

   ```powershell
   npm run dev
   ```

---

## 📌 Usage  

- Frontend: **<http://localhost:3000>**
- Backend API: **<http://localhost:5000>** (default)  
- Register/login as **patient** or **hospital**  
- Use AI **disease predictor** & **emergency chat**  

---

## 🛠️ Tech Stack  

**Backend:** Node.js, Express, WebSocket, MongoDB (Mongoose), Cloudinary  
**Frontend:** Next.js, React, Tailwind CSS  
**AI/ML:** CSV-based training/testing data, optional Python (`app.py`)  

---

## 🤝 Contributing  

Contributions are welcome! 🎉

- Fork the repo  
- Create a new branch (`feature/your-feature`)  
- Commit your changes  
- Open a Pull Request  

---

## 📜 License  

This project is licensed under the **MIT License**.  

---

💡 *MedNexus: Bridging healthcare with AI-powered innovation.*

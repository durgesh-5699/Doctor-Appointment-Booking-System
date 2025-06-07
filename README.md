# 🏥 Online Doctor Appointment Booking System

A full-stack web application designed to streamline the process of booking and managing doctor appointments. This system allows patients to schedule appointments, doctors to manage their bookings, and admins to oversee the entire system.
---
--Link -> https://doc-appointment-booking-system-frontend.onrender.com

## ✨ Key Features

### 👤 Patient Panel
- Secure registration and login
- Browse doctors by specialization
- Book and cancel appointments
- View appointment history

### 🩺 Doctor Panel
- Secure login to dashboard
- View and manage appointments
- Cancel appointments
- Access patient information

### 🛡️ Admin Panel
- View and manage all users (doctors + patients)
- Add or remove doctor profiles
- Cancel or monitor appointments
- System-wide dashboard analytics

---

## 🛠 Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- Axios
- Vite

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication

---

## 📁 Folder Structure
📦 Doctor-Appointment-System/
├── 🎨 frontend/ # Patient-facing React application
├── 🛡️ admin/ # Administrative panel
├── ⚙️ backend/ # Express.js API server
├── 📊 models/ # MongoDB data schemas
├── 🔐 middlewares/ # Authentication & validation
└── 🎯 controllers/ # Business logic handlers

### Installation  
  
1. **Clone the repository**  
   ```bash  
   git clone https://github.com/durgesh-5699/Doctor-Appointment-Booking-System.git  
   cd Doctor-Appointment-Booking-System
   
2. **Backend Setup**
   cd backend  
   npm install  
   # Configure environment variables
   npm start

3. **Frontend Setup**
   cd frontend  
   npm install  
   npm run dev

3. **Admin Panel Setup**
   cd admin  
   npm install  
   npm run dev

## Environment Configuration
  MONGODB_URI=your_mongodb_connection_string  
  JWT_SECRET_KEY=your_jwt_secret  
  CLOUDINARY_NAME=your_cloudinary_name  
  CLOUDINARY_API_KEY=your_api_key  
  CLOUDINARY_API_SECRET=your_api_secret  
  RAZORPAY_KEY_ID=your_razorpay_key  
  RAZORPAY_KEY_SECRET=your_razorpay_secret  
  ADMIN_EMAIL=admin@example.com  
  ADMIN_PASSWORD=secure_password

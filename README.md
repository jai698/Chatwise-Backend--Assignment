# Social Media Platform API

A RESTful API for a social media platform built with Node.js, Express, and MongoDB.

## Features

- 👤 User Authentication (Register/Login)
- 👥 Friend Management (Send/Accept/Reject Requests)
- 📝 Posts Creation and Management
- 💬 Comments on Posts
- 📱 News Feed Generation
- 🔒 JWT Authentication

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14+ recommended)
- MongoDB (v4+ recommended)
- npm (Node Package Manager)

## Project Setup

1. **Clone the repository**
git clone <repository-url>
cd social-media-api


2. **Install dependencies**
npm install


3. **Environment Variables**

Create a `.env` file in the root directory and add the following:
PORT=3001
MONGO_URI=mongodb://localhost:27017/social-media
JWT_SECRET=your_jwt_secret_key


4. **Start MongoDB**
- Make sure MongoDB is running on your system

 
5. **Run the application**
Development mode
npm run dev
Production mode
npm start 

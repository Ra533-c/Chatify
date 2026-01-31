# 💬 Chatify - Real-Time Chat Application

A modern, feature-rich real-time chat application built with the MERN stack and Socket.IO. Connect with friends, see who's online, and chat in real-time with a beautiful, responsive UI.

![Chatify Banner](https://img.shields.io/badge/MERN-Stack-blue) ![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-green) ![Redux](https://img.shields.io/badge/Redux-State%20Management-purple)

---

## ✨ Features

### 🚀 Core Features
- **Real-Time Messaging**: Instant message delivery using Socket.IO
- **Online Status Indicators**: See who's online with live status badges
- **User Authentication**: Secure signup/login with JWT tokens
- **Persistent State**: Redux Persist keeps you logged in across sessions
- **User Search**: Quick search with real-time filtering
- **Responsive Design**: Beautiful UI that works on all devices

### 🎨 User Experience
- **Modern UI**: Clean interface built with TailwindCSS and DaisyUI
- **Message Bubbles**: Distinct styling for sent/received messages
- **Auto-Scroll**: Messages automatically scroll to latest
- **Profile Photos**: Avatar support for personalized experience
- **Smooth Animations**: Polished transitions and interactions

### 🔐 Security
- **JWT Authentication**: Secure token-based auth
- **HTTP-only Cookies**: Protected session management
- **Password Hashing**: Bcrypt encryption for passwords
- **Protected Routes**: Frontend route guards

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **Socket.IO Client** - Real-time communication
- **React Router** - Navigation
- **Axios** - HTTP requests
- **TailwindCSS** - Styling
- **DaisyUI** - UI components
- **React Hot Toast** - Notifications
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.IO** - WebSocket server
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cookie Parser** - Cookie handling
- **Dotenv** - Environment variables

---

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas account)
- **Git**
- **npm** or **yarn**

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Ra533-c/Chatify.git
cd Chatify
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Add the following to `backend/.env`:**

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd ../frontend

# Install dependencies
npm install
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The app will be running at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

---

## 📁 Project Structure

```
Chatify/
├── backend/
│   ├── controllers/
│   │   ├── messageController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── isAuthenticated.js
│   ├── models/
│   │   ├── conversationModel.js
│   │   ├── messageModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── messageRoute.js
│   │   └── userRoute.js
│   ├── socket/
│   │   └── socket.js
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── OtherUsers.jsx
│   │   │   ├── OtherUser.jsx
│   │   │   ├── MessageContainer.jsx
│   │   │   ├── Messages.jsx
│   │   │   ├── SingleMessage.jsx
│   │   │   └── Sendinput.jsx
│   │   ├── hooks/
│   │   │   ├── useGetMessages.jsx
│   │   │   ├── useGetOtherUsers.jsx
│   │   │   ├── useGetRealTimeMessage.jsx
│   │   │   └── useSendMessage.jsx
│   │   ├── redux/
│   │   │   ├── Slice/
│   │   │   │   ├── userSlice.js
│   │   │   │   ├── messageSlice.js
│   │   │   │   └── socketSlice.js
│   │   │   └── store.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🎯 Usage Guide

### 1. **Create an Account**
- Click "Signup" on the login page
- Enter your details (Full Name, Username, Password, Gender)
- Profile photo will be auto-generated based on gender

### 2. **Login**
- Use your username and password
- You'll be redirected to the chat homepage

### 3. **Start Chatting**
- See all registered users in the left sidebar
- Green dot (🟢) indicates online users
- Click on any user to start a conversation
- Type your message and press Enter or click the send button

### 4. **Search Users**
- Use the search bar at the top of the sidebar
- Real-time filtering as you type
- Clear search to see all users again

### 5. **Logout**
- Click the "Logout" button at the bottom of the sidebar
- Your session will be cleared

---

## 🔑 Key Features Explained

### Real-Time Messaging
- Messages are delivered instantly using Socket.IO
- No need to refresh the page
- Messages appear immediately for both sender and receiver

### Online Status
- Visual indicator showing who's currently online
- Updates in real-time as users login/logout
- Green badge appears on user avatars when they're active

### State Persistence
- Your session persists even after page refresh
- Chat history is maintained
- No need to login again on refresh

### User Search
- Type to filter users by name
- Results update instantly as you type
- Supports partial matches

---

## 🌐 API Endpoints

### Authentication
- `POST /api/v1/user/signup` - Register new user
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout

### Users
- `GET /api/v1/user` - Get all users (except current user)

### Messages
- `POST /api/v1/message/send/:id` - Send message to user
- `GET /api/v1/message/:id` - Get conversation with user

### Socket Events
- `connection` - User connects
- `disconnect` - User disconnects
- `getOnlineUsers` - Receive online users list
- `newMessage` - Receive new message in real-time

---

## 🎨 Screenshots

### Login Page
Clean and modern login interface with form validation.

### Chat Interface
Real-time messaging with online status indicators and user search.

### Mobile Responsive
Fully responsive design that works seamlessly on mobile devices.

---

## 🐛 Known Issues & Future Enhancements

### Future Features
- [ ] Group chat support
- [ ] File/image sharing
- [ ] Message read receipts (seen/delivered)
- [ ] Typing indicators
- [ ] Message notifications
- [ ] Dark/Light theme toggle
- [ ] Emoji picker
- [ ] Voice/Video calls
- [ ] Message reactions
- [ ] User blocking/reporting

### Known Issues
- Refresh clears filtered search (design choice)
- Profile photos are auto-generated (no upload yet)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@Ra533-c](https://github.com/Ra533-c)
- Repository: [Chatify](https://github.com/Ra533-c/Chatify)

---

## 🙏 Acknowledgments

- [Socket.IO](https://socket.io/) - Real-time engine
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [DaisyUI](https://daisyui.com/) - UI components
- [TailwindCSS](https://tailwindcss.com/) - Styling framework

---

## 📞 Support

If you have any questions or run into issues:
- Open an issue on GitHub
- Check existing issues for solutions
- Refer to the documentation

---

**⭐ Star this repository if you find it helpful!**

---

## 📚 Additional Resources

### MongoDB Setup
If you don't have MongoDB installed:
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env` file

### Environment Variables Reference

**Backend (.env):**
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatApp
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Common Issues & Solutions

**Issue: Connection refused on port 3000**
- Make sure backend is running
- Check if port 3000 is available
- Try changing the port in `.env`

**Issue: MongoDB connection failed**
- Verify your MongoDB URI is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure MongoDB service is running (if local)

**Issue: Socket connection error**
- Ensure backend is running on port 3000
- Check CORS configuration
- Verify Socket.IO versions match

---

Made with ❤️ using MERN Stack

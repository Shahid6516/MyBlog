# 📝 My Blog Website (MERN)

My Blog Website is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js), where users can read blogs and the admin can securely manage posts through protected routes. The project features user authentication, JWT-based admin authorization, and CRUD operations for blog posts. Admin routes are secured using middleware that verifies JWT tokens and checks admin privileges before allowing access. The frontend (React) communicates with the backend (Express, Node.js) via REST APIs, and data is stored in MongoDB using Mongoose. Passwords are hashed using Bcrypt, and environment variables are managed with Dotenv. The app offers a clean, responsive UI for readers and an admin dashboard for managing content efficiently.

---

## 🚀 Features

### 🧑‍💻 User Side
- View all blog posts
- Read individual blog content
- Responsive and clean UI
- Pagination / search functionality (optional)

### 🔐 Admin Side
- Login with authentication (JWT-based)
- Create, edit, and delete blog posts
- Manage all posts from the admin dashboard
- Protected routes — only accessible to the admin

---

## 🛡️ Secure Admin Route

Admin routes are **JWT-protected** and verified using middleware.


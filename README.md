
# 🛒 E_commerce_frontend_mern


A **full-stack e-commerce web application built with the MERN stack**  
(**MongoDB, Express.js, React / Next.js, Node.js**).

Focuses on **secure authentication, API rate limiting, dynamic routing, responsive UI, theme management, and production-style frontend–backend separation**.

---

## 🌐 Live Demo

> *(https://darshankardil-create.github.io/E_commerce_fro_mern/)*

---

## 🔗 Project Repositories

**Frontend:**  
👉 https://github.com/darshankardil-create/E_commerce_fro_mern  

**Backend:**  
👉 https://github.com/darshankardil-create/e_commerce_mern_backend  

---

## 📌 Overview

- **Frontend:** UI rendering, dynamic routing, state management, user interaction  
- **Backend:** REST APIs, authentication, rate limiting, database operations, business logic  
- **Highlights:** Theme control, responsive design, dynamic headers, custom search suggestions, detailed checkout info


---

### 💡 UX / Interface Enhancements
- **Headers & elements adapt based on page/location**, showing only what's necessary  
- **Conditional rendering** to keep UI clean and focused  
- Minimal, easy-to-use interface

---

=======

## 🔐 Authentication & Security (Backend)

- **Password hashing with bcrypt**  
- **JWT-based authentication** for protected routes  
- Middleware protects sensitive endpoints  
- Secure **account deletion flow**  
- Environment-based configuration for secrets

---

## 🚦 API Rate Limiting (Upstash Redis)

- Limits requests per user/key  
- Applied to critical routes:
  - Authentication
  - Cart updates
  - Orders
- Prevents brute-force attacks & API abuse  
- Returns `429 Too Many Requests` when limits exceeded  

---

## ⚡ Performance Highlights

- Optimized **cart quantity updates** (debouncing technique)  
- Conditional rendering keeps UI lightweight  
- Efficient backend request handling with middleware  

---

## 🧠 Tech Stack

**Frontend**
- Next.js
- JavaScript (ES6+)
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT
- bcrypt
- Upstash Redis (rate limiting)

---


=======

## 🛍️ User Features

### 🔥 High-Value Features
- **Login / Sign-up pages**  
- **Dynamic routing:** Product pages, checkout, order tracking, user-specific pages  
- **Checkout page** with detailed product summary:
  - Product name
  - Quantity
  - Price per item
  - Total (with and without tax)
- **Order tracing / history page**
- **Delete account page**
- **Custom made search suggestions** (beyond basic `<select>` or `<datalist>` options)

### 🎯 Medium-Value Features
- **Theme control:** Light/Dark mode toggle  
- **Theme persistence** on refresh  
- Responsive design for **mobile & laptop**  
- Mobile menu to navigate previously mentioned pages easily
- **Page lock & blur overlay:** The page becomes non-interactive and blurred until the user signs up . It also locks the page if the user's account is deleted, not found, or doesn’t exist in the database.

### 💡 UX / Interface Enhancements
- **Headers & elements adapt based on page/location**, showing only what's necessary  
- **Conditional rendering** to keep UI clean and focused  
- Minimal, easy-to-use interface

---



## 🚀 Getting Started

### Frontend
```bash
git clone https://github.com/darshankardil-create/E_commerce_fro_mern.git
cd E_commerce_fro_mern
npm install
npm run dev

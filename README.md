# SwiftPay - Mobile Financial Service (MFS) Application

**🌐 Live Site URL**: [Traventure Live Site](https://swifftpay.netlify.app/)

SwiftPay is a secure and user-friendly Mobile Financial Service (MFS) web application that facilitates seamless digital transactions, including send money, cash-in, cash-out, and balance inquiries. The platform provides distinct roles for Users, Agents, and Admins, ensuring a structured and efficient financial ecosystem.

## Features 🚀

**🔹 User Features**

  - Secure registration and login with JWT authentication
  - Users receive a 40 Taka bonus upon registration
  - Send money with a 5 Taka fee for transactions over 100 Taka
  - Cash-in through agents without any fees
  - Cash-out through agents with a 1.5% fee
  - Balance inquiry with secure visibility
  - Transaction history (last 100 transactions)
  - Receive notifications after transactions

**🔹 Agent Features**

  - Secure registration and login with JWT authentication
  - Agents require admin approval for activation
  - Agents receive 100,000 Taka upon approval
  - Facilitate cash-in transactions for users
  - Earn 1% commission on user cash-outs
  - Request balance recharge from the admin
  - Withdraw request to admin when needed
  - View transaction history (last 100 transactions)

**🔹 Admin Features**

  - Secure login and role-based access control
  - Manage users and agents (approve/reject agents, block users)
  - View and manage all transactions
  - Earn 0.5% on cash-outs and 5 Taka on each money operation
  - Approve agent balance recharge requests
  - Monitor total system funds and admin earnings

---

**🔒 Security Measures**

  - JWT Authentication for secure access control
  - Bcrypt PIN hashing for user data protection
  - Device-based login restriction (one device per user)
  - Role-based authorization for different access levels

---

**🔗 Additional Functionalities**

  - Search users by phone number (Admin panel)
  - Blurred balance visibility (Click to reveal for security)
  - Notifications on all transactions
  - Admin dashboard to monitor system funds

---

## Tech Stack 💻

**Frontend**:
  - React
  - Tailwind CSS
  - DaisyUI
  - React Icons
  - React Router
  - Animate.css
  - React Toastify
  - SweetAlert2
  - React Loading
  - React Helmet
  - Match Sorter
  - Sort-By
  - React Datepicker
  - React Captcha
**Backend**: Node.js, Express.js
**Database**: MongoDB
**Authentication**: Firebase Authentication, JWT
**Hosting**: Netlify (client) & Vercel (server)

---

## Setup Instructions 🛠️

### Prerequisites:

- Node.js installed on your machine.
- MongoDB database set up.
- Firebase project configured.

### Steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jaber-riyan/SwiftPay_Client.git
   cd SwiftPay_Client
   ```

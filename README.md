# 🚀 Techie LMS Open Source Contribution Guide

Welcome to the **Techie LMS** repository! This is a modern, modular, "Anti-Gravity" style Masterclass and Learning Management platform. 
We've built this application using the latest edge technologies and designed it to be highly scalable and interactive.

We would absolutely love your help in making this platform even better. Follow the step-by-step instructions below to set up the project locally on your machine and start contributing!

---

## 🛠️ The Tech Stack

- **Frontend:** React + Vite, Tailwind CSS, ShadCN UI, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (NeonDB serverless architecture)
- **ORM:** Prisma
- **Authentication:** Firebase Auth (Google Sign-In + Email/Password)

---

## 🏃‍♂️ Step-by-Step Local Setup 

Follow these steps exactly to get both the frontend and backend running locally on your machine.

### 1. Fork & Clone the Repository
Right-click "Fork" at the top right of this repository to create your own copy. Then clone it:
```bash
git clone https://github.com/YOUR_USERNAME/techie-lms.git
cd techie-lms
```

### 2. Install Project Dependencies
We manage both the frontend and backend dependencies in the same root mapping for simplicity.
```bash
npm install --legacy-peer-deps
```

### 3. Configure Environment Variables
You need to create a `.env` file at the root of the project folder. Add the following keys (ask a core maintainer for the development keys if you don't have them):

```env
# Server
PORT=5000

# Prisma NeonDB Connection
DATABASE_URL="postgres://username:password@your-neon-host/neondb?sslmode=require"

# Firebase Config (Usually placed in frontend if applicable, but keep secrets safe!)
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
...
```

### 4. Sync the Prisma Database
Before you launch the backend, generate the ORM schemas and sync your local code with the PostgreSQL Database.
```bash
npx prisma generate
npx prisma db push
```

### 5. Launch the Application!
Techie LMS operates on two different ports (Frontend on `5173`, Backend on `5000`). You need to open **TWO separate terminal windows** inside the project folder:

**Terminal Window 1 (Frontend):**
```bash
npm run dev
```

**Terminal Window 2 (Backend API):**
```bash
node server.js
```
Now, simply open your browser and navigate to `http://localhost:5173` 🎉

---

## 👨‍💻 How to Contribute

We follow a standard Git workflow:

1. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/my-awesome-new-button
   ```
2. **Make your code changes.** Ensure your code is clean, well-commented, and follows the existing SaaS design style (glassmorphism/Tailwind/Framer).
3. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: added my awesome new button"
   ```
4. **Push the branch to your fork:**
   ```bash
   git push origin feature/my-awesome-new-button
   ```
5. **Open a Pull Request** against our `main` branch. Describe exactly what changes you made!

---

### 😎 Quick Tips for Students
- **Admin Access Locally:** By default, only `support@techiehelp.in` is granted Admin dashboard permissions. If you need to test the Admin UI natively, you can temporarily change the backend logic in `server/routes/auth.js` to bypass this check on your local system! 
- **Got an idea?** Check the "Issues" tab. We label good starter tasks as `good first issue`.

Happy Coding! 🚀

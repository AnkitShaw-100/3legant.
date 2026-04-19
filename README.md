# Elegant. — E‑Commerce 

A full-stack e-commerce application with a React (Create React App + Tailwind CSS) frontend and an Express + MongoDB backend. Includes authentication, product and category management, cart and orders, and admin/user dashboards.

## Tech Stack

* Frontend: React (CRA), Tailwind CSS, React Router, Axios
* Backend: Node.js, Express, MongoDB (Mongoose), JWT authentication
* Tooling: Nodemon, PostCSS

## Features

* User registration and login
* Role-based access (admin and user)
* Product and category CRUD (admin)
* Cart management and order placement
* Admin and user dashboards
* Responsive UI with Tailwind CSS

## Project Structure

```
backend/    # API, auth, database
client/     # React frontend
```

## Getting Started

**Requirements:** Node.js 18+, MongoDB

```bash
# Backend
cd backend
npm install
npm run server

# Frontend
cd ../client
npm install
npm start
```

Frontend runs on `http://localhost:3000`. Backend runs on port `8080` by default.

## Environment Variables

Create `backend/.env`:

```
MONGO_url=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=8080
```

## Notes

* Backend enables CORS for the frontend origin
* Project is mid-migration to Tailwind CSS

## License

Add your license information here

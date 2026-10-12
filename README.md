# NodeMart

NodeMart is a full-stack product marketplace built with React, Node.js, Express, and MongoDB. Users can create an account, sign in, and manage their own products, including product images.

## Live Demo

- **Frontend:** [https://nodemart-frontend.vercel.app/](https://nodemart-frontend.vercel.app/)
- **Backend API:** [https://nodemart.vercel.app/](https://nodemart.vercel.app/)

## Features

- User signup and login
- JWT-based authentication
- Create, view, update, and delete products
- Users can manage only their own products
- Product image uploads stored with Cloudinary
- Product search by title
- Filter products by minimum and maximum price
- Sort and paginate product results
- Responsive React single-page application

## Tech Stack

**Frontend**
- React
- Vite
- React Router
- JavaScript
- Fetch API

**Backend**
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Multer
- Cloudinary

**Deployment**
- Vercel

## Project Structure


NodeMart/
├── nodemart-backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js
└── nodemart-frontend/
    ├── src/
    └── package.json


## Run Locally

You need Node.js, npm, and a MongoDB connection string to run this project locally.

### 1. Set up the backend


cd nodemart-backend
npm install


Create a `.env` file inside `nodemart-backend`:


PORT=4000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


Start the backend:


npm start


The API will run at `http://localhost:4000`.

### 2. Set up the frontend

Open another terminal:


cd nodemart-frontend
npm install


Create a `.env` file inside `nodemart-frontend`:


VITE_API_URL=http://localhost:4000


Start the frontend:


npm run dev


Vite will show the local frontend address in the terminal, usually `http://localhost:5173`.

> Keep `.env` files private. Do not commit database passwords, JWT secrets, or Cloudinary credentials to GitHub.

## API Overview

The backend is deployed at `https://nodemart.vercel.app`.

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/users/signup` | Create an account |
| `POST` | `/users/login` | Log in and receive an authentication token |

### Products

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/products` | Get products; supports search, price filters, sorting, and pagination |
| `GET` | `/products/:id` | Get one product |
| `GET` | `/products/my-products` | Get products belonging to the logged-in user |
| `POST` | `/products` | Create a product |
| `PUT` | `/products/:id` | Update your product |
| `DELETE` | `/products/:id` | Delete your product |

Protected endpoints require a token in the request header:


Authorization: Bearer YOUR_TOKEN


The product listing endpoint supports query parameters such as:


/products?search=keyboard&minPrice=1000&maxPrice=10000&page=1&limit=10


## Product Image Uploads

Product images are uploaded to Cloudinary. Configure the Cloudinary environment variables in the backend before running it locally. Do not expose Cloudinary credentials in frontend code.

## Deployment

The frontend and backend are deployed as separate Vercel projects. Set the required environment variables in each project's Vercel settings:

- **Backend:** MongoDB and Cloudinary credentials, plus the JWT secret.
- **Frontend:** `VITE_API_URL=https://nodemart.vercel.app`

After changing environment variables in Vercel, redeploy the relevant project.

## Future Improvements

Possible additions include product categories, favorites, shopping cart, orders, and payment integration.

# CryptoTracker App

CryptoTracker is a full-stack web application that displays cryptocurrency data using **Django REST Framework (DRF)** for the backend and **React.js** for the frontend. The app integrates **CoinAPI** to fetch live cryptocurrency data.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Key Setup](#api-key-setup)
- [Deployment](#deployment)

## Features

- **Live Cryptocurrency Data:** Displays live prices using CoinAPI.
- **Full-Stack Architecture:** Backend built with Django REST Framework and frontend with React.js.
- **User-friendly Interface:** Built with modern UI design principles.
- **Responsive:** Works on both desktop and mobile devices.

## Requirements

- Python 3.x
- Node.js (with npm or yarn)
- Django 5.x
- React 18.x
- CoinAPI account and API key (Get free API key [here](https://www.coinapi.io/get-free-api-key?product_id=market-data-api))

## Setup Instructions

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/aditya-madwal/cryptoAssignment.git
\`\`\`

### 2. Backend Setup (Django REST Framework)

1. Create and activate a virtual environment:

   \`\`\`bash
   python -m venv env
   source env/bin/activate # On Windows: env\Scripts\activate
   \`\`\`

2. Install the required dependencies:

   \`\`\`bash
   pip install -r backend/requirements.txt
   \`\`\`

3. Set up the database and migrate:

   \`\`\`bash
   python manage.py migrate
   \`\`\`

4. Create a \`.env\` file in the backend root directory and add the following environment variables:

   \`\`\`bash
   COIN_API_KEY=your_coin_api_key
   \`\`\`

5. Run the Django server:

   \`\`\`bash
   python manage.py runserver
   \`\`\`

### 3. Frontend Setup (React.js)

1. Navigate to the frontend directory:

   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:

   \`\`\`bash
   npm install
   \`\`\`

   Or with yarn:

   \`\`\`bash
   yarn install
   \`\`\`

3. Start the React development server:

   \`\`\`bash
   npm start
   \`\`\`

   Or with yarn:

   \`\`\`bash
   yarn start
   \`\`\`

### 4. Access the Application

- The backend server will run at: \`http://127.0.0.1:8000/\`
- The frontend React app will run at: \`http://localhost:5173/\`

## API Key Setup

This app uses **CoinAPI** to fetch live cryptocurrency data. You must get an API key from [CoinAPI](https://www.coinapi.io/get-free-api-key?product_id=market-data-api) and add it to the \`.env\` file in your backend directory.

Example \`.env\` file:

\`\`\`bash
COIN_API_KEY=your_coin_api_key
\`\`\`

Make sure to replace \`your_coin_api_key\` with your actual API key.

## Deployment

### 1. Backend Deployment

1. Set up a production-ready environment (e.g., on a VPS or cloud service like AWS, DigitalOcean, etc.).
2. Install production dependencies and collect static files:

   \`\`\`bash
   python manage.py collectstatic
   \`\`\`

3. Make sure to configure environment variables for production.
4. Set up a production server (e.g., using **Gunicorn** and **Nginx**) for serving the Django app.

### 2. Frontend Deployment

1. Build the React app for production:

   \`\`\`bash
   npm run build
   \`\`\`

   Or with yarn:

   \`\`\`bash
   yarn build
   \`\`\`

## Acknowledgments

- [CoinAPI](https://www.coinapi.io) for providing the cryptocurrency market data.

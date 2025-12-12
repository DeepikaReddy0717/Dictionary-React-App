📘 Dictionary React App

A lightweight and modern dictionary application built using React + Vite.
This project allows users to search English words and view definitions, examples, pronunciation, synonyms, antonyms, and related images.
Developed as part of an internship project for Averises Solution.

Features

Search any English word using the Free Dictionary API

View definitions, parts of speech, and example sentences

Access synonyms and antonyms

Play pronunciation audio (when available)

Display images related to the word using the Pexels API

Save favorite words using localStorage

Word of the Day functionality

Light and Dark theme support

Responsive UI with clean and modern design

Project Structure
src/
 ├─ components/
 │   ├─ Navbar.jsx
 │   ├─ SearchBar.jsx
 │   ├─ WordDetails.jsx
 │   ├─ Favorites.jsx
 │   └─ ImageGallery.jsx
 ├─ services/
 │   └─ api.js
 ├─ utils/
 │   └─ helpers.js
 ├─ styles/
 │   └─ index.css
 ├─ App.jsx
 ├─ main.jsx

Getting Started
Installation

Clone the repository:

git clone https://github.com/DeepikaReddy0717/Dictionary-React-App.git
cd Dictionary-React-App


Install dependencies:

npm install

Environment Variables

Create a .env file in the project root:

VITE_PEXELS_API_KEY=your_pexels_api_key_here


The Free Dictionary API does not require a key.

Development

Start the development server:

npm run dev


The app will be available at:

http://localhost:5173/

Build for Production
npm run build


Preview production build:

npm run preview

API Usage
Free Dictionary API

Used to fetch definitions, examples, synonyms, antonyms, and pronunciation.

Pexels API

Used to retrieve relevant images for searched words.
An API key is required and stored in .env.

Deployment

You can deploy this project using:

Vercel

Netlify

GitHub Pages (via static export)

Ensure that the environment variable VITE_PEXELS_API_KEY is added in your hosting settings.

Technologies Used

React

Vite

JavaScript (ES2022)

CSS (custom styling)

Free Dictionary API

Pexels API

Author

Deepika Reddy
Internship Project — Averises Solution
GitHub: https://github.com/DeepikaReddy0717

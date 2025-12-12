# 📘 Dictionary React App

A lightweight and modern dictionary application built using **React + Vite**.  
This project allows users to search English words and view **definitions, examples, pronunciation, synonyms, antonyms**, and **related images**.  
Developed as an internship project for **Averises Solution**.

---

## ✨ Features

- 🔍 Search any English word using the **Free Dictionary API**
- 📚 View definitions, parts of speech, and example sentences
- 🔄 Access **synonyms** and **antonyms**
- 🔊 Play pronunciation audio (when available)
- 🖼 Display images related to the word using the **Pexels API**
- ⭐ Save favorite words using **localStorage**
- 🎯 Word of the Day functionality
- 🌙 Light / Dark theme support
- 📱 Responsive UI with a clean and modern design

---

📁 Project Structure

```text
src/
├─ components/
│  ├─ Navbar.jsx
│  ├─ SearchBar.jsx
│  ├─ WordDetails.jsx
│  ├─ Favorites.jsx
│  └─ ImageGallery.jsx
│
├─ services/
│  └─ api.js
│
├─ utils/
│  └─ helpers.js
│
├─ styles/
│  └─ index.css
│
├─ App.jsx
└─ main.jsx
```


---

## 📌 How to Run the Project Locally

```bash
# Clone the repository
git clone https://github.com/DeepikaReddy0717/Dictionary-React-App.git
cd Dictionary-React-App

# Install dependencies
npm install

# Environment Variables: Create a .env file in the project root:
VITE_PEXELS_API_KEY=your_pexels_api_key_here

# Run the development server
npm run dev

#Open in browser:
http://localhost:5173/
```

## 🌐 API Usage

### 📘 Free Dictionary API
Used to fetch:
- Definitions  
- Phonetics  
- Examples  
- Synonyms & antonyms  

---

### 🖼 Pexels API
Used to fetch images for searched words.  
Requires API key stored in `.env`.
VITE_PEXELS_API_KEY=your_key

---

## 🚀 Deployment

You can deploy using:
- **Vercel**
- **Netlify**
- **GitHub Pages**

Make sure to add the environment variable:

VITE_PEXELS_API_KEY=your_key

in your deployment settings.

---

## 🛠 Technologies Used

- ⚛️ React  
- ⚡ Vite  
- 🎨 CSS  
- 🌐 Free Dictionary API  
- 🖼 Pexels API  
- 💾 localStorage  

---

## 👩‍💻 Author

**Deepika Reddy**  
Internship Project — **Averises Solution**  
GitHub: https://github.com/DeepikaReddy0717



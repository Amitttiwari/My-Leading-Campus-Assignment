# 📘 AI Question Paper Generator

An AI-powered frontend application that helps teachers generate question papers based on uploaded text or PDFs using GPT-3.5 (via OpenRouter). This tool allows users to create structured question sets in seconds, view previous generations, and search through stored sessions.

---

## 🧠 Overview

This project was built as part of an internship assignment to demonstrate the use of AI in enhancing productivity tools. The app lets a teacher:

- Paste a chapter or upload a PDF
- Click a button to generate 5 two-mark and 10 one-mark questions
- View the generated paper in a clean, responsive layout
- Search and review up to 5 previously generated papers saved in browser memory
- Use a demo chapter if they just want to try the functionality

---

## 🚀 Steps to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-question-generator.git
cd ai-question-generator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
Create a `.env` file:
```env
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```
*You can get your API key from [https://openrouter.ai](https://openrouter.ai)*

### 4. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to view the app.

### 5. (Optional) Build for Production
```bash
npm run build
```

---

## 📌 Assumptions & Trade-offs

- Assumes a fixed output format: **5 two-mark + 10 one-mark** questions
- Uses GPT-3.5 via OpenRouter (free alternative to OpenAI)
- Stores previous papers using **localStorage**, not a database
- PDF parsing ignores layout/formatting and only extracts raw text
- Error handling is minimal to keep the UI clean and light
- No login/auth system; session data is local to the browser

---

## 🛠️ Technologies Used

| Purpose                     | Technology             |
|-----------------------------|-------------------------|
| Frontend Framework         | React                   |
| Styling                    | TailwindCSS             |
| AI Integration             | GPT-3.5 via OpenRouter  |
| PDF Reading                | pdfjs-dist              |
| Build Tool                 | Vite                    |
| Deployment                 | Vercel                  |

---

## 🧾 Example Prompt Sent to API
```
Generate 5 two-mark and 10 one-mark questions from this content:
[chapter or extracted PDF text]
```

---

## 🌐 Live Version 
https://my-leading-campus-assignment-git-main-amitttiwaris-projects.vercel.app

# One Month to Type Better

A full-stack typing practice application built with FastAPI and React.

## Features

- 🔐 User Authentication (Register/Login)
- 👤 Guest Mode (No registration required)
- ⌨️ Typing Test with multiple duration options
- 🎯 Keystroke Practice with difficulty levels
- 📊 Progress Dashboard with statistics
- 🎨 Three themes (Light, Dark, Colorblind)
- ⌨️ Virtual keyboard with key highlighting
- 💾 Progress tracking for registered users

## Tech Stack

**Backend:**
- FastAPI
- SQLite with SQLAlchemy
- JWT Authentication
- Bcrypt password hashing

**Frontend:**
- React with Vite
- Tailwind CSS
- Chart.js
- React Router
- Space Grotesk font

## Installation

### Backend

\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn main:app --reload
\`\`\`

### Frontend

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## Usage

1. Start backend server (http://localhost:8000)
2. Start frontend server (http://localhost:5173)
3. Choose to Login, Register, or Continue as Guest
4. Start practicing!

## License

MIT
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

AI Multimedia Q&A Platform

An AI-powered multimedia question-answering platform built using React, FastAPI, Whisper AI, FAISS vector search, and local LLM integration with Ollama.

Features
Upload PDF documents
Upload audio files (MP3/WAV)
Upload video files (MP4/MOV)
AI-powered semantic question answering
Speech-to-text transcription using Whisper
Video audio extraction using FFmpeg
Vector embeddings with FAISS
Local LLM support using Ollama + Llama3
Modern React frontend UI
FastAPI backend API
Tech Stack
Frontend
React
Vite
Tailwind CSS
Axios
Backend
FastAPI
Python
Uvicorn
FAISS
Sentence Transformers
Whisper AI
MoviePy
FFmpeg
AI / ML
Ollama
Llama3
Semantic Search
Vector Embeddings
RAG Pipeline
Architecture
PDF -----------\
Audio ----------> Text Extraction → Embeddings → Vector Search → AI Answers
Video ----------/
Project Workflow
PDF Processing
PDF → Extract Text → Generate Embeddings → Store in FAISS → Ask AI
Audio Processing
Audio → Whisper Transcription → Text → Embeddings → Ask AI
Video Processing
Video → Extract Audio → Whisper → Text → Embeddings → Ask AI
Installation
Clone Repository
git clone https://github.com/irohxnn/ai-multimedia-qa.git
Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

Backend runs on:

http://127.0.0.1:8000
Install Ollama

Download:

https://ollama.com

Run:

ollama run llama3
Install FFmpeg

Download:

https://www.gyan.dev/ffmpeg/builds/

Add:

C:\ffmpeg\bin

to Windows PATH.

Supported File Formats
Documents
PDF
Audio
MP3
WAV
Video
MP4
MOV
API Endpoints
Upload File
POST /upload
Ask AI Question
POST /chat
Future Improvements
Authentication
Chat history
Drag & drop upload
Streaming AI responses
Persistent vector database
Cloud deployment
Multi-user support
Dark mode
File previews
Deployment
Frontend
Vercel
Backend
Render
🚀 AI Internship Coach

An AI-powered web application that helps students improve their internship applications by analyzing resumes and giving personalized, recruiter-style feedback.

Built using React (Vite) and powered by the Groq LLaMA 3 API, this project simulates how real hiring managers evaluate resumes.

📌 Overview

AI Internship Coach is designed to help students understand how strong their resume is for specific internship roles. It provides instant feedback on strengths, weaknesses, missing skills, and overall job match score.

✨ Features
📄 Resume Analysis
Evaluates resume structure and content
Identifies strengths and weak points
🎯 Job Match Scoring
Scores resume from 0–100 based on role fit
Helps users understand internship readiness
🔑 Keyword Detection
Finds missing skills or keywords from job requirements
Suggests improvements for better matching
💡 AI Feedback
Provides clear, recruiter-style suggestions
Explains what to improve and why
⚡ Fast AI Processing
Uses Groq LLaMA 3 for quick and accurate responses
🧠 How It Works
User inputs or uploads a resume
The frontend sends the resume data to the backend
Backend forwards data to the Groq LLaMA 3 API
AI processes the resume and analyzes:
Skills
Experience
Formatting
Job relevance
The system returns:
Match score
Strengths
Weaknesses
Missing keywords
Improvement suggestions
🛠️ Tech Stack
Frontend: React (Vite)
AI Model: Groq LLaMA 3 API
Backend: Node.js / Express
Styling: CSS / Tailwind (if used)
🚀 Getting Started
1. Clone the project
git clone your-repo-name
cd your-repo-name
2. Install dependencies
npm install
3. Environment setup

Create a .env file in the root directory:

VITE_GROQ_API_KEY=your_api_key_here
4. Run the project
npm run dev

Open the app in your browser using the local development link shown in the terminal.

📦 Usage
Open the application
Paste or upload your resume
Click “Analyze Resume”
View your results:
Job match score
Strengths
Weaknesses
Missing skills
AI recommendations
👨‍💻 Developer Notes
Project Structure
src/components/ → UI components
src/pages/ → Main pages
src/services/ → API handling logic
backend/ → Server and AI request handling (if applicable)
Easy Enhancements
Add PDF resume upload support
Add multiple job role selection
Save past resume analyses
Export feedback as PDF
Add authentication system
Improve UI with dashboard-style layout
💼 Use Cases
Students applying for internships
Career readiness improvement
Resume optimization before job applications
Bootcamp and self-taught developers
University career coaching tools
📈 Future Improvements
Real job posting integration
AI mock interview simulator
Cover letter generator
Resume version tracking
Personalized career roadmap
🤝 Contribution

Contributions are welcome.

Fork the project
Create a new branch
Make improvements
Submit a pull request
📄 License

This project is open source and available for educational and personal use.

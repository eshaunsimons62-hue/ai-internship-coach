🚀 AI Internship Coach

An AI-powered web application that helps students improve their internship applications by analyzing resumes, matching them to job roles, and providing personalized feedback on how to stand out.

Built with React (Vite) and powered by the Groq LLaMA 3 API, this tool acts like a virtual career coach that evaluates resumes like real recruiters do.

✨ Features
📄 Resume analysis with AI feedback
🎯 Internship/job match scoring
🔑 Keyword gap detection (what’s missing in your resume)
💡 Personalized improvement suggestions
🧠 Strengths and weaknesses breakdown
⚡ Fast responses using Groq LLaMA 3 API
📊 Job-readiness scoring system
🧠 How It Works
User uploads or pastes a resume
The frontend sends resume data to the backend
The backend sends it to the Groq LLaMA 3 API
AI analyzes:
Skills
Experience
Formatting
Job relevance
The system returns:
Match score (0–100)
Strengths
Weak areas
Missing keywords
Improvement suggestions
🛠️ Tech Stack
Frontend: React + Vite
AI Model: Groq LLaMA 3 API
Backend: Node.js / Express (if applicable)
Styling: CSS / Tailwind (if used)
Deployment: (Add your platform: Vercel / Netlify / Render)
🚀 Getting Started
1. Clone the repository
git clone https://github.com/your-username/ai-internship-coach.git
cd ai-internship-coach
2. Install dependencies
npm install
3. Set up environment variables

Create a .env file in the root:

VITE_GROQ_API_KEY=your_api_key_here
4. Run the development server
npm run dev

Then open:

http://localhost:5173
📦 Usage
Open the app in your browser
Paste or upload your resume
Click Analyze Resume
View your:
Job match score
AI feedback report
Skill gaps
Suggested improvements

Use the feedback to improve your resume before applying to internships.

👨‍💻 For Developers

This project is structured to be easy to extend.

Key Files:
src/components/ResumeForm.jsx → input handling
src/services/api.js → API calls to Groq
src/pages/Home.jsx → main UI
backend/ (if included) → server logic
How to Extend It:
Add multiple job role comparisons (Software Engineer, Data Analyst, etc.)
Add resume PDF parsing
Add authentication + user history
Add downloadable AI feedback reports (PDF export)
Add internship job scraping integration
💼 Use Cases
Students preparing for internships
Career centers at universities
Bootcamp graduates improving resumes
Self-taught developers checking job readiness
Anyone applying for entry-level tech roles
📈 Future Improvements
Resume scoring history tracking
Real job posting matching (LinkedIn / Indeed integration)
AI mock interview feature
Cover letter generator
Portfolio analyzer
🤝 Contributing

Pull requests are welcome. If you want to improve this project:

Fork the repo
Create a new branch
Make changes
Submit a PR
📄 License

This project is open source and available under the MIT License.

⭐ About

Built as a project to help students break into tech internships using AI-driven feedback and real-world resume analysis.

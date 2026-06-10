import { useState } from "react";
import { getResumeFeedback } from "../api/ai";

const ScoreRing = ({ score, label, color }) => {
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const pct = (score / 10) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="#1e2d45" strokeWidth="5" />
        <circle
          cx="36" cy="36" r={radius} fill="none"
          stroke={color} strokeWidth="5"
          strokeDasharray={`${pct} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
        <text x="36" y="40" textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="Space Grotesk">
          {score}/10
        </text>
      </svg>
      <span style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
    </div>
  );
};

const Tag = ({ children, color = "#3b82f6" }) => (
  <span style={{
    display: "inline-block", padding: "3px 10px", borderRadius: 20,
    fontSize: 12, fontWeight: 500, border: `1px solid ${color}22`,
    background: `${color}15`, color
  }}>{children}</span>
);

const Section = ({ icon, title, children, accentColor = "#3b82f6" }) => (
  <div style={{
    background: "#0f1724", border: "1px solid #1e2d45",
    borderRadius: 12, padding: "20px 24px",
    borderLeft: `3px solid ${accentColor}`
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em" }}>{title}</h3>
    </div>
    {children}
  </div>
);

export default function AppPage() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [showJob, setShowJob] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!resume.trim()) { setError("Please paste your resume first."); return; }
    setLoading(true); setError(""); setFeedback(null);
    try {
      const result = await getResumeFeedback(resume, jobDesc);
      setFeedback(result);
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  const scoreColor = (s) => s >= 8 ? "#10b981" : s >= 6 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ minHeight: "100vh", background: "#080c14", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header style={{
        borderBottom: "1px solid #1e2d45", padding: "16px 32px",
        display: "flex", alignItems: "center", gap: 12
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16
        }}>🎯</div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "white" }}>
          InternCoach <span style={{ color: "#3b82f6" }}>AI</span>
        </span>
      </header>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-block", padding: "5px 14px", borderRadius: 20,
            background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)",
            color: "#3b82f6", fontSize: 12, fontWeight: 600, marginBottom: 16,
            textTransform: "uppercase", letterSpacing: "0.08em"
          }}>Powered by GPT-4o</div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 700, color: "white", lineHeight: 1.15, marginBottom: 14
          }}>
            Get your resume <span style={{
              background: "linear-gradient(90deg, #3b82f6, #6366f1)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>internship-ready</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
            Paste your resume, optionally add a job description, and get specific AI feedback in seconds.
          </p>
        </div>

        {/* Input Card */}
        <div style={{
          background: "#0f1724", border: "1px solid #1e2d45",
          borderRadius: 16, overflow: "hidden", marginBottom: 24
        }}>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #1e2d45" }}>
            {["Resume", ...(showJob ? ["Job Description"] : [])].map((tab, i) => (
              <button key={tab} onClick={() => {}} style={{
                padding: "14px 20px", background: "transparent", border: "none",
                color: i === 0 ? "white" : "#64748b", fontWeight: 600, fontSize: 14,
                borderBottom: i === 0 ? "2px solid #3b82f6" : "2px solid transparent",
                cursor: "default"
              }}>{tab}</button>
            ))}
          </div>

          <div style={{ padding: 24 }}>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your full resume text here...&#10;&#10;Include: contact info, education, experience, skills, and projects."
              style={{
                width: "100%", height: 220, background: "#162035",
                border: "1px solid #1e2d45", borderRadius: 10, padding: "14px 16px",
                color: "white", fontSize: 14, lineHeight: 1.6, resize: "vertical",
                outline: "none", transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
              onBlur={(e) => e.target.style.borderColor = "#1e2d45"}
            />

            {/* Job toggle */}
            <button
              onClick={() => setShowJob(!showJob)}
              style={{
                marginTop: 12, background: "transparent",
                border: "1px dashed #1e2d45", borderRadius: 8,
                color: "#64748b", fontSize: 13, padding: "8px 16px",
                display: "flex", alignItems: "center", gap: 6,
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = "#3b82f6"; e.target.style.color = "#3b82f6"; }}
              onMouseLeave={(e) => { e.target.style.borderColor = "#1e2d45"; e.target.style.color = "#64748b"; }}
            >
              {showJob ? "✕ Remove" : "+ Add"} job description <span style={{ fontSize: 10, background: "#1e2d45", padding: "2px 6px", borderRadius: 4 }}>optional</span>
            </button>

            {showJob && (
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job posting here to get a match score and missing keywords..."
                style={{
                  marginTop: 12, width: "100%", height: 140,
                  background: "#162035", border: "1px solid #1e2d45",
                  borderRadius: 10, padding: "14px 16px", color: "white",
                  fontSize: 14, lineHeight: 1.6, resize: "vertical", outline: "none"
                }}
                onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                onBlur={(e) => e.target.style.borderColor = "#1e2d45"}
              />
            )}

            {error && (
              <div style={{
                marginTop: 12, padding: "10px 14px", borderRadius: 8,
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                color: "#fca5a5", fontSize: 13
              }}>⚠️ {error}</div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              style={{
                marginTop: 16, width: "100%", padding: "14px",
                borderRadius: 10, border: "none",
                background: loading ? "#1e2d45" : "linear-gradient(135deg, #3b82f6, #6366f1)",
                color: loading ? "#64748b" : "white",
                fontWeight: 700, fontSize: 15, letterSpacing: "0.01em",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "opacity 0.2s", fontFamily: "'Inter', sans-serif"
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #64748b", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Analyzing your resume…
                </span>
              ) : "Analyze My Resume →"}
            </button>
          </div>
        </div>

        {/* Results */}
        {feedback && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeIn 0.4s ease" }}>
            {/* Score row */}
            <div style={{
              background: "#0f1724", border: "1px solid #1e2d45",
              borderRadius: 16, padding: "28px 32px",
              display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap"
            }}>
              <ScoreRing score={feedback.score} label="Overall" color={scoreColor(feedback.score)} />
              {feedback.matchScore !== null && (
                <ScoreRing score={feedback.matchScore} label="Job Match" color={scoreColor(feedback.matchScore)} />
              )}
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>{feedback.summary}</p>
              </div>
            </div>

            {/* 3-column grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
              <Section icon="✅" title="Strengths" accentColor="#10b981">
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {feedback.strengths.map((s, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "#cbd5e1", lineHeight: 1.5 }}>
                      <span style={{ color: "#10b981", flexShrink: 0, marginTop: 1 }}>✓</span>{s}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section icon="⚠️" title="Improvements" accentColor="#f59e0b">
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {feedback.improvements.map((s, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "#cbd5e1", lineHeight: 1.5 }}>
                      <span style={{ color: "#f59e0b", flexShrink: 0, marginTop: 1 }}>→</span>{s}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section icon="⚡" title="Quick Wins" accentColor="#3b82f6">
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {feedback.quickWins.map((s, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "#cbd5e1", lineHeight: 1.5 }}>
                      <span style={{ color: "#3b82f6", flexShrink: 0, marginTop: 1 }}>{i + 1}.</span>{s}
                    </li>
                  ))}
                </ul>
              </Section>
            </div>

            {/* Missing keywords */}
            {feedback.missingKeywords?.length > 0 && (
              <Section icon="🔍" title="Missing Keywords from Job Description" accentColor="#6366f1">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {feedback.missingKeywords.map((kw, i) => (
                    <Tag key={i} color="#6366f1">{kw}</Tag>
                  ))}
                </div>
                <p style={{ marginTop: 12, fontSize: 12, color: "#64748b" }}>
                  Consider adding these to your resume where relevant and truthful.
                </p>
              </Section>
            )}

            {/* Retry button */}
            <button
              onClick={() => { setFeedback(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              style={{
                alignSelf: "center", padding: "10px 24px",
                background: "transparent", border: "1px solid #1e2d45",
                borderRadius: 8, color: "#64748b", fontSize: 14, cursor: "pointer"
              }}
            >↑ Analyze Again</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

import { useState } from "react";
import { getResumeFeedback } from "../api/ai";

export default function AppPage() {
  const [resume, setResume] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setFeedback("");

    const result = await getResumeFeedback(resume);

    setFeedback(result);
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>AI Resume Helper</h1>
        <p style={styles.subtitle}>
          Get instant feedback to improve your resume for internships
        </p>

        <textarea
          placeholder="Paste your resume here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          style={styles.textarea}
        />

        <button
          onClick={handleClick}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {})
          }}
          disabled={loading}
        >
          {loading ? "Analyzing Resume..." : "Get Feedback"}
        </button>

        {feedback && (
          <div style={styles.card}>
            <div style={styles.feedbackText}>{feedback}</div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    fontFamily: "Arial"
  },
  container: {
    width: "100%",
    maxWidth: "700px",
    padding: "20px"
  },
  title: {
    color: "white",
    fontSize: "32px",
    marginBottom: "5px"
  },
  subtitle: {
    color: "#94a3b8",
    marginBottom: "20px"
  },
  textarea: {
    width: "100%",
    height: "200px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    marginBottom: "10px"
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed"
  },
  card: {
    marginTop: "20px",
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    color: "white"
  },
  feedbackText: {
    whiteSpace: "pre-line",
    lineHeight: "1.6"
  }
};
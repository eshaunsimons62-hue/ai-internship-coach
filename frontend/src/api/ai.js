export async function getResumeFeedback(resumeText, jobDescription = "") {
  const hasJob = jobDescription.trim().length > 0;

  const systemPrompt = `You are an expert career coach specializing in helping students land tech internships. 
Analyze resumes and provide actionable, specific feedback. Always respond with valid JSON only — no markdown, no extra text.`;

  const userPrompt = hasJob
    ? `Analyze this resume for the following job description and return JSON.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return this exact JSON structure:
{
  "score": <number 1-10>,
  "matchScore": <number 1-10, how well resume matches the job>,
  "summary": "<2-sentence overall assessment>",
  "strengths": ["<specific strength 1>", "<specific strength 2>", "<specific strength 3>"],
  "improvements": ["<specific improvement 1>", "<specific improvement 2>", "<specific improvement 3>"],
  "missingKeywords": ["<keyword from job not in resume>", ...up to 6],
  "quickWins": ["<actionable 1-sentence fix>", "<actionable 1-sentence fix>", "<actionable 1-sentence fix>"]
}`
    : `Analyze this resume for tech internship applications and return JSON.

RESUME:
${resumeText}

Return this exact JSON structure:
{
  "score": <number 1-10>,
  "matchScore": null,
  "summary": "<2-sentence overall assessment>",
  "strengths": ["<specific strength 1>", "<specific strength 2>", "<specific strength 3>"],
  "improvements": ["<specific improvement 1>", "<specific improvement 2>", "<specific improvement 3>"],
  "missingKeywords": [],
  "quickWins": ["<actionable 1-sentence fix>", "<actionable 1-sentence fix>", "<actionable 1-sentence fix>"]
}`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.4,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || "Groq request failed");
  }

  const data = await response.json();
  const text = data.choices[0].message.content.trim();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Could not parse AI response. Please try again.");
  }
}

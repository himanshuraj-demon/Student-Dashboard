import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const SYSTEM_PROMPT = `
You are StudyTracker AI.

You help students:
- Learn programming.
- Solve DSA problems.
- Understand computer science concepts.
- Create study plans.
- Improve productivity.

Rules:
- use less and concise text for normal conversation and questions not DSA and coding questions.
- Answer clearly and accurately.
- Use Markdown formatting.
- Use headings and code blocks when appropriate.
- For coding questions, explain the thought process.
- For DSA questions, discuss time and space complexity.
- Prefer Java, TypeScript, React, Node.js, MongoDB, and SQL examples.
`;

async function handleAi(req,res) {
    try {
        const { message, history } = req.body;
        if (!message?.trim()) {
            return res.status(400).json({
                success: false,
                error: "Message is required",
            });
        }

        const messages = [
            {
                role: "system",
                content: SYSTEM_PROMPT,
            },

            ...(history || []).map((msg) => ({
                role: msg.role,
                content: msg.content,
            })),

            {
                role: "user",
                content: message,
            },
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages,
            temperature: 0.7,
        });

        const aiContent =
            completion.choices[0]?.message?.content ||
            "Sorry, I couldn't generate a response.";
        return res.status(200).json({
            success: true,
            message: {
                id: crypto.randomUUID(),
                role: "assistant",
                content: aiContent,
                timestamp: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error("AI Chat Error:", error);

        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
}

export {
    handleAi
}
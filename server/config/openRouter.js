const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions"
const model = "openai/gpt-4o-mini"

export const generateResponse = async (prompt) => {
    const apiKey = process.env.OPENROUTER_API_KEY
    console.log("OPENROUTER_API_KEY loaded:", apiKey ? "✅ API Key found" : "❌ API Key missing");
    const res = await fetch(openRouterUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: model,
            messages: [
                {
                    role: "system",
                    content: `
You are a senior frontend engineer.

Generate a modern website.

IMPORTANT:
Return response in STRICT JSON format:

{
  "files": {
    "index.html": "...",
    "style.css": "...",
    "script.js": "..."
  }
}

Rules:
- Do NOT inline CSS or JS
- Use clean modern UI
- Responsive layout
- Navbar, Hero, Features, Footer

Return ONLY JSON.
`
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7

        }),
    });

    if (!res.ok) {
        const err = await res.text()
        throw new Error("openRouter err" + err)
    }

    const data = await res.json()
    const raw = data.choices[0].message.content

let parsed
try {
  parsed = JSON.parse(raw)
} catch (e) {
  // fallback if AI returns plain HTML
  return { files: { "index.html": raw } }
}

return parsed

}

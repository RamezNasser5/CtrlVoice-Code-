import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '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',
});

export async function chatInterface() {
    try {
        const stream = await openai.chat.completions.create({
          model: "gpt-4", // Adjust the model name if needed
          messages: [{ role: "user", content: "Say this is a test" }],
          stream: true,
        });
    
        console.log("API call successful!");
    
        for await (const chunk of stream) {
          process.stdout.write(chunk.choices[0]?.delta?.content || "");
        }
      } catch (error) {
        console.error("Error:", error);
      }
}


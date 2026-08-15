import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import dotenv from "dotenv"
dotenv.config()

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY
});

const prompt = `
Analyze the candidate against the job description.

JOB DESCRIPTION:
PASTE YOUR SAME HARD MERN JOB DESCRIPTION HERE

RESUME:
PASTE THE SAME RESUME TEXT HERE

SELF DESCRIPTION:
PASTE THE SAME SELF DESCRIPTION HERE

Create a concise interview preparation report.

Requirements:
- Match score from 0-100.
- Exactly 3 technical interview questions.
- Exactly 2 behavioral interview questions.
- Identify the most important skill gaps.
- Create a practical 3-day preparation plan.
- Keep explanations concise.
- Keep interview answers to 3-5 sentences.
- Base the analysis only on the provided information.
`;

const models = [
    "gemini-3.5-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite"
];

async function testModel(model) {

    console.log("\n==============================");
    console.log("Testing:", model);
    console.log("==============================");

    console.time(model);

    try {

        const res = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        console.timeEnd(model);

        console.log(
            "Response characters:",
            res.text?.length || 0
        );

    } catch (error) {

        console.timeEnd(model);

        console.error(
            `${model} FAILED:`,
            error.message
        );
    }
}

async function runTests() {

    for (const model of models) {
        await testModel(model);
    }

}

runTests();
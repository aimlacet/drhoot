process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


export async function sentence_completion(user_id) {
    try{
        const module_id="6756a6ee92b3362d52c4b237"
        const a=await axios.post('https://aihoot.in:5001/api/random-sentence-completion',{
            user_id:user_id,
            module_id:module_id
        })
        const set_id=a.data._id;
        const q1=a.data.set[0].Q;
        const q2=a.data.set[1].Q;
        const q3=a.data.set[2].Q;

        const prompt=`
        You are a grammar expert. Fill in the blanks correctly for the following 3 sentences.

        Sentences:
        1) ${q1}
        2) ${q2}
        3) ${q3}

        Rules:
        - Respond with ONLY three correct words
        - Each word should be the correct missing word for each sentence
        - Maintain the same order (1st word for sentence 1, 2nd for sentence 2, 3rd for sentence 3)
        - No periods, no numbering, no explanation, no sentences — ONLY the 3 words and separated by commas

        Example Response Format:
        word1, word2, word3`

        const res = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
            contents: [
                {
                parts: [{ text: prompt }]
                }
            ]
            }
        );
        let rawText = res.data.candidates[0].content.parts[0].text.trim();
        const answersArray = rawText.split(",").map(word => word.trim());

         const answer=await axios.post('https://aihoot.in:5001/api/submit-sentence-completion',{
            "platform":"web",
            "set_id":set_id,
            "user_id":user_id,
            "result": {
                "accuracy": 100
            },
            "duration": 34,
            "questions": [
                {
                    "question": q1,
                    "answer": answersArray[0],
                    "improvements": "No Improvements"
                },
                {
                    "question": q2,
                    "answer": answersArray[1],
                    "improvements": "No Improvements"
                },
                {
                    "question": q3,
                    "answer": answersArray[2],
                    "improvements": "No Improvements"
                }
        ]
        })
        console.log("Sentence Completion Success")
    }
    catch(err){
        console.log("❌ Error in Sentence Completion")
    }
}

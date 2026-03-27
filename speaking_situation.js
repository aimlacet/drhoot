import axios from "axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function listen_repeat(user_id) {
    try {
        const module_id = "6756bb7492b3362d52c4b295";
        const response = await axios.post(
            "https://aihoot.in:5001/api/random-speaking-situation",
            {
                user_id: user_id,
                module_id: module_id,
            },
        );
        const question = response.data.question;
        const id = response.data._id;
        await axios.post(
            "https://aihoot.in:5001/api/submit-sentence",
            {
                platform: "web",
                user_id: user_id,
                sentence_id: sentence_id,
                module_id: module_id,
                duration: 20,
                answer: sentence,
                sentence: sentence,
            },
        );
        console.log("Listen & Repeat Done");
    } catch (err) {
        console.log("❌ Error in Listen & Repeat", err);
    }
}

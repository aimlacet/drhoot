import axios from "axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function listen_repeat(user_id) {
    try {
        const module_id = "6756be6092b3362d52c4b2ae";
        const response = await axios.post(
            "https://aihoot.in:5001/api/get-random-sentence",
            {
                user_id: user_id,
                module_id: module_id,
            },
        );
        const sentence_id = response.data._id;
        const sentence = response.data.sentence_name;
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

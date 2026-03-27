import axios from "axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function dictation(user_id) {
    try {
        const module_id = "6756af8392b3362d52c4b258";

        const response = await axios.post(
            "https://aihoot.in:5001/api/dictation-random-question",
            {
                user_id: user_id,
                module_id: module_id,
            },
        );

        const set_id = response.data._id;
        const sentences = response.data.set;

        for (const sent of sentences) {
            await axios.post("https://aihoot.in:5001/api/dictation-analysis", {
                module_id: module_id,
                answer: sent.sentence,
                question: sent.sentence,
            });
        }
        await axios.post("https://aihoot.in:5001/api/submit-dictation", {
            platform: "web",
            set_id: set_id,
            user_id: user_id,
            result: { accuracy: 100 },
            duration: 40,
            questions: [
                {
                    question: sentences[0].sentence,
                    answer: sentences[0].sentence,
                },
                {
                    question: sentences[1].sentence,
                    answer: sentences[1].sentence,
                },
                {
                    question: sentences[2].sentence,
                    answer: sentences[2].sentence,
                },
            ],
            missed_words: null,
            wrong_spell_words: null,
            status: 1,
            back_spaces: 0,
        });
        console.log("Dictation Done");
    } catch (err) {
        console.error("❌ Error in Dictation", err);
    }
}

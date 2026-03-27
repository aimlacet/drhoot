import axios from "axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function sentence_build(user_id) {
    try {
        const module_id = "6756b98792b3362d52c4b286";
        const response = await axios.post(
            "https://aihoot.in:5001/api/sentence-build-random-question",
            {
                user_id: user_id,
                module_id: module_id,
            },
        );
        const sentences = response.data.set;
        const set_id = response.data._id;
        for (const sent of sentences) {
            await axios.post(
                "https://aihoot.in:5001/api/sentence-build-analysis",
                {
                    module_id: module_id,
                    answer: sent.sentence,
                    question: sent.word,
                    set_id: set_id,
                },
            );
        }
        await axios.post("https://aihoot.in:5001/api/submit-sentence-build", {
            set_id: set_id,
            user_id: "66628e2f213ad0a228fedc8f",
            duration: 30,
            result: { accuracy: 100 },
            status: 1,
            questions: [
                {
                    answer: sentences[0].sentence,
                    question: sentences[0].word,
                    correct_answer: sentences[0].sentence,
                    improvements: "none",
                },
                {
                    answer: sentences[1].sentence,
                    question: sentences[1].word,
                    correct_answer: sentences[1].sentence,
                    improvements: "none",
                },
                {
                    answer: sentences[2].sentence,
                    question: sentences[2].word,
                    correct_answer: sentences[2].sentence,
                    improvements: "none",
                },
            ],
            platform: "web",
        });
        console.log("Sentence Build Done");
    } catch (err) {
        console.log("❌ Error in Sentence Build", err);
    }
}

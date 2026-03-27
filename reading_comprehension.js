import axios from "axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function reading_comprehension(user_id, roll_no) {
    try {
        const module_id = "6756a85892b3362d52c4b23c";

        const response = await axios.post(
            "https://aihoot.in:5001/api/get-random-reading-comprehension-question",
            {
                user_id: user_id,
                module_id: module_id,
            },
        );

        const questions = response.data.set[0].questions;
        const set_id = response.data._id;


        const submitRes = await axios.post(
            "https://aihoot.in:5001/api/submit-response-selection",
            {
                set_id: set_id,
                user_id: user_id,
                roll_no: roll_no,
                accuracy: "100",
                duration: 20,
                questions: [
                    {
                        question: questions[0].Q,
                        answer: questions[0].answer,
                        correct_answer: questions[0].answer,
                    },
                    {
                        question: questions[1].Q,
                        answer: questions[1].answer,
                        correct_answer: questions[1].answer,
                    },
                    {
                        question: questions[2].Q,
                        answer: questions[2].answer,
                        correct_answer: questions[2].answer,
                    },
                ],
            },
        );

        console.log("Reading Comprehension Success");
    } catch (err) {
        console.error("❌ Error in Reading Comprehension", err);
    }
}

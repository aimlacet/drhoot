import axios from "axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function response_selection(user_id) {
    try {
        const module_id = "6756877792b3362d52c4b17e";
        
        const response = await axios.post('https://aihoot.in:5001/api/get-random-response-selection', {
            user_id: user_id,
            module_id: module_id
        });


        const set_id = response.data._id;
        const questions = response.data.set;
        const submittedQuestions = questions.map(q => ({
            question: q.Q,
            answer: q.A,   
            correct_answer: q.A
        }));

        const submitRes = await axios.post('https://aihoot.in:5001/api/submit-response-selection', {
            "set_id": set_id,
            "user_id": user_id,
            "module_id": module_id,
            "accuracy": "100",
            "duration": 45,
            "platform": "web",
            "questions": submittedQuestions
        });

        console.log("Response Selection Success");
    } catch (err) {
        console.error("❌ Error in Response Selection");
    }
}
import axios from "axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function passage_comprehension(user_id) {
    try{
        const module_id="6756a2c592b3362d52c4b1fb"
        const a=await axios.post('https://aihoot.in:5001/api/get-random-passage-comprehension',{
            user_id:user_id,
            module_id:module_id
        })
        const set_id=a.data._id
        const questions=a.data.set[0].questions

        await axios.post('https://aihoot.in:5001/api/submit-passage-comprehension',{
            "set_id":set_id,
            "user_id":user_id,
            "accuracy":"100",
            "duration":55,
            "platform":"web",
            "questions":[{"question":questions[0].Q,"answer":questions[0].A,"correct_answer":questions[0].A},
            {"question":questions[1].Q,"answer":questions[1].A,"correct_answer":questions[1].A},
            {"question":questions[0].Q,"answer":questions[2].A,"correct_answer":questions[2].A}],
        })
        console.log("Passage Comprehension Success")
    }
    catch(err){
        console.log("❌ Error in Passage Comprehension")
    }
}
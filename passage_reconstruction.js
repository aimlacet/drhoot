import axios from "axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function passage_reconstruction(user_id) {
    try {
        const module_id = "6756b11b92b3362d52c4b268";

        const response = await axios.post(
            "https://aihoot.in:5001/api/get-random-passage-reconstruction",
            {
                user_id: user_id,
                module_id: module_id,
            },
        );

        const passage = response.data.passage;
        const passage_id = response.data._id;

        await axios.post(
            "https://aihoot.in:5001/api/submit-passage-reconstruction",
            {
                platform: "web",
                passage_id: passage_id,
                user_id: user_id,
                module_id: module_id,
                duration: 200,
                answer: passage,
                backspaces: 0,
            },
        );
        console.log("Passage Reconstruction Done");
    } catch (err) {
        console.error("❌ Error in Passage Reconstruction");
    }
}

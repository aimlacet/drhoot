process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 
import express from "express";
import { response_selection } from './response_selection.js'; 
import { passage_comprehension } from './passage_comprehension.js'; 
import { listen_repeat } from './listen_repeat.js'; 
import { sentence_build } from './sentence_build.js'; 
// import { speaking_situation } from './speaking_situation.js'; 
import { sentence_completion } from './sentence_completion.js'; 
import { reading_comprehension } from './reading_comprehension.js'; 
import { dictation } from "./dictation.js";
import { passage_reconstruction } from "./passage_reconstruction.js";

const app = express();

app.use(express.json()); 

const PORT = 3000;
app.listen(PORT, async() => {

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

    console.log(`Server started`);
    
    const userId = "66628e2f213ad0a228fedc8f";
    try {
		//listnening
        for(let i = 0; i < 5; i++) {
			await response_selection(userId);
			await sleep(60 * 1000);
		}
        for(let i = 0; i < 3; i++) {
			await passage_comprehension(userId);
			await sleep(60 * 1000);
		}
		//speaking
        for(let i = 0; i < 5; i++) {
			await listen_repeat(userId);
			await sleep(24 * 1000);
		}
		for(let i = 0; i < 2; i++) {
			await sentence_build(userId);
			await sleep(5 * 60 * 1000);
		}
		// for(let i = 0; i < 0; i++) {
		// 	await speaking_situation(userId);
		// 	await sleep(5 * 60 * 1000);
	    // }
		//reading
		for(let i = 0; i < 3; i++) {
			await sentence_completion(userId);
			await sleep(60 * 1000);
		}
		for(let i = 0; i < 2; i++) {
			await reading_comprehension(userId, "23P31A4211");
			await sleep(3 * 60 * 1000);
		}
		//writing
		for(let i = 0; i < 2; i++) {
			await dictation(userId);
			await sleep(3 * 60 * 1000);
		}
		for(let i = 0; i < 1; i++) {
			await passage_reconstruction(userId);
		}
	}
	catch (err) {
        console.log(err.message)
    }
});
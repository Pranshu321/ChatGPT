import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
	apiKey: process.env.open_ai_key,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).send({
		message: "Hello from ChatGPT",
	});
});

app.post("/", async (req, res) => {
	try {
		const prompt = req.body.prompt;

		const res = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `${prompt}`,
			temperature: 0,
			max_tokens: 3000,
			top_p: 1,
			frequency_penalty: 0.5,
			presence_penalty: 0,
		});

		res.status(200).send({
			bot: res.data.choices[0].text,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({ error });
	}
});

app.listen(5000 | process.env.PORT, () => {
    console.log("Open Chat GPT is started on PORT 5000 😁");
})

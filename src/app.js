import express from "express";

const app = express();
app.use(express.json());

app.get("/*", (request, response) => {
	response.status(200).send("You have reached the server");
});

export default app;

import express from "express";
import depotRouter from "./routes/Depot.router";

const app = express();
app.use(express.json());

app.use("/depots", depotRouter);

app.get("/*", (request, response) => {
	response.status(200).send("You have reached the server");
});

export default app;

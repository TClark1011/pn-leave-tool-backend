import express from "express";
import DepotRouter from "./routes/Depot.router";
import LeaveRouter from "./routes/Leave.router";
import UserRouter from "./routes/User.router";
import cors from "cors";
import getErrorResponse from "./utils/responses/getErrorResponse";
import "express-async-errors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", UserRouter);
app.use("/leave", LeaveRouter);
app.use("/depots", DepotRouter);
app.all("/*", (err, req, res, next) => {
	if (!err) {
		next();
		return;
	}
	res
		.status(500)
		.json(
			getErrorResponse({ "fullMessage": "An error ocurred", "extraData": err })
		);
});

app.all("/*", (req, res) => {
	res.status(404).send("Bad url");
});

export default app;

module.exports = app;
//? Allows use of 'require' to import server code into jest tests.
//? This is required due to specific jest behaviour

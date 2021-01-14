import express from "express";
import "express-async-errors";

import DepotRouter from "./routes/Depot.router";
import LeaveRouter from "./routes/Leave.router";
import UserRouter from "./routes/User.router";
import cors from "cors";
import { logErrors, sendErrorResponse } from "./middleware/errorMiddleware";
import helmet from "helmet";
import logger from "./middleware/loggingMiddleware";
import ifNotTesting from "./utils/ifNotTesting";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

ifNotTesting(() => app.use(logger));
app.use("/users", UserRouter);
app.use("/leave", LeaveRouter);
app.use("/depots", DepotRouter);

app.all("/*", (req, res) => {
	res.status(404).send("Bad url");
});

ifNotTesting(() => app.use(logErrors));
app.use(sendErrorResponse);

export default app;

module.exports = app;
//? Allows use of 'require' to import server code into jest tests.
//? This is required due to specific jest behaviour

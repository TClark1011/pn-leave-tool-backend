import express from "express";
import DepotRouter from "./routes/Depot.router";
import LeaveRouter from "./routes/Leave.router";
import UserRouter from "./routes/User.router";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", UserRouter);
app.use("/leave", LeaveRouter);
app.use("/depots", DepotRouter);

app.all("/*", (req, res) => {
	res.status(404).send("Bad url");
});

export default app;

module.exports = app;
//? Allows use of 'require' to import server code into jest tests.
//? This is required due to specific jest behaviour

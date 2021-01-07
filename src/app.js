import express from "express";
import DepotRouter from "./routes/Depot.router";
import UserRouter from "./routes/User.router";

const app = express();
app.use(express.json());

app.use("/users", UserRouter);
app.use("/depots", DepotRouter);

app.all("/*", (req, res) => {
	res.status(404).send("Bad url");
});

export default app;

module.exports = app;
//? Allows use of 'require' to import server code into jest tests.
//? This is required due to specific jest behaviour

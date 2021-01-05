import express from "express";
import DepotRouter from "./routes/Depot.router";
import UserRouter from "./routes/User.router";

const app = express();
app.use(express.json());

app.use("/user", UserRouter);
app.use("/depots", DepotRouter);

app.all("/*", (req, res) => {
	res.status(404).send("Bad url");
});

export default app;

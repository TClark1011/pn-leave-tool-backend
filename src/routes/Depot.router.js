import express from "express";
import getAuthMiddleware from "../middleware/authMiddleware";
import DepotModel from "../models/Depot.model";
import createDocument from "../utils/createDocument";
import deleteDocument from "../utils/deleteDocument";
import fetchAllDocuments from "../utils/fetchAllDocuments";

const depotRouter = express.Router();

depotRouter.get("/", fetchAllDocuments(DepotModel));

depotRouter.use("/", getAuthMiddleware("operator_access_key"));

depotRouter.post("/", createDocument(DepotModel));
depotRouter.delete("/:id", deleteDocument(DepotModel));

export default depotRouter;

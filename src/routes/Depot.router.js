import express from "express";
import getAuthMiddleware from "../middleware/authMiddleware";
import DepotModel from "../models/Depot.model";
import createDocument from "../utils/createDocument";
import deleteDocument from "../utils/deleteDocument";
import fetchAllDocuments from "../utils/fetchAllDocuments";

const depotRouter = express.Router();

//# Fetch all depots
depotRouter.get("/", fetchAllDocuments(DepotModel));

//# Authentication required to create/delete depots
depotRouter.use("/", getAuthMiddleware("operator_access_key"));

//# Create a new depot
depotRouter.post("/", createDocument(DepotModel));

//# Delete a depot
depotRouter.delete("/:id", deleteDocument(DepotModel));

export default depotRouter;

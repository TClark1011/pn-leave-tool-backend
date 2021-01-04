import { Router } from "express";
import getAuthMiddleware from "../middleware/authMiddleware";
import DepotModel from "../models/Depot.model";
import createDocument from "../utils/document_controls/createDocument";
import deleteDocument from "../utils/document_controls/deleteDocument";
import fetchAllDocuments from "../utils/document_controls/fetchAllDocuments";

const DepotRouter = Router();

//# Fetch all depots
DepotRouter.get("/", fetchAllDocuments(DepotModel));

//# Authentication required to create/delete depots
DepotRouter.use("/", getAuthMiddleware("operator_access_key"));

//# Create a new depot
DepotRouter.post("/", createDocument(DepotModel));

//# Delete a depot
DepotRouter.delete("/:id", deleteDocument(DepotModel));

export default DepotRouter;

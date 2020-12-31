import express from "express";
import DepotModel from "../models/Depot.model";
import deleteDocument from "../utils/deleteDocument";
import fetchAllDocuments from "../utils/fetchAllDocuments";

const depotRouter = express.Router();

depotRouter.get("/", fetchAllDocuments(DepotModel));
depotRouter.delete("/:id", deleteDocument(DepotModel));

export default depotRouter;

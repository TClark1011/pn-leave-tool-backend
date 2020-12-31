import express from "express";
import DepotModel from "../models/Depot.model";
import createDocument from "../utils/createDocument";
import deleteDocument from "../utils/deleteDocument";
import fetchAllDocuments from "../utils/fetchAllDocuments";

const depotRouter = express.Router();

depotRouter.post("/", createDocument(DepotModel));
depotRouter.get("/", fetchAllDocuments(DepotModel));
depotRouter.delete("/:id", deleteDocument(DepotModel));

export default depotRouter;

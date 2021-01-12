import { Router } from "express";
import leaveRequestHandler from "../handlers/leave_handlers/leaveRequestHandler";
import lmsDataHandler from "../handlers/leave_handlers/lmsDataHandler";
import getAuthMiddleware from "../middleware/authMiddleware";
import validationMiddleware from "../middleware/validationMiddleware";
import leaveVal from "../validation/schemas/leaveVal";
import lmsDataVal from "../validation/schemas/lmsDataVal";

const LeaveRouter = Router();

LeaveRouter.use("/request", getAuthMiddleware("login"));
LeaveRouter.post("/request", validationMiddleware(leaveVal));
LeaveRouter.post("/request", leaveRequestHandler);

LeaveRouter.use("/lmsData", getAuthMiddleware("operator_access_key"));
LeaveRouter.use("/lmsData", validationMiddleware(lmsDataVal));
LeaveRouter.post("/lmsData", lmsDataHandler);

export default LeaveRouter;

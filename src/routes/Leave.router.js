import { Router } from "express";
import leaveRequestHandler from "../handlers/leave_handlers/leaveRequestHandler";
import lmsDataHandler from "../handlers/leave_handlers/lmsDataHandler";
import getAuthMiddleware from "../middleware/authMiddleware";

const LeaveRouter = Router();

LeaveRouter.use("/", getAuthMiddleware("login"));

// LeaveRouter.post("/request", validationMiddleware(registerVal));
LeaveRouter.post("/request", leaveRequestHandler);

LeaveRouter.post("/lmsData", lmsDataHandler);

export default LeaveRouter;

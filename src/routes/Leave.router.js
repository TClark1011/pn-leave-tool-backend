import { Router } from "express";
import leaveRequestHandler from "../handlers/leave_handlers/leaveRequestHandler";
import getAuthMiddleware from "../middleware/authMiddleware";

const LeaveRouter = Router();

LeaveRouter.use("/", getAuthMiddleware("login"));

// LeaveRouter.post("/request", validationMiddleware(registerVal));
LeaveRouter.post("/request", leaveRequestHandler);

export default LeaveRouter;

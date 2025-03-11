import express from "express";
import {
    registerAdmin,
    getAllManagersWithTeams,
    assignTargetsToManager,
    addManager,
    removeManager,
    viewPerformanceReports
} from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// ✅ Register a new admin (Only admins can create other admins)
router.post("/register", authMiddleware, roleMiddleware(["admin"]), registerAdmin);

// ✅ Get all managers with their respective teams
router.get("/managers", authMiddleware, roleMiddleware(["admin"]), getAllManagersWithTeams);

// ✅ Assign sales targets to a manager
router.put("/manager/:id/assignTargets", authMiddleware, roleMiddleware(["admin"]), assignTargetsToManager);

// ✅ Add a manager to admin control
router.put("/manager/add", authMiddleware, roleMiddleware(["admin"]), addManager);

// ✅ Remove a manager from admin control
router.put("/manager/:id/remove", authMiddleware, roleMiddleware(["admin"]), removeManager);

// ✅ View detailed performance reports of all managers and teams
router.get("/performanceReports", authMiddleware, roleMiddleware(["admin"]), viewPerformanceReports);

export default router;

import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Manager from "../models/Manager.js";
import Employee from "../models/Employee.js";
import Sales from "../models/Sales.js";

// ✅ Register a new admin
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: "admin"
        });

        const savedUser = await newUser.save();

        const newAdmin = new Admin({
            user: savedUser._id,
            managedManagers: []
        });

        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error registering admin", error });
    }
};

// ✅ Get all managers with their respective teams
export const getAllManagersWithTeams = async (req, res) => {
    try {
        const managers = await Manager.find()
            .populate("user", "name email role")
            .populate({
                path: "teamMembers",
                select: "name email role",
                model: User
            });

        res.status(200).json(managers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching managers and teams", error });
    }
};

// ✅ Assign sales targets to a manager
export const assignTargetsToManager = async (req, res) => {
    try {
        const { monthly, quarterly, yearly } = req.body;
        const manager = await Manager.findByIdAndUpdate(req.params.id, { assignedTargets: { monthly, quarterly, yearly } }, { new: true });

        if (!manager) {
            return res.status(404).json({ message: "Manager not found" });
        }

        res.status(200).json({ message: "Sales targets updated successfully", manager });
    } catch (error) {
        res.status(500).json({ message: "Error updating sales targets", error });
    }
};

// ✅ Add a manager to admin control
export const addManager = async (req, res) => {
    try {
        const { managerId } = req.body;
        const admin = await Admin.findOne(); // Assuming one admin manages all
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const managerUser = await User.findOne({ _id: managerId, role: "manager" });
        if (!managerUser) {
            return res.status(404).json({ message: "Manager not found" });
        }

        if (admin.managedManagers.includes(managerUser._id)) {
            return res.status(400).json({ message: "Manager is already assigned" });
        }

        admin.managedManagers.push(managerUser._id);
        await admin.save();

        res.status(200).json({ message: "Manager assigned successfully", admin });
    } catch (error) {
        res.status(500).json({ message: "Error assigning manager", error });
    }
};

// ✅ Remove a manager from admin control
export const removeManager = async (req, res) => {
    try {
        const admin = await Admin.findOne();
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        admin.managedManagers = admin.managedManagers.filter(id => id.toString() !== req.params.id);
        await admin.save();

        res.status(200).json({ message: "Manager removed successfully", admin });
    } catch (error) {
        res.status(500).json({ message: "Error removing manager", error });
    }
};

// ✅ View detailed performance reports
export const viewPerformanceReports = async (req, res) => {
    try {
        const managers = await Manager.find()
            .populate("user", "name email")
            .populate("teamMembers", "name email")
            .lean();

        const reports = await Promise.all(managers.map(async (manager) => {
            const sales = await Sales.find({ employee: { $in: manager.teamMembers } });
            const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
            
            return {
                managerName: manager.user.name,
                managerEmail: manager.user.email,
                teamSize: manager.teamMembers.length,
                totalSales
            };
        }));

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: "Error fetching performance reports", error });
    }
};

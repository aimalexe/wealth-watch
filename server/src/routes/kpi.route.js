import { Router } from "express";
import Kpi from "../models/Kpi.model.js";

const router = Router();
router.get("/kpis", async (req, res) => {
    try {
        const kpis = await Kpi.find();
        res.status(200).json(kpis);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
)

export default router;
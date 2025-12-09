import { Router } from "express";
import { getRecords, getRecord, createRecord, updateRecord, deleteRecord } from "../controllers/posterController.js";

const router = Router();
// Subroutes til /api/posters
router.get("/", getRecords);
router.get("/:id", getRecord);
router.post("/", createRecord);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export const posterRoutes = router;

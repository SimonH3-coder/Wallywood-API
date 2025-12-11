import { Router } from "express";
import { getRecords, getRecord, createRecord, updateRecord, deleteRecord } from "../controllers/genresController.js";
import { create } from "domain";

const router = Router();
router.get("/", getRecords);
router.get("/:slug", getRecord);
router.post("/", createRecord);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export const genresRoutes = router;

import { Router } from "express";
import {
  addWorkOrder,
  getWorkOrder,
  getWorkOrderByOtNumber,
  getWorkOrders,
  updateWorkOrder,
} from "../controllers/WorkOrder";

const router = Router();

router.get("/", getWorkOrders);
router.get("/:id", getWorkOrder);
router.get("/otnumber/:id", getWorkOrderByOtNumber);
router.post("/", addWorkOrder);
router.put("/:id", updateWorkOrder);

export default router;

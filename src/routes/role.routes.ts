import { Router } from "express";
import * as roleCtrl from "../controllers/role.controller";
const router = Router();

router.get("/", roleCtrl.getAll);
router.get("/role/:role", roleCtrl.getOneByRole);
router.post("/", roleCtrl.create);
router.put("/:role", roleCtrl.update);
router.delete("/:role", roleCtrl.remove);
export default router;

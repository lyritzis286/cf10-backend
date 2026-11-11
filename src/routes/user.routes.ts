import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
const router = Router();

router.get("/", userCtrl.getAll);
router.get("/email/:email", userCtrl.getOneByEmail);
router.post("/", userCtrl.create);
router.put("/:username", userCtrl.update);
router.delete("/:username", userCtrl.remove);
export default router;

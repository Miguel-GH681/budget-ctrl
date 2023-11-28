import { Router } from "express";
import { deleteMovement, getMovements, postMovement } from "../controllers/movement";

const router = Router();

router.get('/', getMovements);
router.get('/:id', getMovements);
router.post('/', postMovement);
router.delete('/:id', deleteMovement);

export default router;
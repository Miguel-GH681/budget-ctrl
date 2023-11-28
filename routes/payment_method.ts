import { Router } from "express";
import { deleteMethod, getMethod, getMethods, postMethod, putMethod } from "../controllers/payment_method";

const router = Router();

router.get('/', getMethods);
router.get('/:id', getMethod);
router.post('/', postMethod);
router.put('/:id', putMethod);
router.delete('/:id', deleteMethod);

export default router;
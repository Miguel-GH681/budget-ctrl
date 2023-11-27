import { Router } from "express";
import { deleteBudget, getBudget, getBudgets, postBudget, putBudget } from "../controllers/budget";

const router = Router();

router.get('/', getBudgets);
router.get('/:id', getBudget);
router.post('/', postBudget);
router.put('/:id', putBudget);
router.delete('/:id', deleteBudget);

export default router;
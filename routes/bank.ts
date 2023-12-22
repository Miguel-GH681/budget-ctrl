import { Router } from "express";
import { deleteBank, getBank, getBanks, postBank, putBank } from "../controllers/bank";

const router = Router();

router.get('/', getBanks);
router.get('/:id', getBank);
router.post('/', postBank);
router.put('/:id', putBank);
router.delete('/:id', deleteBank);

export default router;

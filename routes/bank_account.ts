import { Router } from "express";
import { deleteBankAccount, getBankAccount, getBankAccounts, postBankAccount, putBankAccount } from "../controllers/bank_account";

const router = Router();

router.get('/', getBankAccounts);
router.get('/:id', getBankAccount);
router.post('/', postBankAccount);
router.put('/:id', putBankAccount);
router.delete('/:id', deleteBankAccount);

export default router;

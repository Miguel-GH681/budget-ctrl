import { Router } from "express";
import { deleteAccount, getAccount, getAccountDataToForm, getAccounts, postAccount, putAccount } from "../controllers/account";

const router = Router();

router.get('/', getAccounts);
router.get('/form', getAccountDataToForm);
router.get('/:id', getAccount);
router.post('/', postAccount);
router.put('/:id', putAccount);
router.delete('/:id', deleteAccount);

export default router;
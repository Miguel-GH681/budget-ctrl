"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bank_account_1 = require("../controllers/bank_account");
const router = (0, express_1.Router)();
router.get('/', bank_account_1.getBankAccounts);
router.get('/:id', bank_account_1.getBankAccount);
router.post('/', bank_account_1.postBankAccount);
router.put('/:id', bank_account_1.putBankAccount);
router.delete('/:id', bank_account_1.deleteBankAccount);
exports.default = router;
//# sourceMappingURL=bank_account.js.map
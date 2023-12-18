"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_1 = require("../controllers/account");
const router = (0, express_1.Router)();
router.get('/', account_1.getAccounts);
router.get('/form', account_1.getAccountDataToForm);
router.get('/:id', account_1.getAccount);
router.post('/', account_1.postAccount);
router.put('/:id', account_1.putAccount);
router.delete('/:id', account_1.deleteAccount);
exports.default = router;
//# sourceMappingURL=account.js.map
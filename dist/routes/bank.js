"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bank_1 = require("../controllers/bank");
const router = (0, express_1.Router)();
router.get('/', bank_1.getBanks);
router.get('/:id', bank_1.getBank);
router.post('/', bank_1.postBank);
router.put('/:id', bank_1.putBank);
router.delete('/:id', bank_1.deleteBank);
exports.default = router;
//# sourceMappingURL=bank.js.map
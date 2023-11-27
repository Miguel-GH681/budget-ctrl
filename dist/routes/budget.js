"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const budget_1 = require("../controllers/budget");
const router = (0, express_1.Router)();
router.get('/', budget_1.getBudgets);
router.get('/:id', budget_1.getBudget);
router.post('/', budget_1.postBudget);
router.put('/:id', budget_1.putBudget);
router.delete('/:id', budget_1.deleteBudget);
exports.default = router;
//# sourceMappingURL=budget.js.map
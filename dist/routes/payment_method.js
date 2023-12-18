"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_method_1 = require("../controllers/payment_method");
const router = (0, express_1.Router)();
router.get('/', payment_method_1.getMethods);
router.get('/form', payment_method_1.getMethodDataToForm);
router.get('/:id', payment_method_1.getMethod);
router.post('/', payment_method_1.postMethod);
router.put('/:id', payment_method_1.putMethod);
router.delete('/:id', payment_method_1.deleteMethod);
exports.default = router;
//# sourceMappingURL=payment_method.js.map
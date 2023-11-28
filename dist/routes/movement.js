"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movement_1 = require("../controllers/movement");
const router = (0, express_1.Router)();
router.get('/', movement_1.getMovements);
router.get('/:id', movement_1.getMovements);
router.post('/', movement_1.postMovement);
router.delete('/:id', movement_1.deleteMovement);
exports.default = router;
//# sourceMappingURL=movement.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovement = exports.postMovement = exports.getMovement = exports.getMovements = void 0;
const uuid_1 = require("uuid");
const sequelize_1 = require("sequelize");
const utility_1 = require("../utilities/utility");
const movement_1 = __importDefault(require("../models/movement"));
const payment_method_1 = __importDefault(require("../models/payment_method"));
const account_1 = __importDefault(require("../models/account"));
const connection_1 = __importDefault(require("../db/connection"));
const utility = new utility_1.Utility();
const getMovements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movements = yield connection_1.default.query('EXEC SP_GetMovementData', { type: sequelize_1.QueryTypes.SELECT });
        res.json(movements);
    }
    catch (error) {
        utility.errorMessage(error, 'getMovements()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.getMovements = getMovements;
const getMovement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const movement = yield movement_1.default.findByPk(id);
        res.json(movement);
    }
    catch (error) {
        utility.errorMessage(error, 'getMovement()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.getMovement = getMovement;
const postMovement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const payment_method_id = yield payment_method_1.default.findByPk(body.payment_method_id);
        const account_id = yield account_1.default.findByPk(body.account_id);
        if (!payment_method_id) {
            return res.status(400).send({ msg: 'The id does not exist' });
        }
        if (!account_id) {
            return res.status(400).send({ msg: 'The id does not exist' });
        }
        body.movement_id = (0, uuid_1.v4)();
        const movement = movement_1.default.build(body);
        yield movement.save();
        res.json(movement);
    }
    catch (error) {
        utility.errorMessage(error, 'postMovement()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.postMovement = postMovement;
const deleteMovement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const movement = yield movement_1.default.findByPk(id);
        if (movement) {
            yield movement.destroy();
            res.status(200).send({ msg: 'Record deleted successfully' });
        }
        else {
            res.status(404).send({ msg: 'The record does not exist' });
        }
    }
    catch (error) {
        utility.errorMessage(error, 'deleteMovement()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.deleteMovement = deleteMovement;
//# sourceMappingURL=movement.js.map
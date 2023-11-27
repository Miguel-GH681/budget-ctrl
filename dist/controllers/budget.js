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
exports.deleteBudget = exports.putBudget = exports.postBudget = exports.getBudget = exports.getBudgets = void 0;
const uuid_1 = require("uuid");
const budget_1 = __importDefault(require("../models/budget"));
const getBudgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ msg: 'getBudgets method' });
});
exports.getBudgets = getBudgets;
const getBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const budget = yield budget_1.default.findByPk(id);
        res.json(budget);
    }
    catch (error) {
        console.log('Error getBudget(): ' + error);
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.getBudget = getBudget;
const postBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        body.budget_id = (0, uuid_1.v4)();
        const budget = budget_1.default.build(body);
        yield budget.save();
        res.json(budget);
    }
    catch (error) {
        console.log('Error postBudget(): ' + error);
        res.status(500).send({
            msg: 'Server error'
        });
    }
});
exports.postBudget = postBudget;
const putBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    res.send({ msg: 'putBudget method', id, body });
});
exports.putBudget = putBudget;
const deleteBudget = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'deleteBudget method',
        id
    });
};
exports.deleteBudget = deleteBudget;
//# sourceMappingURL=budget.js.map
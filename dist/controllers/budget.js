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
const utility_1 = require("../utilities/utility");
const utility = new utility_1.Utility();
const getBudgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const budgets = yield budget_1.default.findAll();
        res.json(budgets);
    }
    catch (error) {
        utility.errorMessage(error, 'getBudgets()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.getBudgets = getBudgets;
const getBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const budget = yield budget_1.default.findByPk(id);
        return (budget) ? res.json(budget) : res.status(404).send({ msg: 'The record does not exist' });
    }
    catch (error) {
        utility.errorMessage(error, 'getBudget()');
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
        utility.errorMessage(error, 'postBudget()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.postBudget = postBudget;
const putBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const budget = yield budget_1.default.findByPk(id);
        if (budget) {
            yield budget.update(body);
            res.json(budget);
        }
        else {
            res.status(404).send({ msg: 'The record does not exist' });
        }
    }
    catch (error) {
        utility.errorMessage(error, 'putBudget()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.putBudget = putBudget;
const deleteBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const budget = yield budget_1.default.findByPk(id);
        if (budget) {
            yield budget.destroy();
            res.status(200).send({ msg: 'Record deleted successfully' });
        }
        else {
            res.status(404).send({ msg: 'The record does not exist' });
        }
    }
    catch (error) {
        utility.errorMessage(error, 'deleteBudget()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.deleteBudget = deleteBudget;
//# sourceMappingURL=budget.js.map
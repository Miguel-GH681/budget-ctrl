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
exports.deleteBankAccount = exports.putBankAccount = exports.postBankAccount = exports.getBankAccount = exports.getBankAccounts = void 0;
const uuid_1 = require("uuid");
const bank_account_1 = __importDefault(require("../models/bank_account"));
const utility_1 = require("../utilities/utility");
const bank_1 = __importDefault(require("../models/bank"));
const utility = new utility_1.Utility();
const getBankAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bankAccounts = yield bank_account_1.default.findAll();
        res.json(bankAccounts);
    }
    catch (error) {
        utility.errorMessage(error, 'getBankAccounts()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.getBankAccounts = getBankAccounts;
const getBankAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bankAccount = yield bank_account_1.default.findByPk(id);
        if (!bankAccount) {
            return res.status(400).send({ msg: 'The id does not exist' });
        }
        res.json(bankAccount);
    }
    catch (error) {
        utility.errorMessage(error, 'getBankAccount()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.getBankAccount = getBankAccount;
const postBankAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const bankId = yield bank_1.default.findByPk(body.bank_id, { attributes: ['bank_id'] });
        if (!bankId) {
            return res.status(400).send({ msg: 'The id does not exist' });
        }
        body.bank_account_id = (0, uuid_1.v4)();
        const bankAccount = bank_account_1.default.build(body);
        yield bankAccount.save();
        res.json(bankAccount);
    }
    catch (error) {
        utility.errorMessage(error, 'postBankAccount()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.postBankAccount = postBankAccount;
const putBankAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const bankAccount = yield bank_account_1.default.findByPk(id);
        const bankId = yield bank_1.default.findByPk(body.bank_id, { attributes: ['bank_id'] });
        if (!bankAccount) {
            return res.status(404).send({ msg: 'The record does not exist' });
        }
        if (!bankId) {
            return res.status(400).send({ msg: 'The id does not exist' });
        }
        yield bankAccount.update(body);
        res.json(bankAccount);
    }
    catch (error) {
        utility.errorMessage(error, 'putBankAccount()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.putBankAccount = putBankAccount;
const deleteBankAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bankAccount = yield bank_account_1.default.findByPk(id);
        if (bankAccount) {
            yield bankAccount.destroy();
            res.status(200).send({ msg: 'Record deleted successfully' });
        }
        else {
            res.status(404).send({ msg: 'The record does not exist' });
        }
    }
    catch (error) {
        utility.errorMessage(error, 'deleteBankAccount()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.deleteBankAccount = deleteBankAccount;
//# sourceMappingURL=bank_account.js.map
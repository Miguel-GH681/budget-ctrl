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
exports.deleteAccount = exports.putAccount = exports.postAccount = exports.getAccount = exports.getAccounts = void 0;
const uuid_1 = require("uuid");
const account_1 = __importDefault(require("../models/account"));
const budget_1 = __importDefault(require("../models/budget"));
const utility_1 = require("../utilities/utility");
const utility = new utility_1.Utility();
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield account_1.default.findAll();
        res.json(accounts);
    }
    catch (error) {
        utility.errorMessage(error, 'getAccounts()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.getAccounts = getAccounts;
const getAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const account = yield account_1.default.findByPk(id);
        res.json(account);
    }
    catch (error) {
        utility.errorMessage(error, 'getAccount()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.getAccount = getAccount;
const postAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const name = yield account_1.default.findOne({ where: { name: body.name } });
        const budget_id = yield budget_1.default.findOne({ where: { budget_id: body.budget_id } });
        if (name) {
            return res.status(400).send({ msg: 'The name field must be unique' });
        }
        if (!budget_id) {
            return res.status(400).send({ msg: 'The id does not exist' });
        }
        body.account_id = (0, uuid_1.v4)();
        const account = account_1.default.build(body);
        yield account.save();
        res.json(account);
    }
    catch (error) {
        utility.errorMessage(error, 'postAccount()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.postAccount = postAccount;
const putAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const account = yield account_1.default.findByPk(id);
        const budget_id = yield budget_1.default.findOne({ where: { budget_id: body.budget_id } });
        if (!account) {
            return res.status(404).send({ msg: 'The record does not exist' });
        }
        if (body.name == account.dataValues.name) {
            return res.status(400).send({ msg: 'The name field must be unique' });
        }
        if (!budget_id) {
            return res.status(400).send({ msg: 'The id does not exist' });
        }
        yield account.update(body);
        res.json(account);
    }
    catch (error) {
        utility.errorMessage(error, 'putAccount()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.putAccount = putAccount;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const account = yield account_1.default.findByPk(id);
        if (account) {
            yield account.destroy();
            res.status(200).send({ msg: 'Record deleted successfully' });
        }
        else {
            res.status(404).send({ msg: 'The record does not exist' });
        }
    }
    catch (error) {
        utility.errorMessage(error, 'deleteAccount()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.deleteAccount = deleteAccount;
//# sourceMappingURL=account.js.map
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
exports.deleteBank = exports.putBank = exports.postBank = exports.getBank = exports.getBanks = void 0;
const uuid_1 = require("uuid");
const bank_1 = __importDefault(require("../models/bank"));
const utility_1 = require("../utilities/utility");
const utility = new utility_1.Utility();
const getBanks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banks = yield bank_1.default.findAll();
        res.json(banks);
    }
    catch (error) {
        utility.errorMessage(error, 'getBanks()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.getBanks = getBanks;
const getBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bank = yield bank_1.default.findByPk(id);
        if (!bank) {
            return res.status(404).send({ msg: 'The record does not exist' });
        }
        res.json(bank);
    }
    catch (error) {
        utility.errorMessage(error, 'getBank()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.getBank = getBank;
const postBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const name = yield bank_1.default.findOne({ where: { name: body.name } });
        if (name) {
            return res.status(400).send({ msg: 'The name field must be unique' });
        }
        body.bank_id = (0, uuid_1.v4)();
        const bank = bank_1.default.build(body);
        yield bank.save();
        res.json(bank);
    }
    catch (error) {
        utility.errorMessage(error, 'postBank()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.postBank = postBank;
const putBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const bank = yield bank_1.default.findByPk(id);
        if (!bank) {
            return res.status(404).send({ msg: 'The record does not exist' });
        }
        if (body.name == bank.dataValues.name) {
            return res.status(400).send({ msg: 'The name field must be unique' });
        }
        yield bank.update(body);
        res.json(bank);
    }
    catch (error) {
        utility.errorMessage(error, 'putBank()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.putBank = putBank;
const deleteBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bank = yield bank_1.default.findByPk(id);
        if (bank) {
            yield bank.destroy();
            res.status(200).send({ msg: 'Record deleted successfully' });
        }
        else {
            res.status(404).send({ msg: 'The record does not exist' });
        }
    }
    catch (error) {
        utility.errorMessage(error, 'deleteBank()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.deleteBank = deleteBank;
//# sourceMappingURL=bank.js.map
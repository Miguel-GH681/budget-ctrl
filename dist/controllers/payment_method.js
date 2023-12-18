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
exports.deleteMethod = exports.putMethod = exports.postMethod = exports.getMethod = exports.getMethodDataToForm = exports.getMethods = void 0;
const uuid_1 = require("uuid");
const utility_1 = require("../utilities/utility");
const payment_method_1 = __importDefault(require("../models/payment_method"));
const utility = new utility_1.Utility();
const getMethods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const methods = yield payment_method_1.default.findAll();
        res.json(methods);
    }
    catch (error) {
        utility.errorMessage(error, 'getMethods()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.getMethods = getMethods;
const getMethodDataToForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const methods = yield payment_method_1.default.findAll({ attributes: [['payment_method_id', 'option_value'], 'name'] });
        res.json(methods);
    }
    catch (error) {
        utility.errorMessage(error, 'getMethodDataToForm()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.getMethodDataToForm = getMethodDataToForm;
const getMethod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const method = yield payment_method_1.default.findByPk(id);
        return (method) ? res.json(method) : res.status(404).send({ msg: 'The record does not exist' });
    }
    catch (error) {
        utility.errorMessage(error, 'getMethod()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.getMethod = getMethod;
const postMethod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        body.payment_method_id = (0, uuid_1.v4)();
        const method = payment_method_1.default.build(body);
        yield method.save();
        res.json(method);
    }
    catch (error) {
        utility.errorMessage(error, 'postMethod()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.postMethod = postMethod;
const putMethod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const method = yield payment_method_1.default.findByPk(id);
        if (method) {
            yield method.update(body);
            res.json(method);
        }
        else {
            res.status(404).send({ msg: 'The record does not exist' });
        }
    }
    catch (error) {
        utility.errorMessage(error, 'putMethod()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.putMethod = putMethod;
const deleteMethod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const method = yield payment_method_1.default.findByPk(id);
        if (method) {
            yield method.destroy();
            res.status(200).send({ msg: 'Record deleted successfully' });
        }
        else {
            res.status(404).send({ msg: 'The record does not exist' });
        }
    }
    catch (error) {
        utility.errorMessage(error, 'deleteMethod()');
        res.status(500).send({ msg: 'Server error' });
    }
});
exports.deleteMethod = deleteMethod;
//# sourceMappingURL=payment_method.js.map
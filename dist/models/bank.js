"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const bank_account_1 = __importDefault(require("./bank_account"));
const Bank = connection_1.default.define('Bank', {
    bank_id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    }
});
Bank.hasMany(bank_account_1.default, { foreignKey: 'bank_id' });
exports.default = Bank;
//# sourceMappingURL=bank.js.map
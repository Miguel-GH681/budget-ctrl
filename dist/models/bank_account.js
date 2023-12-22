"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const payment_method_1 = __importDefault(require("./payment_method"));
const BankAccount = connection_1.default.define('BankAccount', {
    bank_account_id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    balance: {
        type: sequelize_1.DataTypes.DECIMAL(7, 2)
    },
    is_credit: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    bank_id: {
        type: sequelize_1.DataTypes.UUIDV4,
    }
});
BankAccount.hasMany(payment_method_1.default, { foreignKey: 'bank_account_id' });
exports.default = BankAccount;
//# sourceMappingURL=bank_account.js.map
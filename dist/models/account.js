"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Account = connection_1.default.define('Account', {
    account_id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(7, 2)
    },
    classification: {
        type: sequelize_1.DataTypes.CHAR(1)
    },
    is_variable: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    budget_id: {
        type: sequelize_1.DataTypes.UUIDV4,
    }
});
exports.default = Account;
//# sourceMappingURL=account.js.map
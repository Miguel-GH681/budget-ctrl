"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const account_1 = __importDefault(require("./account"));
const Budget = connection_1.default.define('Budget', {
    budget_id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    initial_date: {
        type: sequelize_1.DataTypes.DATEONLY
    },
    final_date: {
        type: sequelize_1.DataTypes.DATEONLY
    }
});
Budget.hasMany(account_1.default, { foreignKey: 'budget_id' });
exports.default = Budget;
//# sourceMappingURL=budget.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Movement = connection_1.default.define('Movement', {
    movement_id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    observation: {
        type: sequelize_1.DataTypes.STRING
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(7, 2)
    },
    movement_date: {
        type: sequelize_1.DataTypes.DATEONLY
    },
    account_id: {
        type: sequelize_1.DataTypes.UUIDV4,
    },
    payment_method_id: {
        type: sequelize_1.DataTypes.UUIDV4,
    }
});
exports.default = Movement;
//# sourceMappingURL=movement.js.map
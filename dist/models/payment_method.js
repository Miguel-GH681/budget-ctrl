"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const movement_1 = __importDefault(require("./movement"));
const PaymentMethod = connection_1.default.define('PaymentMethod', {
    payment_method_id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    }
});
PaymentMethod.hasMany(movement_1.default, { foreignKey: 'payment_method_id' });
exports.default = PaymentMethod;
//# sourceMappingURL=payment_method.js.map
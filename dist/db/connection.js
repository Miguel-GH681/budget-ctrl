"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('BudgetCtrlDB', 'sa', 'Admin12345', {
    host: 'localhost',
    dialect: 'mssql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});
exports.default = db;
//# sourceMappingURL=connection.js.map
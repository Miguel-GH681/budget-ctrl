import { Sequelize } from "sequelize";

const db = new Sequelize('BudgetCtrlDB', 'sa', 'Admin12345', {
    host: 'localhost',
    dialect: 'mssql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

export default db;
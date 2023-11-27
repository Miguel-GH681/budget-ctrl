import { Sequelize } from "sequelize";

const db = new Sequelize('BudgetCtrlDB', 'sa', 'Admin12345', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            useUTC: false
        }
    },
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

export default db;
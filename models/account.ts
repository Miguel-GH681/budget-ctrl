import { DataTypes } from 'sequelize';

import db from "../db/connection";

const Account = db.define( 'Account', {
    account_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    amount: {
        type: DataTypes.DECIMAL(7,2)
    },
    classification: {
        type: DataTypes.CHAR(1)
    },
    is_variable: {
        type: DataTypes.BOOLEAN
    },
    budget_id: {
        type: DataTypes.UUIDV4,
    }
});

export default Account;
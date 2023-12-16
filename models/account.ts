import { DataTypes } from 'sequelize';

import db from "../db/connection";
import Movement from './movement';

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
    }
});

Account.hasMany(Movement, { foreignKey: 'account_id' });

export default Account;
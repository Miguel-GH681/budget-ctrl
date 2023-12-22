import { DataTypes } from 'sequelize';

import db from "../db/connection";
import PaymentMethod from './payment_method';

const BankAccount = db.define( 'BankAccount', {
    bank_account_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    balance: {
        type: DataTypes.DECIMAL(7,2)
    },
    is_credit: {
        type: DataTypes.BOOLEAN
    },
    bank_id: {
        type: DataTypes.UUIDV4,
    }
});

BankAccount.hasMany(PaymentMethod, { foreignKey: 'bank_account_id'});
export default BankAccount;
import { DataTypes } from 'sequelize';

import db from "../db/connection";
import BankAccount from './bank_account';

const Bank = db.define( 'Bank', {
    bank_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    }    
});


Bank.hasMany(BankAccount, { foreignKey: 'bank_id' });
export default Bank;
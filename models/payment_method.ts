import { DataTypes } from 'sequelize';

import db from "../db/connection";
import Movement from './movement';

const PaymentMethod = db.define( 'PaymentMethod', {
    payment_method_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    bank_account_id: {
        type: DataTypes.UUIDV4,
    },
});

PaymentMethod.hasMany(Movement, { foreignKey: 'payment_method_id' });

export default PaymentMethod;
import { DataTypes } from 'sequelize';

import db from "../db/connection";

const Movement = db.define( 'Movement', {
    movement_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    observation: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.DECIMAL(7,2)
    },
    movement_date: {
        type: DataTypes.DATEONLY
    },
    account_id: {
        type: DataTypes.UUIDV4,
    },
    payment_method_id: {
        type: DataTypes.UUIDV4,
    }
});

export default Movement;
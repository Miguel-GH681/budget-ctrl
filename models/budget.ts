import { DataTypes } from 'sequelize';


import db from "../db/connection";
import Account from './account';

const Budget = db.define( 'Budget', {
    budget_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    initial_date: {
        type: DataTypes.DATEONLY
    },
    final_date: {
        type: DataTypes.DATEONLY
    }
});

Budget.hasMany(Account, { foreignKey: 'budget_id' });

export default Budget;
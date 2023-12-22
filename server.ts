import express, { Application } from 'express';
import cors from 'cors';

import budgetRoutes from './routes/budget';
import accountRoutes from './routes/account';
import paymentMethodRoutes from './routes/payment_method';
import movementRoutes from './routes/movement';
import bankRoutes from './routes/bank';
import bankAccountRountes from './routes/bank_account';
import db from './db/connection';

export class Server{
    
    private app : Application;
    private port : String;
    private paths = {
        budgets : '/api/budgets/',
        accounts : '/api/accounts/',
        payment_methods : '/api/payment-methods/',
        movements: '/api/movements/',
        banks: '/api/banks/',
        bank_account: '/api/bank-accounts/'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8090';

        this.middlewares();
        this.routes();
        this.dbConnection();
    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log(`Server running on ${ this.port }`);
        });
    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json() );
    }

    routes(){
        this.app.use( this.paths.budgets, budgetRoutes);
        this.app.use( this.paths.accounts, accountRoutes);
        this.app.use( this.paths.payment_methods, paymentMethodRoutes);
        this.app.use( this.paths.movements, movementRoutes );
        this.app.use( this.paths.banks, bankRoutes );
        this.app.use( this.paths.bank_account, bankAccountRountes );
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Successful connection');
        } catch (error) {
            throw new Error('Bad connection: ' + error);
        }
    }
}
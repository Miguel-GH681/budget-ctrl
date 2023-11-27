import express, { Application } from 'express';
import cors from 'cors';

import budgetRoutes from './routes/budget';
import db from './db/connection';

export class Server{
    
    private app : Application;
    private port : String;
    private paths = {
        budgets : '/api/budgets/'
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
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { QueryTypes } from "sequelize";

import { Utility } from "../utilities/utility";
import Movement from "../models/movement";
import PaymentMethod from "../models/payment_method";
import Account from "../models/account";
import db from "../db/connection";

const utility = new Utility();

export const getMovements = async ( req : Request, res : Response )=>{
    try {
        const movements = await db.query('EXEC SP_GetMovementData', { type: QueryTypes.SELECT });
        res.json( movements );
    } catch (error) {
        utility.errorMessage( error, 'getMovements()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const getMovement = async ( req : Request, res : Response )=>{

    const { id } = req.params;
    
    try {
        const movement = await Movement.findByPk( id );
        res.json( movement );
    } catch (error) {
        utility.errorMessage( error, 'getMovement()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const postMovement = async ( req : Request, res : Response )=>{
    
    const { body } = req;

    try{
        const payment_method_id = await PaymentMethod.findByPk( body.payment_method_id );
        const account_id = await Account.findByPk( body.account_id );

        if( !payment_method_id ){
            return res.status(400).send({msg: 'The id does not exist'});
        }
        if( !account_id ){
            return res.status(400).send({msg: 'The id does not exist'});
        }

        body.movement_id = uuidv4();
        const movement = Movement.build( body );
        await movement.save();
        res.json( movement );
    } catch(error){
        utility.errorMessage( error, 'postMovement()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const deleteMovement = async ( req : Request, res : Response )=>{
    
    const { id } = req.params;
    
    try {
        const movement = await Movement.findByPk( id );
        
        if( movement ){
            await movement.destroy();
            res.status(200).send({msg: 'Record deleted successfully'});
        } else{
            res.status(404).send({msg: 'The record does not exist'});
        }
    } catch (error) {
        utility.errorMessage( error, 'deleteMovement()' );
        res.status(500).send({ msg: 'Server error' });
    }
}
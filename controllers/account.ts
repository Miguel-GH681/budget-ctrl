import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { QueryTypes } from "sequelize";

import Account from "../models/account";
import Budget from "../models/budget";
import Movement from "../models/movement";

import { Utility } from "../utilities/utility";
import db from "../db/connection";

const utility = new Utility();

export const getAccounts = async ( req : Request, res : Response )=>{
    try {
        const accounts = await db.query('EXEC SP_GetAccountData', { type: QueryTypes.SELECT });
        res.json( accounts );
    } catch (error) {
        utility.errorMessage( error, 'getAccounts()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const getAccountDataToForm = async ( req : Request, res : Response )=>{
    try {
        const accounts = await Account.findAll({ attributes:[['account_id', 'option_value'], 'name'] });
        res.json( accounts );
    } catch (error) {
        utility.errorMessage( error, 'getAccountDataToForm()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const getAccount = async ( req : Request, res : Response )=>{

    const { id } = req.params;
    
    try {
        const account = await Account.findByPk( id, { include: Movement } );

        if(!account){
            return res.status(404).send({msg: 'The record does not exist'});            
        }

        res.json( account );
    } catch (error) {
        utility.errorMessage( error, 'getAccount()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const postAccount = async ( req : Request, res : Response )=>{
    
    const { body } = req;

    try{
        const name = await Account.findOne({ where: { name: body.name } });

        if( name ){
            return res.status(400).send({msg: 'The name field must be unique'});
        }

        body.account_id = uuidv4();
        const account = Account.build( body );
        await account.save();
        res.json( account );
    } catch(error){
        utility.errorMessage( error, 'postAccount()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const putAccount = async ( req : Request, res : Response ) => {
   
    const { id } = req.params;
    const { body } = req;

    try {
        const account = await Account.findByPk( id );

        if ( !account ) {
            return res.status(404).send({msg: 'The record does not exist'});            
        }
        if( body.name == account.dataValues.name ){
            return res.status(400).send({msg: 'The name field must be unique'});
        }

        await account.update( body );
        res.json( account );
    } catch (error) {
        utility.errorMessage( error, 'putAccount()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const deleteAccount = async ( req : Request, res : Response )=>{
    
    const { id } = req.params;
    
    try {
        const account = await Account.findByPk( id );
        
        if( account ){
            await account.destroy();
            res.status(200).send({msg: 'Record deleted successfully'});
        } else{
            res.status(404).send({msg: 'The record does not exist'});
        }
    } catch (error) {
        utility.errorMessage( error, 'deleteAccount()' );
        res.status(500).send({ msg: 'Server error' });
    }
}
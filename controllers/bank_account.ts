import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { QueryTypes } from "sequelize";

import BankAccount from "../models/bank_account";

import { Utility } from "../utilities/utility";
import db from "../db/connection";
import Bank from "../models/bank";

const utility = new Utility();

export const getBankAccounts = async ( req : Request, res : Response )=>{
    try {
        const bankAccounts = await BankAccount.findAll();
        res.json( bankAccounts );
    } catch (error) {
        utility.errorMessage( error, 'getBankAccounts()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const getBankAccount = async ( req : Request, res : Response )=>{

    const { id } = req.params;
    
    try {
        const bankAccount = await BankAccount.findByPk( id );

        if( !bankAccount ){
            return res.status(400).send({msg: 'The id does not exist'});
        }

        res.json( bankAccount );
    } catch (error) {
        utility.errorMessage( error, 'getBankAccount()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const postBankAccount = async ( req : Request, res : Response )=>{
    
    const { body } = req;

    try{
        const bankId = await Bank.findByPk(body.bank_id, {attributes:['bank_id']});

        if( !bankId ){
            return res.status(400).send({msg: 'The id does not exist'});
        }

        body.bank_account_id = uuidv4();
        const bankAccount = BankAccount.build( body );
        await bankAccount.save();
        res.json( bankAccount );
    } catch(error){
        utility.errorMessage( error, 'postBankAccount()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const putBankAccount = async ( req : Request, res : Response ) => {
   
    const { id } = req.params;
    const { body } = req;

    try {
        const bankAccount = await BankAccount.findByPk( id );
        const bankId = await Bank.findByPk( body.bank_id, { attributes: ['bank_id'] } )

        if ( !bankAccount ) {
            return res.status(404).send({msg: 'The record does not exist'});            
        }

        if ( !bankId ){
            return res.status(400).send({msg: 'The id does not exist'});
        }

        await bankAccount.update( body );
        res.json( bankAccount );
    } catch (error) {
        utility.errorMessage( error, 'putBankAccount()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const deleteBankAccount = async ( req : Request, res : Response )=>{
    
    const { id } = req.params;
    
    try {
        const bankAccount = await BankAccount.findByPk( id );
        
        if( bankAccount ){
            await bankAccount.destroy();
            res.status(200).send({msg: 'Record deleted successfully'});
        } else{
            res.status(404).send({msg: 'The record does not exist'});
        }
    } catch (error) {
        utility.errorMessage( error, 'deleteBankAccount()' );
        res.status(500).send({ msg: 'Server error' });
    }
}
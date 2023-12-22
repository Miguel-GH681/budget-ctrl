import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { QueryTypes } from "sequelize";

import Bank from "../models/bank";

import { Utility } from "../utilities/utility";
import db from "../db/connection";

const utility = new Utility();

export const getBanks = async ( req : Request, res : Response )=>{
    try {
        const banks = await Bank.findAll();
        res.json( banks );
    } catch (error) {
        utility.errorMessage( error, 'getBanks()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const getBank = async ( req : Request, res : Response )=>{

    const { id } = req.params;
    
    try {
        const bank = await Bank.findByPk( id );

        if ( !bank ) {
            return res.status(404).send({msg: 'The record does not exist'});            
        }

        res.json( bank );
    } catch (error) {
        utility.errorMessage( error, 'getBank()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const postBank = async ( req : Request, res : Response )=>{
    
    const { body } = req;

    try{
        const name = await Bank.findOne({ where: { name: body.name } });

        if( name ){
            return res.status(400).send({msg: 'The name field must be unique'});
        }

        body.bank_id = uuidv4();
        const bank = Bank.build( body );
        await bank.save();
        res.json( bank );
    } catch(error){
        utility.errorMessage( error, 'postBank()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const putBank = async ( req : Request, res : Response ) => {
   
    const { id } = req.params;
    const { body } = req;

    try {
        const bank = await Bank.findByPk( id );

        if ( !bank ) {
            return res.status(404).send({msg: 'The record does not exist'});            
        }
        if( body.name == bank.dataValues.name ){
            return res.status(400).send({msg: 'The name field must be unique'});
        }

        await bank.update( body );
        res.json( bank );
    } catch (error) {
        utility.errorMessage( error, 'putBank()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const deleteBank = async ( req : Request, res : Response )=>{
    
    const { id } = req.params;
    
    try {
        const bank = await Bank.findByPk( id );
        
        if( bank ){
            await bank.destroy();
            res.status(200).send({msg: 'Record deleted successfully'});
        } else{
            res.status(404).send({msg: 'The record does not exist'});
        }
    } catch (error) {
        utility.errorMessage( error, 'deleteBank()' );
        res.status(500).send({ msg: 'Server error' });
    }
}
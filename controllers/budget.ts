import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import Budget from '../models/budget';
import { Utility } from "../utilities/utility";

const utility = new Utility();

export const getBudgets = async ( req : Request, res : Response )=>{
    try {
        const budgets = await Budget.findAll();
        res.json( budgets )
    } catch (error) {
        utility.errorMessage( error, 'getBudgets()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const getBudget = async ( req : Request, res : Response )=>{

    const { id } = req.params;
    
    try {
        const budget = await Budget.findByPk( id );
        return ( budget ) ? res.json(budget) : res.status(404).send({msg: 'The record does not exist'});
    } catch (error) {
        utility.errorMessage( error, 'getBudget()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const postBudget = async ( req : Request, res : Response )=>{
    
    const { body } = req;

    try{
        body.budget_id = uuidv4();
        const budget = Budget.build( body );
        await budget.save();
        res.json( budget );
    } catch(error){
        utility.errorMessage( error, 'postBudget()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const putBudget = async ( req : Request, res : Response ) => {
   
    const { id } = req.params;
    const { body } = req;

    try {
        const budget = await Budget.findByPk( id );
        if ( budget ) {
            await budget.update( body );
            res.json( budget );   
        } else{
            res.status(404).send({msg: 'The record does not exist'});
        }
    } catch (error) {
        utility.errorMessage( error, 'putBudget()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const deleteBudget = async ( req : Request, res : Response )=>{
    
    const { id } = req.params;
    
    try {
        const budget = await Budget.findByPk( id );
        
        if(budget){
            await budget.destroy();
            res.status(200).send({msg: 'Record deleted successfully'});
        } else{
            res.status(404).send({msg: 'The record does not exist'});
        }
    } catch (error) {
        utility.errorMessage( error, 'deleteBudget()' );
        res.status(500).send({ msg: 'Server error' });
    }
}
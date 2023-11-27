import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import Budget from '../models/budget';

export const getBudgets = async ( req : Request, res : Response )=>{
    res.send({msg: 'getBudgets method'})
}

export const getBudget = async ( req : Request, res : Response )=>{

    const { id } = req.params;
    
    try {
        const budget = await Budget.findByPk( id );
        res.json( budget );
    } catch (error) {
        console.log('Error getBudget(): ' + error);
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
        console.log('Error postBudget(): ' + error);
        res.status(500).send({
            msg: 'Server error'
        });
    }
}

export const putBudget =async ( req : Request, res : Response ) => {
   
    const { id } = req.params;
    const { body } = req;

    res.send({msg: 'putBudget method', id, body});
}

export const deleteBudget = ( req : Request, res : Response )=>{
    const { id } = req.params;
    res.json({
        msg: 'deleteBudget method',
        id
    }) 
}
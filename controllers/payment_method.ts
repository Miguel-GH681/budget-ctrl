import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import { Utility } from "../utilities/utility";
import PaymentMethod from "../models/payment_method";

const utility = new Utility();

export const getMethods = async ( req : Request, res : Response )=>{
    try {
        const methods = await PaymentMethod.findAll();
        res.json( methods )
    } catch (error) {
        utility.errorMessage( error, 'getMethods()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const getMethodDataToForm = async ( req : Request, res : Response )=>{
    try {
        const methods = await PaymentMethod.findAll({ attributes:[['payment_method_id', 'option_value'], 'name'] });
        res.json( methods );
    } catch (error) {
        utility.errorMessage( error, 'getMethodDataToForm()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const getMethod = async ( req : Request, res : Response )=>{

    const { id } = req.params;
    
    try {
        const method = await PaymentMethod.findByPk( id );
        return ( method ) ? res.json(method) : res.status(404).send({msg: 'The record does not exist'});
    } catch (error) {
        utility.errorMessage( error, 'getMethod()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const postMethod = async ( req : Request, res : Response )=>{
    
    const { body } = req;

    try{
        body.payment_method_id = uuidv4();
        const method = PaymentMethod.build( body );
        await method.save();
        res.json( method );
    } catch(error){
        utility.errorMessage( error, 'postMethod()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const putMethod = async ( req : Request, res : Response ) => {
   
    const { id } = req.params;
    const { body } = req;

    try {
        const method = await PaymentMethod.findByPk( id );
        if ( method ) {
            await method.update( body );
            res.json( method );   
        } else{
            res.status(404).send({msg: 'The record does not exist'});
        }
    } catch (error) {
        utility.errorMessage( error, 'putMethod()' );
        res.status(500).send({ msg: 'Server error' });
    }
}

export const deleteMethod = async ( req : Request, res : Response )=>{
    
    const { id } = req.params;
    
    try {
        const method = await PaymentMethod.findByPk( id );
        
        if(method){
            await method.destroy();
            res.status(200).send({msg: 'Record deleted successfully'});
        } else{
            res.status(404).send({msg: 'The record does not exist'});
        }
    } catch (error) {
        utility.errorMessage( error, 'deleteMethod()' );
        res.status(500).send({ msg: 'Server error' });
    }
}
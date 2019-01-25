/* @flow */
import express from "express";
import { createType, readType, updateType, deleteType } from '../schema'
const router = express.Router();


// create type
router.post('/', (req, res) => {
    createType(req.body.data).then((isAdded) => {
        if(isAdded){
            res.status(200).send({status : 'ok'});
        } else {
            res.status(500).send({status : 'error'});
        }
    });
    
});


// get whole schema
router.get('/', (req, res) => {
});


// get type
router.get('/:type', (req, res) => {
    console.log(req.params.type)
    res.status(200).send({status : 'ok'});
});


// update type 
router.get('/', (req, res) => {
});



export default router;
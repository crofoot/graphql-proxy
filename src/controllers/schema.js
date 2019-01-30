/* @flow */
import express from "express";
import { printSchema } from "graphql";
import { schema, createType, readType, updateType, deleteType } from '../schema'
const router = express.Router();


// create type
router.post('/', (req, res) => {
    createType(req.body.data).then((isAdded) => {
        if (isAdded) {
            res.status(200).send({ status: 'ok' });
        } else {
            res.status(500).send({ status: 'error' });
        }
    });

});


// get whole schema
router.get('/', (req, res) => {
    res.status(200).send({
        data: printSchema(schema)
    });
});


// get type and its fields
router.get('/:type', (req, res) => {
    //  console.log(req.params.type)
    res.status(200).send({
        data: readType(req.params.type)
    });
});

router.delete('/:type', (req, res) => {
    // console.log(req.params.type)
    res.status(200).send({
        data: deleteType(req.params.type)
    });
})

// update type 
// router.get('/', (req, res) => {
// });



export default router;
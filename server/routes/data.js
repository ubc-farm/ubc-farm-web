/**
 * Created by Xingyu on 5/26/2017.
 */
const bodyParser = require('body-parser');
const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');

router.use(bodyParser.json());

let Task = require('mongoose').model('Task');
let Field = require('mongoose').model('Field');
let Seed = require('mongoose').model('Seed');
let Transplant = require('mongoose').model('Transplant');
let Fertilizer = require('mongoose').model('Fertilizer');

router.get('/fields', (req, res) => {

    Field.find({}).lean().exec(function (err, fields) {
        if (err) {
            res.send('error retrieveing fields');
        } else {
            res.json({fields});
        }

    });

});

function serverSideValidateField(data){
    //validation
    let errors = {};
    // if(data.name === '')
    //     errors.name = "This field is Required";
    //if valid, create post request
    const isValid = Object.keys(errors).length === 0;

    return {errors, isValid};
}

function serverSideValidateTask(data){
    //validation
    let errors = {};
    if(data.field === '')
        errors.name = "This field is Required";
    //if valid, create post request
    const isValid = Object.keys(errors).length === 0;

    return {errors, isValid};
}

/**
 * ROUTER CODE FOR FIELDS
 */

router.post('/fields', (req, res) => {
    const{errors, isValid} = serverSideValidateField(req.body);
    if(isValid){
        const {name,polygon} = req.body;
        Field.create({name,polygon}, function(err, result){
            if(err){
                res.status(500).json({errors: {global: "mongodb errored while saving"}});
            }else{
                delete result.__v;
                res.status(200).json({field: result});
            }
        });
    }else{
        res.status(400).json({errors});
    }

});

router.delete('/fields/:_id', (req, res) => {
    if(!req.params._id){
        res.status(400).json({errors: {global: "null"}});
    }else {

        Field.findByIdAndRemove(req.params._id, function (err, result) {
            if (err) {
                res.status(500).json({errors: {global: "mongodb errored while deleting"}});
            } else {
                delete result.__v;
                res.status(200).json({});
            }
        });
    }

});

/**
 * ROUTER CODE FOR TASK PAGE
 */
router.get('/tasks', (req, res) => {

    Task.find({}).lean().exec(function (err, tasks) {
        if (err) {
            res.send('error retrieveing tasks');
        } else {
            res.json({tasks});
        }

    });

});

router.post('/tasks', (req, res) => {
    console.log(req.body);
    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        const field = mongoose.Types.ObjectId(req.body.field);
        const{
            type,
            description,
            time,
            multiDay,
            startDate,
            endDate} = req.body;

        Task.create({field,
            type,
            description,
            time,
            multiDay,
            startDate,
            endDate} ,

            function(err, result){
            if(err){
                console.log(err);
                res.status(500).json({errors: {global: "mongodb errored while saving task"}});
            }else{
                delete result.__v;
                res.status(200).json({task: result});
            }
        });
    }else{
        res.status(400).json({errors});
    }

});

router.delete('/tasks/:_id', (req, res) => {
    if(!req.params._id){
        res.status(400).json({errors: {global: "null"}});
    }else {

        Task.findByIdAndRemove(req.params._id, function (err, result) {
            if (err) {
                res.status(500).json({errors: {global: "mongodb errored while deleting"}});
            } else {
                delete result.__v;
                res.status(200).json({});
            }
        });
    }

});

/**
 * ROUTER FOR ACCESSING TASKS FROM FIELD PAGE
 */

router.delete('/fieldtasks/:_id', (req, res) => {
    if(!req.params._id){
        res.status(400).json({errors: {global: "null"}});
    }else {

        Task.findOneAndRemove({'field': req.params._id}, function (err, task) {
            if (err) {
                res.status(500).json({errors: {global: "mongodb errored while deleting"}});
            }

            if(task){
                res.status(200).json({deletedTaskId: task._id});
            }

            else {
                res.status(200).json({});
            }
        });
    }

});

router.get('/fieldtasks/:_id', (req, res) => {
    console.log(req.params._id);
    if(!req.params._id){
        res.status(400).json({errors: {global: "null"}});
    }else {

        Task.find({field: req.params._id}).lean().exec(function (err, tasks) {
            if (err) {
                res.send('error retrieveing tasks');
            } else {
                res.json({tasks});
            }

        });
    }



});

/**
 * ROUTER CODE FOR INVENTORY PAGE
 */

//ROUTES FOR SEEDS
router.get('/seeds', (req, res) => {

    Seed.find({}).lean().exec(function (err, items) {
        if (err) {
            res.send('error retrieveing tasks');
        } else {
            res.json({items});
        }

    });

});

router.post('/seeds', (req, res) => {
    console.log(req.body);
    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        const{
            crop,variety,weight,unit,quantity,product,store,price} = req.body;

        Seed.create({crop,variety,weight,unit,quantity,product,store,price} ,

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "mongodb errored while saving seed"}});
                }else{
                    delete result.__v;
                    res.status(200).json({seed: result});
                }
            });
    }else{
        res.status(400).json({errors});
    }

});

//ROUTES FOR TRANSPLANTS
router.get('/transplants', (req, res) => {

    Transplant.find({}).lean().exec(function (err, items) {
        if (err) {
            res.send('error retrieveing transplants');
        } else {
            res.json({items});
        }

    });

});

router.post('/transplants', (req, res) => {
    console.log(req.body);
    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        const{
            crop,variety,weight,unit,quantity,product,store,price} = req.body;

        Transplant.create({crop,variety,weight,unit,quantity,product,store,price} ,

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "mongodb errored while saving transplant"}});
                }else{
                    delete result.__v;
                    res.status(200).json({transplant: result});
                }
            });
    }else{
        res.status(400).json({errors});
    }

});

//ROUTES FOR FERTILIZERS
router.get('/fertilizers', (req, res) => {

    Fertilizer.find({}).lean().exec(function (err, items) {
        if (err) {
            res.send('error retrieveing fertilizers');
        } else {
            res.json({items});
        }

    });

});

router.post('/fertilizers', (req, res) => {
    console.log(req.body);
    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        const{type,name,rate,ratio,tc,no3,nh4,k2o,p2o5,price,quantity} = req.body;

        Fertilizer.create({type,name,rate,ratio,tc,no3,nh4,k2o,p2o5,price,quantity} ,

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "mongodb errored while saving transplant"}});
                }else{
                    delete result.__v;
                    res.status(200).json({transplant: result});
                }
            });
    }else{
        res.status(400).json({errors});
    }

});

module.exports = router;
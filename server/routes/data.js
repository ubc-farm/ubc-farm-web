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
    if(data.name === '')
        errors.name = "This field is Required";
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

router.get('/inventory', (req, res) => {

    InventoryItem.find({}).lean().exec(function (err, items) {
        if (err) {
            res.send('error retrieveing tasks');
        } else {
            res.json({items});
        }

    });

});

module.exports = router;
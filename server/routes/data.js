/**
 * Created by Xingyu on 5/26/2017.
 */
const bodyParser = require('body-parser');
const express = require('express');
const router = express();
const mongoose = require('mongoose');

router.use(bodyParser.json());

let Task = require('mongoose').model('Task');
let Field = require('mongoose').model('Field');
let User = require('mongoose').model('User');

let seedController = require('../controller/seedController');
let transplantController = require('../controller/transplantController');
let pestController = require('../controller/pestController');
let equipmentController = require('../controller/equipmentController')
let vehicleController = require('../controller/vehicleController');
let fertilzerController = require('../controller/fertilzerController');
let harvestController = require('../controller/harvestController');
let fieldController = require('../controller/fieldController');
let userController = require('../controller/userController');
let taskController = require('../controller/taskController');

router.get('/fields', (req, res) => {
    Field.find({}).lean().exec(function (err, fields) {
        if (err) {
            res.send('error retrieveing fields');
        } else {
            res.json({fields});
        }

    });
});


router.route("/fields")
    // .get(fieldController.getFields)
    .post(fieldController.postFields)
    .put(fieldController.putFields);

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


function deleteObject(obj, id, res){
    if(!id){
        return res.status(400).json({errors: {global: "null"}});
    }else {
        obj.findByIdAndRemove(id, function (err, result) {
            if (err) {
               return res.status(500).json({errors: {global: "mongodb errored while deleting"}});
            } else {
               return res.status(200).json({});
            }
        });
    }
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
    deleteObject(Field, req.params._id, res);
});

/**
 * ROUTER CODE FOR TASK PAGE
 */

router.route('/tasks')
.get(taskController.getTasks)
.post(taskController.postTasks)
.put(taskController.putTasks);

router.delete('/tasks/:_id', (req, res) => {
    deleteObject(Task, req.params._id, res);
});

/**
 * ROUTER FOR ACCESSING TASKS FROM FIELD PAGE
 */

router.delete('/fieldtasks/:_id', (req, res) => {
    deleteObject(Task, req.params._id, res);
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

router.route("/seeds")
    .get(seedController.getSeeds)
    .post(seedController.postSeeds)
    .put(seedController.putSeeds);

router.route("/seeds/:seed_id")
    .delete(seedController.deleteSeed);


//ROUTES FOR TRANSPLANTS
router.route("/transplants")
    .get(transplantController.getTransplants)
    .post(transplantController.postTrasnsplants)
    .put(transplantController.putTransplants);

router.route("/transplants/:transplant_id")
    .delete(transplantController.deleteTransplant);


//ROUTES FOR FERTILIZERS
router.route("/fertilizers")
    .get(fertilzerController.getFertilzers)
    .post(fertilzerController.postFertilzer)
    .put(fertilzerController.putFertilzers);

router.route("/fertilizers/:fertilizer_id")
    .delete(fertilzerController.deleteFertilzer);

//ROUTES FOR PESTICIDES
router.route("/pesticides")
    .get(pestController.getPest)
    .post(pestController.postPests)
    .put(pestController.putPests);


router.route("/seeds/:pest_id")
    .delete(pestController.deletePest);


//ROUTES FOR EQUIPMENTS
router.route("/equipments")
    .get(equipmentController.getEquipment)
    .post(equipmentController.postEquipments)
    .put(equipmentController.putEquipment);


router.route("/equipments/:equipment_id")
    .delete(equipmentController.deleteEquipment);

//ROUTES FOR VEHICLES
router.route("/vehicles")
    .get(vehicleController.getVehicle)
    .post(vehicleController.postVehicle)
    .put(vehicleController.putVehicle);


router.route("/vehicles/:vehicle_id")
    .delete(vehicleController.deleteVehicle);

//ROUTES FOR HARVESTED
router.route("/harvested")
    .get(harvestController.getHarvest)
    .post(harvestController.postHarvest)
    .put(harvestController.putHarvest);


router.route("/harvested/:harvest_id")
    .delete(harvestController.deleteHarvest);


//USERS
router.route("/users")
    .get(userController.getUsers)


module.exports = router;
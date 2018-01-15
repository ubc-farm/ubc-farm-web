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
let Pesticide = require('mongoose').model('Pesticide');
let Equipment = require('mongoose').model('Equipment');
let Vehicle = require('mongoose').model('Vehicle');
let Harvested = require('mongoose').model('Harvested');
let Supplier = require('mongoose').model('Supplier');
let User = require('mongoose').model('User');

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

router.delete('/seeds/:seed_id', (req, res) => {
    deleteObject(Seed, req.params._id, res);
});

router.post('/seeds', (req, res) => {
    console.log(req.body);
    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        const{name, suppliers, log, quantity, unit, crop, variety, weight, product, store, price} = req.body;

        Seed.create({name, suppliers, log, quantity, unit, crop, variety, weight, product, store, price} ,

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


router.put('/seeds', (req, res) => {
    console.log(req.body);

    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        Seed.findByIdAndUpdate(
            req.body.id,
            {
                quantity: req.body.log.value,
                $push: {log:{timestamp: req.body.log.timestamp, value: req.body.log.value}},
                // $set: {suppliers: req.body.suppliers},

            },
            {safe: true, new: true},
            function(err, updatedItem){
                if(err){
                    console.log(err);
                }
                res.json({item: updatedItem});

            }
        );


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
    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        const{
            name, suppliers, log, quantity, unit, crop, variety, weight, product, store, price} = req.body;

        Transplant.create({name, suppliers, log, quantity, unit, crop, variety, weight, product, store, price} ,

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

router.delete('/transplants/:_id', (req,res)=> {
    deleteObject(Transplant, req.params._id, res);
})

router.put('/transplants', (req, res) => {
    console.log(req.body);

    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        Transplant.findByIdAndUpdate(
            req.body.id,
            {
                quantity: req.body.log.value,
                $push: {log:{timestamp: req.body.log.timestamp, value: req.body.log.value}},
                $set: {suppliers: req.body.suppliers},

            },
            {safe: true, new: true},
            function(err, updatedItem){
                if(err){
                    console.log(err);
                }
                res.json({item: updatedItem});

            }
        );


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
        const{suppliers,log,unit,type,name,rate,ratio,tc,no3,nh4,k2o,p2o5,price,quantity} = req.body;

        Fertilizer.create({suppliers,log,unit,type,name,rate,ratio,tc,no3,nh4,k2o,p2o5,price,quantity} ,

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

router.put('/fertilizers', (req, res) => {
    console.log(req.body);

    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        Fertilizer.findByIdAndUpdate(
            req.body.id,
            {
                quantity: req.body.log.value,
                $push: {log:{timestamp: req.body.log.timestamp, value: req.body.log.value}},
                $set: {suppliers: req.body.suppliers},

            },
            {safe: true, new: true},
            function(err, updatedItem){
                if(err){
                    console.log(err);
                }
                res.json({item: updatedItem});

            }
        );


    }else{
        res.status(400).json({errors});
    }

});

router.delete('/fertilizer/:_id', (req, res) => {
    deleteObject(Fertilizer, req.params._id, res);
});

//ROUTES FOR PESTICIDES
router.get('/pesticides', (req, res) => {

    Pesticide.find({}).lean().exec(function (err, items) {
        if (err) {
            res.send('error retrieveing pesticides');
        } else {
            res.json({items});
        }

    });

});

router.post('/pesticides', (req, res) => {
    console.log(req.body);
    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        const{suppliers,log,quantity,unit,type,name,rate,ratio,location,entry,harvest,active,percentage} = req.body;

        Pesticide.create({suppliers,log,quantity,unit,type,name,rate,ratio,location,entry,harvest,active,percentage},

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "mongodb errored while saving pesticide"}});
                }else{
                    delete result.__v;
                    res.status(200).json({pesticide: result});
                }
            });
    }else{
        res.status(400).json({errors});
    }

});

router.delete('/pesticide/:_id', (req, res) => {
    deleteObject(Pesticide, req.params._id, res);
});

router.put('/pesticides', (req, res) => {
    console.log(req.body);

    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        Pesticide.findByIdAndUpdate(
            req.body.id,
            {
                quantity: req.body.log.value,
                $push: {log:{timestamp: req.body.log.timestamp, value: req.body.log.value}},
                $set: {suppliers: req.body.suppliers},

            },
            {safe: true, new: true},
            function(err, updatedItem){
                if(err){
                    console.log(err);
                }
                res.json({item: updatedItem});

            }
        );


    }else{
        res.status(400).json({errors});
    }

});


//ROUTES FOR EQUIPMENTS
router.get('/equipments', (req, res) => {

    Equipment.find({}).lean().exec(function (err, items) {
        if (err) {
            res.send('error retrieving equipments');
        } else {
            res.json({items});
        }

    });

});

router.post('/equipments', (req, res) => {
    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        const{name,quantity,unit,suppliers,log} = req.body;

        Equipment.create({name,quantity,unit,suppliers,log},

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "mongodb errored while saving equipments"}});
                }else{
                    delete result.__v;
                    res.status(200).json({equipment: result});
                }
            });
    }else{
        res.status(400).json({errors});
    }

});

router.put('/equipments', (req, res) => {
    console.log(req.body);

    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        Equipment.findByIdAndUpdate(
            req.body.id,
            {
                quantity: req.body.log.value,
                $push: {log:{timestamp: req.body.log.timestamp, value: req.body.log.value}},
                $set: {suppliers: req.body.suppliers},

            },
            {safe: true, new: true},
            function(err, updatedItem){
                if(err){
                    console.log(err);
                }
                res.json({item: updatedItem});

            }
        );


    }else{
        res.status(400).json({errors});
    }

});

router.delete('/equipments/:_id', (req, res) => {
    deleteObject(Equipment, req.params._id, res);
});

//ROUTES FOR VEHICLES
router.get('/vehicles', (req, res) => {

    Vehicle.find({}).lean().exec(function (err, items) {
        if (err) {
            res.send('error retrieving vehicles');
        } else {
            res.json({items});
        }

    });

});

router.post('/vehicles', (req, res) => {
    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        const{name, suppliers, log, quantity,brand,model,year,price} = req.body;

        Vehicle.create({name, suppliers, log, quantity,brand,model,year,price},

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "mongodb errored while saving vehicle"}});
                }else{
                    delete result.__v;
                    res.status(200).json({vehicle: result});
                }
            });
    }else{
        res.status(400).json({errors});
    }

});

router.put('/vehicles', (req, res) => {
    console.log(req.body);

    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        Vehicle.findByIdAndUpdate(
            req.body.id,
            {
                quantity: req.body.log.value,
                $push: {log:{timestamp: req.body.log.timestamp, value: req.body.log.value}},
                $set: {suppliers: req.body.suppliers},

            },
            {safe: true, new: true},
            function(err, updatedItem){
                if(err){
                    console.log(err);
                }
                res.json({item: updatedItem});

            }
        );


    }else{
        res.status(400).json({errors});
    }
});

router.delete('/vehicles/:_id', (req, res) => {
    deleteObject(Vehicle, req.params._id, res);
});


//ROUTES FOR HARVESTED
router.get('/harvested', (req, res) => {

    Harvested.find({}).lean().exec(function (err, items) {
        if (err) {
            res.send('error retrieving harvested');
        } else {
            res.json({items});
        }

    });

});

router.post('/harvested', (req, res) => {
    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        const{name,suppliers,log,variety,price,quantity,unit} = req.body;

        Harvested.create({name,suppliers,log,variety,price,quantity,unit},

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "mongodb errored while saving harvested"}});
                }else{
                    delete result.__v;
                    res.status(200).json({harvested: result});
                }
            });
    }else{
        res.status(400).json({errors});
    }

});

router.put('/harvested', (req, res) => {
    console.log(req.body);

    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        Harvested.findByIdAndUpdate(
            req.body.id,
            {
                quantity: req.body.log.value,
                $push: {log:{timestamp: req.body.log.timestamp, value: req.body.log.value}},
                $set: {suppliers: req.body.suppliers},

            },
            {safe: true, new: true},
            function(err, updatedItem){
                if(err){
                    console.log(err);
                }
                res.json({item: updatedItem});

            }
        );


    }else{
        res.status(400).json({errors});
    }

});

//ROUTES FOR SUPPLIERS
router.get('/suppliers', (req, res) => {

    Supplier.find({}).lean().exec(function (err, items) {
        if (err) {
            res.send('error retrieving harvested');
        } else {
            res.json({items});
        }

    });

});

router.post('/suppliers', (req, res) => {
    const{errors, isValid} = serverSideValidateTask(req.body);
    if(isValid){
        const{name,address,telephone} = req.body;

        Supplier.create({name,address,telephone},

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "mongodb errored while saving harvested"}});
                }else{
                    delete result.__v;
                    res.status(200).json({supplier: result});
                }
            });
    }else{
        res.status(400).json({errors});
    }

});

//USERS
router.get('/users', (req, res) => {

    User.find({}).lean().exec(function (err, items) {
        if (err) {
            res.send('error retrieving harvested');
        } else {
            res.json({items});
        }

    });

});


module.exports = router;
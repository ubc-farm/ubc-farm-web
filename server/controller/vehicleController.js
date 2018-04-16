let mongoose = require('mongoose');
let Vehicle = require('mongoose').model('Vehicle');
let objectActions = require('./objectController');

async function getVehicle(req, res){

    try{
        let returnObject = await objectActions.getAllObject(Vehicle);
        res.send({items:returnObject});
    }catch(err){
        return res.status(400).json("There was an error retriving vehicles "+err);
    }
}

//will return true if vehicle is valid false otherwise
function isVehicleValid(data){
    let isValid = true;
    let validationRulesLenghtMoreThan0 = ['log','quantity','unit','brand','model','year','price','location'];
    validationRulesLenghtMoreThan0.forEach((rule) =>{
        if(data[rule] && !data[rule].toString().length){
            isValid = isValid && false
        }
    });
    return isValid;
}

function postVehicle(req,res){
    if(isVehicleValid(req.body)){
        const {name, suppliers, log, quantity,brand,model,year,price,location} = req.body;
        debugger
        Vehicle.create({name, suppliers, log, quantity,brand,model,year,price,location} ,

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "There was some error trying to save the vehicle"}});
                }else{
                    delete result.__v;
                    res.status(200).json({vehicle: result});
                }
            });
    }else{
        res.status(400).json("The vehicle information provided is not valid");
    }
}

function putVehicle(req,res){


    if(isVehicleValid(req.body)){
        let timeStamp = req.body.log.timestamp;
        let value = req.body.log.value;
        Vehicle.findByIdAndUpdate(
            req.body.id,
            {
                quantity: req.body.log.value,
                $push: {log:{timestamp: req.body.log.timestamp, 
                    value: req.body.log.value}},
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
}

function deleteVehicle(req,res){
    objectActions.deleteObject(Vehicle, req.params.vehicle_id, res);
}

module.exports = {getVehicle,postVehicle,putVehicle,deleteVehicle}
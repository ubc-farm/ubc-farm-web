let mongoose = require('mongoose');
let Equipment = require('mongoose').model('Equipment');
let objectActions = require('./objectController');

async function getEquipment(req, res){

	try{
		let returnObject = await objectActions.getAllObject(Equipment);
		res.send({items:returnObject});
	}catch(err){
		return res.status(400).json("There was an error retriving Equipment "+err);
	}
}

//will return true if Equipment is valid false otherwise
function isEquipmentValid(data){
	let isValid = true;
    let validationRulesLenghtMoreThan0 = ['name','quantity','unit','log'];

    validationRulesLenghtMoreThan0.forEach((rule) =>{
        if(data[rule] && !data[rule].toString().length){
        	isValid = isValid && false
        }
    });
    return isValid;
}

function postEquipments(req,res){
    if(isEquipmentValid(req.body)){


        const {log,quantity,unit,type,name,rate,ratio,location,entry,harvest,active,percentage} = req.body;
        Equipment.create({log,quantity,unit,type,name,rate,ratio,location,entry,harvest,active,percentage} ,

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "There was some error trying to save the Equipment"}});
                }else{
                    delete result.__v;
                    res.status(200).json({equipment: result});
                }
            });
    }else{
        res.status(400).json("The seed information provided is not valid");
    }
}

function putEquipment(req,res){


    if(isEquipmentValid(req.body)){
        let timeStamp = req.body.log.timestamp;
        let value = req.body.log.value;
        Equipment.findByIdAndUpdate(
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

function deleteEquipment(req,res){
	objectActions.deleteObject(Equipment, req.params.equipment_id, res);
}

module.exports = {getEquipment,postEquipments,putEquipment,deleteEquipment}

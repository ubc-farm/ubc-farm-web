let mongoose = require('mongoose');
let Task = require('mongoose').model('Task');
let objectActions = require('./objectController');

async function getTasks(req, res){

	try{
		let returnObject = await objectActions.getAllObject(Task);
		res.send({tasks:returnObject});
	}catch(err){
		return res.status(400).json("There was an error retriving task "+err);
	}
}

//will return true if harvest is valid false otherwise
function isTaskValid(data){
	let isValid = true;
    let validationRulesLenghtMoreThan0 = ['name','suppliers','log','quantity','unit','variety','price'];
    validationRulesLenghtMoreThan0.forEach((rule) =>{
        if(data[rule] && !data[rule].toString().length){
        	isValid = isValid && false
        }
    });
    return isValid;
}

function postTasks(req,res){
    if(isTaskValid(req.body)){
        const { type,description,time,multiDay,startDate,field,endDate } = req.body;
        Task.create({type,description,time,multiDay,startDate,field,endDate} ,

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "There was some error trying to save the harvest"}});
                }else{
                    delete result.__v;
                    res.status(200).json({task: result});
                }
            });
    }else{
        res.status(400).json("The harvest information provided is not valid");
    }
}

function putTasks(req,res){


    if(isTaskValid(req.body)){
        let timeStamp = req.body.log.timestamp;
        let value = req.body.log.value;
        Task.findByIdAndUpdate(
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

function deleteHarvest(req,res){
	objectActions.deleteObject(Harvest, req.params.harvest_id, res);
}

module.exports = {getTasks,postTasks,putTasks,deleteHarvest}

let mongoose = require('mongoose');
let Harvest = require('mongoose').model('Harvested');
let objectActions = require('./objectController');

async function getHarvest(req, res){

	try{
		let returnObject = await objectActions.getAllObject(Harvest);
		res.send({items:returnObject});
	}catch(err){
		return res.status(400).json("There was an error retriving harvest "+err);
	}
}

//will return true if harvest is valid false otherwise
function isHarvestValid(data){
	let isValid = true;
    let validationRulesLenghtMoreThan0 = ['name','suppliers','log','quantity','unit','variety','price','location'];
    validationRulesLenghtMoreThan0.forEach((rule) =>{
        if(data[rule] && !data[rule].toString().length){
        	isValid = isValid && false
        }
    });
    return isValid;
}

function postHarvest(req,res){
    if(isHarvestValid(req.body)){
        const {name,suppliers,log,variety,price,quantity,unit,location} = req.body;
        Harvest.create({name,suppliers,log,variety,price,quantity,unit,location} ,

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "There was some error trying to save the harvest"}});
                }else{
                    delete result.__v;
                    res.status(200).json({harvest: result});
                }
            });
    }else{
        res.status(400).json("The harvest information provided is not valid");
    }
}

function putHarvest(req,res){


    if(isHarvestValid(req.body)){
        let timeStamp = req.body.log.timestamp;
        let value = req.body.log.value;
        Harvest.findByIdAndUpdate(
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

module.exports = {getHarvest,postHarvest,putHarvest,deleteHarvest}
let mongoose = require('mongoose');
let Transplant = require('mongoose').model('Transplant');
let objectActions = require('./objectController');

async function getTransplants(req, res){

	try{
		let returnObject = await objectActions.getAllObject(Transplant);
		res.send({items:returnObject});
	}catch(err){
		return res.status(400).json("There was an error retriving seeds "+err);
	}
}

//will return true if seed is valid false otherwise
function isTransplantValid(data){
	let isValid = true;
    let validationRulesLenghtMoreThan0 = ['name', 'suppliers', 'log', 'currency', 'quantity', 'unit', 'crop', 'variety', 'weight', 'product', 'store', 'price'];
    validationRulesLenghtMoreThan0.forEach((rule) =>{
        if(data[rule] && !data[rule].toString().length){
        	isValid = isValid && false
        }
    });
    return isValid;
}

function postTrasnsplants(req,res){
    if(isTransplantValid(req.body)){
        const {name, suppliers, log, currency, quantity, unit, crop, variety, weight, product, store, price} = req.body;

        Transplant.create({name, suppliers, currency,log, quantity, unit, crop, variety, weight, product, store, price} ,

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "There was some error trying to save the transplant object"}});
                }else{
                    delete result.__v;
                    res.status(200).json({transplant: result});
                }
            });
    }else{
        res.status(400).json("The seed information provided is not valid");
    }
}

function putTransplants(req,res){


    if(isTransplantValid(req.body)){
        let timeStamp = req.body.log.timestamp;
        let value = req.body.log.value;
        Transplant.findByIdAndUpdate(
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

function deleteTransplant(req,res){
	objectActions.deleteObject(Transplant, req.params.transplant_id, res);
}

module.exports = {getTransplants,postTrasnsplants,putTransplants,deleteTransplant}
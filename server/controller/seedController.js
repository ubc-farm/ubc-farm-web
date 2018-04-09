let mongoose = require('mongoose');
let Seed = require('mongoose').model('Seed');
let objectActions = require('./objectController');

async function getSeeds(req, res){

	try{
		let returnObject = await objectActions.getAllObject(Seed);
		res.send({items:returnObject});
	}catch(err){
		return res.status(400).json("There was an error retriving seeds "+err);
	}
}

//will return true if seed is valid false otherwise
function isSeedValid(data){
	let isValid = true;
    let validationRulesLenghtMoreThan0 = ['name', 'log', 'quantity', 'unit', 'crop', 'variety', 'weight', 'product', 'store', 'price'];
    validationRulesLenghtMoreThan0.forEach((rule) =>{
        if(data[rule] && !data[rule].toString().length){
        	isValid = isValid && false
        }
    });
    return isValid;
}

function postSeeds(req,res){
    if(isSeedValid(req.body)){
        const {name, suppliers, log, quantity, unit, crop, variety, weight, product, store, price, currency} = req.body;
        debugger
        Seed.create({name, suppliers, log, quantity, unit, crop, variety, weight, product, store, price, currency} ,

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "There was some error trying to save the seed"}});
                }else{
                    delete result.__v;
                    res.status(200).json({seed: result});
                }
            });
    }else{
        res.status(400).json("The seed information provided is not valid");
    }
}

function putSeeds(req,res){


    if(isSeedValid(req.body)){
        let timeStamp = req.body.log.timestamp;
        let value = req.body.log.value;
        Seed.findByIdAndUpdate(
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

function deleteSeed(req,res){
	objectActions.deleteObject(Seed, req.params.seed_id, res);
}

module.exports = {getSeeds,postSeeds,putSeeds,deleteSeed}
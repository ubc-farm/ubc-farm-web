let mongoose = require('mongoose');
let Fertilizer = require('mongoose').model('Fertilizer');
let objectActions = require('./objectController');

async function getFertilzers(req, res){

	try{
		let returnObject = await objectActions.getAllObject(Fertilizer);
		res.send({items:returnObject});
	}catch(err){
		return res.status(400).json("There was an error retriving fertilzers "+err);
	}
}

//will return true if fertilzer is valid false otherwise
function isFertilzerValid(data){
	let isValid = true;
    let validationRulesLenghtMoreThan0 = ['name','log','quantity','quantityUnit','unit','type','tc','no3','nh4','k2o','p2o5','price','currency'];
    validationRulesLenghtMoreThan0.forEach((rule) =>{
        if(data[rule] && !data[rule].toString().length){
        	isValid = isValid && false
        }
    });
    return isValid;
}

function postFertilzer(req,res){
    if(isFertilzerValid(req.body)){
        const {suppliers,log,unit,type,name,rate,ratio,tc,no3,nh4,k2o,h2o,p2o5,price,quantity} = req.body;
        Fertilizer.create({suppliers,log,unit,type,name,rate,ratio,tc,no3,nh4,k2o,h2o,p2o5,price,quantity} ,

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "There was some error trying to save the fertilzer"}});
                }else{
                    delete result.__v;
                    res.status(200).json({fertilzers: result});
                }
            });
    }else{
        res.status(400).json("The fertilzer information provided is not valid");
    }
}

function putFertilzers(req,res){


    if(isFertilzerValid(req.body)){
        let timeStamp = req.body.log.timestamp;
        let value = req.body.log.value;
        Fertilizer.findByIdAndUpdate(
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

function deleteFertilzer(req,res){
	objectActions.deleteObject(Fertilizer, req.params.fertilizer_id, res);
}

module.exports = {getFertilzers,postFertilzer,putFertilzers,deleteFertilzer}
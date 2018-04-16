let mongoose = require('mongoose');
let Pest = require('mongoose').model('Pesticide');
let objectActions = require('./objectController');

async function getPest(req, res){

	try{
		let returnObject = await objectActions.getAllObject(Pest);
		res.send({items:returnObject});
	}catch(err){
		return res.status(400).json("There was an error retriving pest "+err);
	}
}

//will return true if pest is valid false otherwise
function isPestValid(data){
	let isValid = true;
    let validationRulesLenghtMoreThan0 = ['name','log','quantity','unit','type','rate','ratio','price','currency','entry','harvest','active','percentage','location'];

    validationRulesLenghtMoreThan0.forEach((rule) =>{
        if(data[rule] && !data[rule].toString().length){
        	isValid = isValid && false
        }
    });
    return isValid;
}

function postPests(req,res){
    if(isPestValid(req.body)){


        const {log,quantity,unit,type,name,rate,ratio,location,entry,harvest,active,percentage,price,currency} = req.body;
        Pest.create({log,quantity,unit,type,name,rate,ratio,location,entry,harvest,active,percentage,price,currency} ,

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "There was some error trying to save the Pest"}});
                }else{
                    delete result.__v;
                    res.status(200).json({pesticide: result});
                }
            });
    }else{
        res.status(400).json("The seed information provided is not valid");
    }
}

function putPests(req,res){


    if(isPestValid(req.body)){
        let timeStamp = req.body.log.timestamp;
        let value = req.body.log.value;
        Pest.findByIdAndUpdate(
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

function deletePest(req,res){
	objectActions.deleteObject(Pest, req.params.pest_id, res);
}

module.exports = {getPest,postPests,putPests,deletePest}

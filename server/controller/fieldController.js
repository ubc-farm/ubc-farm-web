let mongoose = require('mongoose');
let Field = require('mongoose').model('Field');
let objectActions = require('./objectController');

async function getFields(req, res){

	try{
		let returnObject = await objectActions.getAllObject(Field);
		res.send({items:returnObject});
	}catch(err){
		return res.status(400).json("There was an error retriving fields "+err);
	}
}

//will return true if field is valid false otherwise
function isFieldValid(data){
	let isValid = true;
    let validationRulesLenghtMoreThan0 = ['name', 'log', 'quantity', 'unit', 'crop', 'variety', 'weight', 'product', 'store', 'price'];
    validationRulesLenghtMoreThan0.forEach((rule) =>{
        if(data[rule] && !data[rule].toString().length){
        	isValid = isValid && false
        }
    });
    return isValid;
}

function postFields(req,res){
    if(isFieldValid(req.body)){
        const {name,polygon} = req.body;
        Field.create({name,polygon} ,

            function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).json({errors: {global: "There was some error trying to save the field"}});
                }else{
                    delete result.__v;
                    res.status(200).json({field: result});
                }
            });
    }else{
        res.status(400).json("The field information provided is not valid");
    }
}

function putFields(req,res){


    if(isFieldValid(req.body)){
        let timeStamp = req.body.log.timestamp;
        let value = req.body.log.value;
        Field.findByIdAndUpdate(
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

function deleteField(req,res){
	objectActions.deleteObject(Field, req.params.field_id, res);
}

module.exports = {getFields,postFields,putFields,deleteField}
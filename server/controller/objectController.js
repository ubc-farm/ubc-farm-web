
function getAllObject(obj){
        obj.find({}).lean().exec(function (err, fields) {
        if (err) {
            throw err
        } else {
            return fields;
        }

    });
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

function validateObject(data,validationField){
	let isValid = true;
    validationField.forEach((rule) =>{
        if(!data[rule].length){
        	isValid = isValid && false;
        }
    });
    return isValid;
}

/*
	obj: what object do you want to put in
	id:8
*/
function putObject(obj,req,res,validationField){

    const{errors, isValid} = validateObject(req.body,validationField);
    if(isValid){
        let timeStamp = req.body.log.timestamp;
        let value = req.body.log.value;
        obj.findByIdAndUpdate(
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

function getObjectById(obj){
	    obj.find({}).lean().exec(function (err, items) {
        if (err) {
        	throw err
        } else {
            return items;
        }});
}



module.exports = {getAllObject,deleteObject,putObject,getObjectById}
let mongoose = require('mongoose');
let User = require('mongoose').model('User');
let objectActions = require('./objectController');

async function getUsers(req, res){

	try{
		let returnObject = await objectActions.getAllObject(User);
		res.send({items:returnObject});
	}catch(err){
		return res.status(400).json("There was an error retriving fields "+err);
	}
}

module.exports = {getUsers}
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Task = require('mongoose').model('Task');
let Field = require('mongoose').model('Field');
let Seed = require('mongoose').model('Seed');
let Transplant = require('mongoose').model('Transplant');
let Fertilizer = require('mongoose').model('Fertilizer');
let Pesticide = require('mongoose').model('Pesticide');
let Equipment = require('mongoose').model('Equipment');
let Vehicle = require('mongoose').model('Vehicle');
let Harvested = require('mongoose').model('Harvested');
let Supplier = require('mongoose').model('Supplier');


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('/index.js');
let should = chai.should();


//put, post, get, delete

describe('Seed API', () => { 
	let seedURL = '/data/seeds';
	//see how to write mulutple promises or how to purge the databse
    before((done) => { //Before each test we empty the database
        Seed.remove({}, (err) => { 
           done();        
        });     
    });
    it('Shoule be able to able to put seed in DB', function(){
    	chai.request(server)
    	.post(seedURL)
    	.send(
    		{
			"name":"Seed testing",
			"quantity":1,
			"unit":"kg",
			"crop":"Seed for testing",
			"variety":"variety 2",
			"weight":"10",
			"product":"",
			"store":"",
			"price":"10",
			"log":[{"timestamp": Date.now(),"value":1}]
			}).end((err,res)=>{
				res.should.have.status(200);
			});
	//check to see if there is one element in the database and its name is Seed testing
    });

    it('Should not be able to put seeds in DB without all fields', function(){

    });

    it('Should not be able modify a seed that doesnt exist',function(){

    });

    it('Should be able to modify a seed', function(){

    });

    it('Should not delete a seed with a non existing seed id', function(){

    });

    it('Should delete a seed with a valid id',function(){

    });
});



describe('Testing server request for Seed', ()=>{
	console.log("TODO in order: put, get, post, delete");
})



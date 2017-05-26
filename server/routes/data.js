/**
 * Created by Xingyu on 5/26/2017.
 */
const express = require('express');
const router = new express.Router();

var Field = require('mongoose').model('Field');

router.get('/fields', (req, res) => {
    Field.find({}).lean().exec(function(err, fields){
        if(err){
            res.send('error retrieveing fields');
        }else{
            res.json(fields);
        }

    });
});

module.exports = router;
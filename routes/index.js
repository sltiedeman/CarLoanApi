var express = require('express');
var router = express.Router();
//adds mongoose into the project
var mongoose = require('mongoose');
var mongoUrl = 'mongodb://localhost:27017/carlist';
var Car = require('../models/photos');
mongoose.connect(mongoUrl);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//post method for adding car data to the MongoDb 
router.post('/cardata/post', function(req, res, next){
	//creates a new Car schema which is references in models/photo.js

	var car = new Car();
	car.make = req.body.make;
	car.model = req.body.model;
	car.year = req.body.year;
	car.msrp = req.body.msrp;
	car.image = req.body.image;
	car.save(function(err){
		if(err){
			console.log(err);
		}else{
			res.json({message: 'Car added'});
		}
		
	});
});

router.delete('/cardata/delete', function(req, res, next){
	console.log(req.body);
	Car.remove({
		_id: req.body._id
	}, function(err, photo){
		if(err){
			console.log(err);
		}else{
			res.json({message: "Successfully deleted!"});
		}
	});
});

router.put('/cardata/update', function(req, res, next){
	Car.findById(req.body._id, function(err, carResult){
		if(err){
			console.log(err);
		}else{
			carResult.make = req.body.make;
			carResult.model = req.body.model;
			carResult.year = req.body.year;
			carResult.msrp = req.body.msrp;
			carResult.save(function(err){
				if(err){
					console.log(err);
				}else{
					res.json({message: "Photo was updated!"});
				}
			});

		}
	});
})
module.exports = router;

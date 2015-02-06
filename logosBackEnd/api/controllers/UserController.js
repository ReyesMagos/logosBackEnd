/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function  (req, res, next) {
		var user= {
			name: req.param('name'),
			lastname:req.param('lastname'),
			age:req.param('age'),
			idNumber:req.param('idNumber'),
			idType:req.param('idType'),
			password:req.param('password'),
			passwordConfirmation:req.param('passwordConfirmation'),
			email:req.param('email'),
			phone:req.param('phone'),
			mobile:req.param('mobile')
		}

		User.create(user, function userCreated (err, user) {
			if(err){
				//return res.json(err);
				var error= sails.generateErrMessages(err);
				//console.log('hay un error');
				return res.json(err);
			}

			console.log(JSON.stringify(user));
			res.json(user);

		});
	}, index:function  (req, res, next) {

		User.find(function usersFounded (err, users) {
			if(err){
				console.log('error al buscar');
				next(err);
			}
			console.log(JSON.stringify(users));
			res.json(users);


			// body...
		});
		// body...
	}
	
};


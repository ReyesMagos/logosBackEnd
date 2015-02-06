/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: true
        },
        lastname: {
            type: 'string',
            required: true
        },
        age: {
            type: 'string',
            required: true
        },email:{
            type:'email',
            required:true,
            unique:true
        },phone:{
            type:'integer',
            required:true
        }, mobile:{
            type:'integer',
            required:true
        },

        idNumber: {
            type: 'integer',
            required: true
        },
        idType: {
            type: 'string',
            enum: ['cedula', 'pasaporte'],
            required: true
        },
        password: {
            type: 'string',
            required: true
        },passwordConfirmation:{
            type: 'string',
            required: true
        }, encryptedPassword:{
            type:'string'
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.passwordConfirmation;
            delete obj._csrf;
            delete obj.encryptedPassword;
            return obj;
        }
        
    },
    beforeCreate: function(values, next) {
        var password = values.password;
        var passwordConfirmation = values.passwordConfirmation;
        if (!password || !passwordConfirmation || password != values.passwordConfirmation) {
            var passwordDoesNotMatchError = [{
                name: 'passwordDoesNotMatch',
                message: 'Las Contraseñas deben Coincidir'
            }]
            return next({
                err: passwordDoesNotMatchError
            });
        }

        require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
            // body...
            values.encryptedPassword = encryptedPassword;
            next();
        });
    }
};
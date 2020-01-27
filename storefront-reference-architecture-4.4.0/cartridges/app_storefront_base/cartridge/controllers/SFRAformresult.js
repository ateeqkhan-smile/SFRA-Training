/**
 * Handles the simple form rendered by the SFRAForm.js controller.
 * 
 */

'use strict';
var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var cache = require('*/cartridge/scripts/middleware/cache');
var Transaction = require('dw/system/Transaction');

server.post('Show', cache.applyDefaultCache, function(req, res, next) {
 var subscription = {
		  firstName : req.form.firstName,//created javascript object and assigned form value to it.
		  lastName : req.form.lastName,
		  email : req.form.email
  }
  var customObjectMgr = require('dw/object/CustomObjectMgr');//import customObjectMgr.
  Transaction.wrap(function () {//Transaction function is used for database related operations
  try {
	  var obj = customObjectMgr.createCustomObject("NewsletterSubscription", subscription.email);//created new custom object using email as key.
	  obj.custom.firstName = subscription.firstName;
	  obj.custom.lastName = subscription.lastName;
	  res.render('trainingTemplate/SFRATemplate1', {
		  email: subscription.email
	    });
  } catch(e) {
	res.render('trainingTemplate/errorPage', {
		error : "Please enter unique key either you have existing subscriber or someone else is using this emailId : " + subscription.email
	})//if key is matching it will through error.
}
  
 });
 
 
   next();//notifies middleware chain that it can move to the next step or terminate if this is the last step.
  });

module.exports = server.exports();


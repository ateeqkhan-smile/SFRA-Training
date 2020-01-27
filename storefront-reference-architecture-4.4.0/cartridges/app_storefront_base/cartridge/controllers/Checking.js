
'use strict';


var server = require('server');    
var cache = require('*/cartridge/scripts/middleware/cache');
var URLUtils = require('dw/web/URLUtils');
var Transaction = require('dw/system/Transaction');
server.get('Show', cache.applyDefaultCache, function (req, res, next) { 
	
	var actionUrl = URLUtils.url('Checking-Check');//action url when form is submitted.
	var SFRAform = server.forms.getForm('unsubscribe'); //getting form data object using form definition.
	SFRAform.clear();//clear form data initially when form is loaded
	res.render('trainingTemplate/Unsubscribe', {
	       actionUrl: actionUrl,
	       SFRAhelloform: SFRAform,
	       buttonName: "Check",//dynamically giving button Name
	       Details: 0,
	      
	   });

// this function will render checking email template for unsubscribing the Newsletter Subscription
	 next();    
});


server.post('Check', cache.applyDefaultCache, function (req, res, next) { 
	
	var actionUrl = URLUtils.url('Checking-Check');
	var SFRAform = server.forms.getForm('unsubscribe'); 
	//SFRAform.clear();
	var email = req.form.email;
	var editingUrl = URLUtils.url('Checking-Update','pid' , email);
	var customObject = require('dw/object/CustomObjectMgr').getCustomObject("NewsletterSubscription", email);
	if(customObject != null){
		
		res.render('trainingTemplate/Unsubscribe', {
		       actionUrl: actionUrl,
		       SFRAhelloform: SFRAform,
		       buttonName: "Check",
		       Details: 1,
		       firstName: customObject.custom.firstName,
		       lastName:customObject.custom.lastName,
		       editingUrl: editingUrl
		   });
	}
	else {
		res.print("the email is not registered with us " +email);
	}
	 next(); //notifies middleware chain that it can move to the next step or terminate if this is the last step.   
});




















module.exports = server.exports();
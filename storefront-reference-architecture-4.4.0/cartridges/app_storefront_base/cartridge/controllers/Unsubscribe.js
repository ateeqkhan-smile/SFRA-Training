
'use strict';


var server = require('server');    
var cache = require('*/cartridge/scripts/middleware/cache');
var URLUtils = require('dw/web/URLUtils');
var Transaction = require('dw/system/Transaction');
server.get('Show', cache.applyDefaultCache, function (req, res, next) { 
	
	var actionUrl = URLUtils.url('Unsubscribe-Check');//action url when form is submitted.
	var SFRAform = server.forms.getForm('unsubscribe'); //getting form object using form definition.
	SFRAform.clear();//cleared form data when initially form is loaded
	
	res.render('trainingTemplate/Unsubscribe', {//rendering Unsubscribe template
	       actionUrl: actionUrl,
	       SFRAhelloform: SFRAform,
	       buttonName: "Unsubscribe"
	   });
	next(); //notifies middleware chain that it can move to the next step or terminate if this is the last step.   
});//this function will show the unsubscribe template.


server.post('Check', cache.applyDefaultCache, function (req, res, next) {
	
	var email = req.form.email;//get form info email.
	var customObject//creating custom object variable.
	var customObjectMgr = require('dw/object/CustomObjectMgr');//importing custom object mgr
	Transaction.wrap(function () {
	   try {
		   customObject = customObjectMgr.getCustomObject("NewsletterSubscription", email);
		   var abc = customObjectMgr.remove(customObject);
		   res.render('trainingTemplate/unsubscribedmessage', {
			    email: email,
			    
			   
			});
	    } catch(e) {
	    	res.render('trainingTemplate/errorPage', {
	    		error : "Please enter unique key either you have existing subscriber or someone else is using this emailId : " +email
	    	})
	          }
	})
		
	 next(); //notifies middleware chain that it can move to the next step or terminate if this is the last step.
});


module.exports = server.exports();
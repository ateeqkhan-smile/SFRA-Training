/**
* Description of the Controller and the logic it provides
*
* @module  controllers/NewsletterSubscription
*/

'use strict';


var server = require('server');    
var cache = require('*/cartridge/scripts/middleware/cache');
var URLUtils = require('dw/web/URLUtils');
server.get('Show', cache.applyDefaultCache, function (req, res, next) { 
	
	var actionUrl = URLUtils.url('SFRAformresult-Show');//action url when form is submitted.
	var SFRAform = server.forms.getForm('newsLetterSubscription'); //created form object using form definition to manipulate form data.
	SFRAform.clear();//it will clear form data initially when loaded.
	SFRAform.email.value = "";
	SFRAform.firstName.value = "";
	SFRAform.lastName.value = "";
	res.render('trainingTemplate/NewsletterSubscription', {//rendering form template with variable associate with it.
	       actionUrl: actionUrl,
	       SFRAHelloForm: SFRAform
	   });
	 
    next();           
});

module.exports = server.exports();
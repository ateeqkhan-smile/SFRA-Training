'use strict';

var server = require('server');

var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');


server.get('bask', function(req, res, next) {
	

	
	
	var Site = require('dw/system/Site');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');
    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);
   
   
    next();//notifies middleware chain that it can move to the next step or terminate if this is the last step.
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();
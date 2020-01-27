/**
* Description of the Controller and the logic it provides
*
* @module  controllers/jvartest
*/

'use strict';

// HINT: do not put all require statements at the top of the file
// unless you really need them for all functions

/**
* Description of the function
*
* @return {String} The string 'myFunction'
*/
// var myFunction = function(){
//     return 'myFunction';
// }

/* Exports of the controller */
///**
// * @see {@link module:controllers/jvartest~myFunction} */
//exports.MyFunction = myFunction;
var server = require('server');
var isml = require('dw/template/ISML');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
server.get('app', function(req, res, next){
	
	var Site = require('dw/system/Site');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);
    res.render('/trainingTemplate/ISMLtest', {
    	Message: "atul is a good boy"
    });
    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();

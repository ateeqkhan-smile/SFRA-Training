
'use strict';

var server = require('server');    //the server module is used by all controllers
var cache = require('*/cartridge/scripts/middleware/cache');

server.get('Show', cache.applyDefaultCache, function (req, res, next) { 
	
	var product = require('dw/catalog/ProductMgr').getProduct(req.querystring.pid);
	var priceModel = product.getPriceModel();
	var listPrice1	= parseInt(priceModel.getPriceBookPrice(priceModel.getPriceInfo().getPriceBook().getParentPriceBook().getID()).toString().replace("USD", ""));
	var salesPrice = parseInt(priceModel.getPrice().toString().replace("USD", "")) ;
	var discountPercentage = Math.round(((listPrice1 - salesPrice) / listPrice1) * 100);

	if(product === null){
		   res.render('/trainingTemplate/productnotfound', {message: "product not found "+req.querystring.pid}); 
	   }
	   else{
	   res.render('/trainingTemplate/productfound', { myProduct: product, price: salesPrice, pp: listPrice1, tet: discountPercentage });
	  }	
    next();           
});

module.exports = server.exports();

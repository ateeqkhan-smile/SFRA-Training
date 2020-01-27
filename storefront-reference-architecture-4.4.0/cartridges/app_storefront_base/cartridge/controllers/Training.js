

'use strict';

var server = require('server');    //the server module is used by all controllers
var cache = require('*/cartridge/scripts/middleware/cache');

server.get('Show', cache.applyDefaultCache, function (req, res, next) {  //registers the Show route for the Home module
   
	 var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
	    var showProductPageHelperResult = productHelper.showProductPage(req.querystring, req.pageMetaData);
	    var productType = showProductPageHelperResult.product.productType;
	    
		var priceModel = require('dw/catalog/ProductMgr').getProduct( req.querystring.pid ).getPriceModel();//getting product model
		var listPrice = parseInt( priceModel.getPriceBookPrice( priceModel.getPriceInfo().getPriceBook().getParentPriceBook().getID() ).toString().replace( "USD", "" ) );
		var salesPrice = parseInt( priceModel.getPrice().toString().replace( "USD", "" )) ;
		var discountPercentage = Math.round((( listPrice - salesPrice ) / listPrice ) * 100 );
	    
	    if (!showProductPageHelperResult.product.online && productType !== 'set' && productType !== 'bundle') {
	        res.setStatusCode(404);
	        res.render('error/notFound');
	    } else {
	        res.render(showProductPageHelperResult.template, {
	            product: showProductPageHelperResult.product,
	            addToCartUrl: showProductPageHelperResult.addToCartUrl,
	            resources: showProductPageHelperResult.resources,
	            breadcrumbs: showProductPageHelperResult.breadcrumbs,
	            canonicalUrl: showProductPageHelperResult.canonicalUrl,
	            schemaData: showProductPageHelperResult.schemaData,
	            Discount: discountPercentage
	        });
	    }
	
	
    next();            //notifies middleware chain that it can move to the next step or terminate if this is the last step.
});
// the above function will show product details with percentage discount between lsit price and salesprice.
module.exports = server.exports();

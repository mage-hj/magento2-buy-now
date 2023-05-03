/**
 * DISCLAIMER
 *
 * If you want to upgrade this module to later versions in the future, 
 * do not add or alter this file.
 * @category  Techsevin
 * @package   Techsevin\BuyNow
 * @author     Techsevin Solution LLP<mounish@techsevin.com>
 * @copyright 2023 Techsevin Solution
 */
define([
    'jquery'
], function ($) {
    "use strict";
    return function (config, element) {
        $(element).click(function () {
            var form = $(config.form);
            var baseUrl = form.attr('action');
            var buynowUrl='';
            if(baseUrl.includes('checkout')){
                buynowUrl = baseUrl.replace('checkout/cart/add', 'buynow/cart/add');
            }
            if(baseUrl.includes('wishlist')){
                buynowUrl = baseUrl.replace('wishlist/index/cart', 'buynow/index/cart');
            }
            if(buynowUrl){
                form.attr('action', buynowUrl);
            }
            form.trigger('submit');
            form.attr('action', baseUrl);
            return false;
        });
    }
});

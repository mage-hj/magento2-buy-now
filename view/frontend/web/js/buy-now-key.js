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
define(
    ['jquery'], function ($) {
    "use strict";
    return function () {
        $(document).ready(function() {
            $('.product-item-actions .actions-primary').css({"display": "inline-block", "margin-bottom": "10px"});
        });
    }
});
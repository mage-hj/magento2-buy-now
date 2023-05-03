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
var config = {
    config: {
        mixins: {
            'Magento_Catalog/js/catalog-add-to-cart': {
                'Techsevin_BuyNow/js/catalog-add-to-cart-mixin': true
            },
        }
    }
};
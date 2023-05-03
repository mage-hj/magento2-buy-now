<?php

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

namespace Techsevin\BuyNow\Block\CatalogWidget\Product;
/**
 * Class Add
 * @package Techsevin\BuyNow\Block\CatalogWidget\Product
 */
class ProductsList extends \Magento\CatalogWidget\Block\Product\ProductsList {

    /**
     * extend set template of grid.phtml file from productList
     *
     * @return \Magento\CatalogWidget\Block\Product\ProductsList
     *
     */
    protected $helper;
    protected $_scopeConfig;
    protected function _construct(
    )
    {
        $this->setTemplate('Techsevin_BuyNow::product/widget/content/grid.phtml');
        
    }
   
}
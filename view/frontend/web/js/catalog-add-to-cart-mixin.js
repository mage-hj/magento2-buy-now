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
    'jquery',
    'mage/translate',
    'underscore',
    'Magento_Catalog/js/product/view/product-ids-resolver'
], function ($, $t, _, idsResolver) {
    'use strict';

    return function (widget) {

    $.widget('mage.catalogAddToCart', widget, {

        /**
         * @param {jQuery} form
         */
        ajaxSubmit: function (form) {
            var self = this,
                productIds = idsResolver(form),
                formData;

            var formAction = form.attr('action');
            
            if(!formAction.includes("buynow")){
                $(self.options.minicartSelector).trigger('contentLoading');
                self.disableAddToCartButton(form);
            }
            
            formData = new FormData(form[0]);

            $.ajax({
                url: formAction,
                data: formData,
                type: 'post',
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                
                /** @inheritdoc */
                beforeSend: function () {
                    if(formAction.includes("buynow")){
                        $("body").trigger('processStart');
                    }
                    if (self.isLoaderEnabled()) {
                        $('body').trigger(self.options.processStart);
                    }
                },

                /** @inheritdoc */
                success: function (res) {
                    var eventData, parameters;

                    $(document).trigger('ajax:addToCart', {
                        'sku': form.data().productSku,
                        'productIds': productIds,
                        'form': form,
                        'response': res
                    });

                    if(formAction.includes("buynow")){
                        $("body").trigger('processStop');
                    }

                    if (self.isLoaderEnabled()) {
                        $('body').trigger(self.options.processStop);
                    }

                    if (res.backUrl) {

                        if(!formAction.includes("buynow")){
                            eventData = {
                                'form': form,
                                'redirectParameters': []
                            };
                            // initiate a global event, allowing other modules to modify the redirect url with additional parameters
                            $('body').trigger('catalogCategoryAddToCartRedirect', eventData);

                            if (eventData.redirectParameters.length > 0) {
                                parameters = res.backUrl.split('#');
                                parameters.push(eventData.redirectParameters.join('&'));
                                res.backUrl = parameters.join('#');
                            }
                        }

                        self._redirect(res.backUrl);

                        return;
                    }

                    if (res.messages) {
                        $(self.options.messagesSelector).html(res.messages);
                    }

                    if (res.minicart) {
                        $(self.options.minicartSelector).replaceWith(res.minicart);
                        $(self.options.minicartSelector).trigger('contentUpdated');
                    }

                    if (res.product && res.product.statusText) {
                        $(self.options.productStatusSelector)
                            .removeClass('available')
                            .addClass('unavailable')
                            .find('span')
                            .html(res.product.statusText);
                    }
                    self.enableAddToCartButton(form);
                },

                /** @inheritdoc */
                error: function (res) {
                    $(document).trigger('ajax:addToCart:error', {
                        'sku': form.data().productSku,
                        'productIds': productIds,
                        'form': form,
                        'response': res
                    });
                },

                /** @inheritdoc */
                complete: function (res) {
                    if (res.state() === 'rejected') {
                        location.reload();
                    }
                }
            });
        }
    });

    return $.mage.catalogAddToCart;
  }
});
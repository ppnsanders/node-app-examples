'use strict';
angular.module('frontEndApp').service('apiModel', function($http, $cookies, $location, $window, $timeout) {

    function createPayment() {
        var reqUrl = '/api/createPayment';
        var config = {
            'xsrfHeaderName': 'X-CSRF-TOKEN',
            'xsrfCookieName': 'XSRF-TOKEN'
        };
        return $http.post(reqUrl, model.pmtData, config).
            success(function (response) {
                console.log('in model.createPayment.http.post');
                console.log(response);
                model.createPaymentResponse = response;
                console.log(model.createPaymentResponse);
                return response;
            }).
            error(function (response) {
                $timeout(function() {
                    $('#errorMsg').slideDown('slow');
                }, 2000);
                model.errorMsg = response;
                console.log('createPayment ERROR');
                console.log(response);
                return response;
            });
    }

    function getPaymentDetails() {
        $('#loading').slideDown();
        var reqUrl = '/api/getPaymentDetails';
        var config = {
            'xsrfHeaderName': 'X-CSRF-TOKEN',
            'xsrfCookieName': 'XSRF-TOKEN'
        };
        return $http.post(reqUrl, model.queryParams, config).
            success(function (response) {
                model.paymentDetails = response;
                $timeout(function() {
                    $('#loading').hide();
                    $('#confirmOrder').slideDown('slow');
                }, 2000);
                console.log('this one: ', model.paymentDetails);
            }).
            error(function (response) {
                $timeout(function() {
                    $('#loading').hide();
                    $('#errorMsg').slideDown('slow');
                }, 2000);
                model.errorMsg = response;
                console.log('getPaymentDetails ERROR');
                console.log(response);
            });
    }

    function executePayment() {
        $('#executePaymentButton').prop("disabled", true);
        $('#confirmOrder').hide();
        $('#loading').slideDown();
        var reqUrl = '/api/executePayment';
        var config = {
            'xsrfHeaderName': 'X-CSRF-TOKEN',
            'xsrfCookieName': 'XSRF-TOKEN'
        };
        return $http.post(reqUrl, model.paymentDetails, config).
            success(function (response) {
                model.completePaymentDetails = response;
                $timeout(function() {
                    $('#loading').hide();
                    $('#orderReceipt').slideDown('slow');
                }, 2000);
            }).
            error(function (response) {
                $timeout(function() {
                    $('#loading').hide();
                    $('#errorMsg').slideDown('slow');
                }, 2000);
                model.errorMsg = response;
                console.log('executePayment ERROR');
                console.log(response);
            });
    }

    var model = {
        pmtData: {
            "intent":"sale",
            "redirect_urls":
                {
                    "return_url":"http://localhost:8000/return/#",
                    "cancel_url":"http://localhost:8000/cancel/#"
                },
            "payer":
                {
                    "payment_method":"paypal"
                },
            "transactions":[
                {
                    "amount":
                    {
                        "total":"22.00",
                        "currency":"USD",
                        "details":
                            {
                                "shipping":"2.00",
                                "subtotal":"20.00",
                                "tax":"0.00",
                                "handling_fee":"0.00",
                                "insurance":"0.00",
                                "shipping_discount":"0.00"
                            }
                    },
                    "description":"My Payment Description",
                    "invoice_number": "ABCDEFGHIJK" + Date.now(),
                    "item_list":
                    {
                        "items":
                        [
                            {
                                "quantity":"2",
                                "name":"Item 0 Name",
                                "price":"7.00",
                                "currency":"USD",
                                "sku":"ABCDEFGHIJKL987654321",
                                "description":"Item 0 Description",
                                "tax":"0.00"
                            },
                            {
                                "quantity":"1",
                                "name":"Item 1 Name",
                                "price":"2.00",
                                "currency":"USD",
                                "sku":"ABCDEFGHIJKL987654322",
                                "description":"Item 1 Description",
                                "tax":"0.00"
                            },
                            {
                                "quantity":"1",
                                "name":"Item 2 Name",
                                "price":"2.00",
                                "currency":"USD",
                                "sku":"ABCDEFGHIJKL987654323",
                                "description":"Item 2 Description",
                                "tax":"0.00"
                            },
                            {
                                "quantity":"1",
                                "name":"Item 3 Name",
                                "price":"2.00",
                                "currency":"USD",
                                "sku":"ABCDEFGHIJKL987654324",
                                "description":"Item 3 Description",
                                "tax":"0.00"
                            }
                        ]
                    }
                }
            ]
        },
        createPaymentResponse: {},
        queryParams: {},
        paymentDetails: {},
        paymentMethod: 'PayPal',
        errorMsg: {},
        completePaymentDetails: {},
        createPayment: function (model) {
            return createPayment(model);
        },
        getPaymentDetails: function (model) {
            return getPaymentDetails(model);
        },
        executePayment: function (model) {
            return executePayment(model);
        }
    };

return model;

});
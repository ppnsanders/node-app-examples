'use strict';
angular.module('frontEndApp').service('apiModel', function($http, $cookies, $location, $window, $timeout) {

    function createPayment() {
        var reqUrl = '/api/createPayment';
        var config = {
            'xsrfHeaderName': 'X-CSRF-TOKEN',
            'xsrfCookieName': 'XSRF-TOKEN'
        };
        return $http.post(reqUrl, model.pmtData, config).
            then(function (response) {
                model.createPaymentResponse = response;
                console.log(model.createPaymentResponse);
                return model.createPaymentResponse
            });
    }

    function getPaymentDetails() {
        var reqUrl = '/api/getPaymentDetails';
        var config = {
            'xsrfHeaderName': 'X-CSRF-TOKEN',
            'xsrfCookieName': 'XSRF-TOKEN'
        };
        return $http.post(reqUrl, model.queryParams, config).
            then(function (response) {
                model.paymentDetails = response;
                console.log(model.paymentDetails);
            });
    }

    function executePayment() {
        var reqUrl = '/api/executePayment';
        var config = {
            'xsrfHeaderName': 'X-CSRF-TOKEN',
            'xsrfCookieName': 'XSRF-TOKEN'
        };
        return $http.post(reqUrl, model.paymentDetails.data, config).
            then(function (response) {
                model.completePaymentDetails = response;
                model.executePaymentButton = false;
                console.log(model.completePaymentDetails);
            });
    }

    var model = {
        pmtData: {
            intent:'sale',
            redirect_urls:{
                return_url:'http://localhost:8000/return',
                cancel_url:'http://localhost:8000/cancel'
            },
            payer:{
                payment_method:'paypal'
            },
            transactions:[{
                amount:{
                    total:'7.47',
                    currency:'USD'
                },
                description:'This is the payment transaction description.'
            }]
        },
        createPaymentResponse: {},
        queryParams: {},
        paymentDetails: {},
        executePaymentButton: true,
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
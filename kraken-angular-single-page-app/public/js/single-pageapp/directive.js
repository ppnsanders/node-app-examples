'use strict';
angular.module('frontEndApp').directive('singlePageapp', [function() {
    return {
        restrict: 'E',
        scope: {},
        controller: ['$scope', 'angularLoad', '$location', '$timeout', 'apiModel', function($scope, angularLoad, $location, $timeout, apiModel) {
            $scope.model = apiModel;
            $('#loading').slideDown();
            $timeout(function() {
                $('#loading').hide();
                $('#cartContents').slideDown('slow');
            }, 2000);

            function doCheckout() {
                paypal.checkout.initXO();
                var createPayment = $scope.model.createPayment();
                createPayment.success(function (response) {
                    console.log('createPayment Success: ', response);
                    paypal.checkout.startFlow(response.token);
                });
                createPayment.error(function (err) {
                    console.error('createPayment ERROR ', err);
                    paypal.checkout.closeFlow();
                });
            }

            function doCancel(querystring) {
                $('body').removeClass(); //added due to in-context callbacks bug with keeping the PayPal class on the body.
                $('#cartContents').hide();
                $('#loading').slideDown();
                $timeout(function() {
                    $('#loading').hide();
                    $('#cancelMsg').slideDown('slow');
                }, 2000);
            }

            function doReturn(querystring) {
                $('body').removeClass(); //added due to in-context callbacks bug with keeping the PayPal class on the body.
                var tmpAr = [];
                //remove the hash and ? from the string.
                var qs = querystring.substr(2);
                var queryParamsAr = qs.split('&'); 
                queryParamsAr.forEach(function (result) {
                    var resultAr = result.split('=');
                    tmpAr[resultAr[0]] = resultAr[1];
                });
                $scope.model.queryParams = {
                                                paymentId: tmpAr['paymentId'],
                                                PayerID: tmpAr['PayerID'],
                                                token: tmpAr['token']
                                            };
                console.log('queryParams: ', $scope.model.queryParams);
                $scope.model.getPaymentDetails();
                
                $('#cartContents').hide();
                $('#loading').slideDown();
                $timeout(function() {
                    $('#loading').hide();
                    $('#confirmOrder').slideDown('slow');
                }, 2000);
            }

            angularLoad.loadScript('https://www.paypalobjects.com/api/checkout.js').then(function() {
                paypal.checkout.setup("MFUX86KBB6EM2", {
                    environment: 'sandbox',
                    async: true,
                    buttons: [
                        {
                            container: 'paypalForm',
                            type: 'checkout',
                            shape: 'rect',
                            size: 'small',
                            color: 'blue',
                            click: doCheckout
                        }
                    ]
                });
                paypal.checkout.events.on('success', function (token) { 
                    console.log('success, token: ', token);
                });
                paypal.checkout.events.on('failure', function (error) { console.error('error! ', error)});
                paypal.checkout.events.on('return', function (url) { 
                    console.log('return url: ', url);
                    //solution for URL Parsing: https://gist.github.com/jlong/2428561
                    var parser = document.createElement('a');
                    parser.href = url.returnUrl;
                    if(parser.pathname === '/cancel/') {
                        doCancel(parser.hash);
                    } else if(parser.pathname === '/return/') {
                        doReturn(parser.hash);
                    } else {
                        doCancel(parser.hash);
                    }
                });
            }).catch(function (error) {
                console.log('ERROR: When Rendering Checkout with PayPal Button - ');
                console.log(error);
            });
        }],
        templateUrl: '/js/single-pageapp/template.html',
    };
}]);
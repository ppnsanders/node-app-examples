'use strict';
angular.module('frontEndApp').directive('cartPage', [function() {
    return {
        restrict: 'E',
        scope: {},
        controller: ['$scope', '$location', 'apiModel', '$cookies', function($scope, $location, apiModel, $cookies) {
            $scope.model = apiModel;
            $scope.env = 'sandbox'
            $scope.commit = false
            $scope.style = {
                    layout: 'vertical',
                    color: 'blue',
                    size: 'large',
                    shape: 'rect'
            }
            $scope.funding = {
                allowed: [],
                disallowed: [ paypal.FUNDING.CREDIT, paypal.FUNDING.CARD ]
            }
            $scope.payment = function () {
                return new paypal.Promise((resolve, reject) => {
                    $scope.model.createPayment().then((res) => {
                        resolve(res.data.token)
                    })
                }) 
            }
            $scope.onAuthorize = function(data, actions) {
                $cookies.putObject('on-auth-data', data);
                window.location.href = data.returnUrl;
            }
        }],
        templateUrl: '/js/cart-page/template.html',
    };
}]);

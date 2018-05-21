'use strict';

angular.module('frontEndApp')
    .directive('returnPage', [ function() {
            return {
                restrict: 'E',
                scope: {},
                controller: ['$scope', '$location', 'apiModel', '$cookies', function($scope, $location, apiModel, $cookies) {
                    $scope.model = apiModel;
                    $scope.model.queryParams = $cookies.getObject('on-auth-data')
                    console.log($scope.model.queryParams)
                    $cookies.remove('on-auth-data')
                    $scope.model.getPaymentDetails();
            }],
                templateUrl: '/js/return-page/template.html',
        };
    }]);
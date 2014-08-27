/**
 * Created by gopi on 8/27/14.
 */
angular.module('t2spare.listings',[])
.controller('HomeCtrl',['$scope','$ionicModal', function($scope, $ionicModal){


        // Create Listing modal
        $ionicModal.fromTemplateUrl('new-listing.html', function(modal) {
            $scope.listingModal = modal;
        }, {
            scope: $scope
        });


        $scope.addListing = function() {
            $scope.listingModal.show();
        };

        $scope.closeListing = function() {
            $scope.listingModal.hide();
        };



    }])
    .controller('MyListingsCtrl',['$scope', function($scope){

    }])
    .controller('MyListingDetailCtrl',['$scope', function($scope){

    }])
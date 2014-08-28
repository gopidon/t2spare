/**
 * Created by gopi on 8/27/14.
 */
angular.module('t2spare.listings',[])
.controller('HomeCtrl',['$rootScope','$scope','$log','$ionicModal','$timeout','Listing', function($rootScope, $scope, $log, $ionicModal,$timeout, Listing){

        $scope.topListings = [];
        $scope.listingModal = null;

        Listing.find({}).$promise.then(function(data){
           $scope.topListings = data;
        });

        // Create Listing modal
        /*$ionicModal.fromTemplateUrl('new-listing.html', function(modal) {
            $scope.listingModal = modal;
        }, {
            scope: $scope
        });*/

        $ionicModal.fromTemplateUrl('new-listing.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.listingModal = modal;
        });


        $scope.addListing = function() {
            $scope.listingModal.show();
        };

        $scope.closeListing = function() {
            $scope.listingModal.hide();
        };

        $scope.createListing = function(listing){
           /* Listing.create(listing, function(data){

            });*/

            Listing.create(listing).$promise.then(function(data){
                $log.debug("Created new listing:"+JSON.stringify(data));
                $scope.topListings.push(data);
            });
            $scope.listingModal.hide();
        }



    }])
    .controller('MyListingsCtrl',['$scope', function($scope){

    }])
    .controller('MyListingDetailCtrl',['$scope', function($scope){

    }])
/**
 * Created by gopi on 8/27/14.
 */
angular.module('t2spare.listings',[])
.controller('HomeCtrl',['$rootScope','$scope','$log','$ionicModal','$timeout','Listing', function($rootScope, $scope, $log, $ionicModal,$timeout, Listing){

        $scope.topListings = [];
        $scope.listingModal = null;
        $scope.search = {};

        Listing.find({filter:{order: 'id desc'}}).$promise.then(function(data){
           $scope.topListings = data;
        });

        $scope.searchByKey = function(){
            Listing.find({filter:{where : {descr: {like: '%'+$scope.search.searchKey+'%'}}}}).$promise.then(function(data){
                $scope.topListings = data;
            });
        }

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
                $scope.topListings.unshift(data);
            });
            $scope.listingModal.hide();
        }



    }])
    .controller('MyListingsCtrl',['$scope', function($scope){

    }])
    .controller('MyListingDetailCtrl',['$scope', function($scope){

    }])
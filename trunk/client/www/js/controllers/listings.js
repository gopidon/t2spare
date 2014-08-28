/**
 * Created by gopi on 8/27/14.
 */
angular.module('t2spare.listings',[])
.controller('HomeCtrl',['$scope','$log','$ionicModal','Listing', function($scope, $log, $ionicModal, Listing){


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

        $scope.createListing = function(listing){
            Listing.create(listing, function(data){
                $log.debug("Created new listing:"+JSON.stringify(data));
            });
            $scope.listingModal.hide();
        }



    }])
    .controller('MyListingsCtrl',['$scope', function($scope){

    }])
    .controller('MyListingDetailCtrl',['$scope', function($scope){

    }])
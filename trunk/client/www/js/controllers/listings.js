/**
 * Created by gopi on 8/27/14.
 */
angular.module('t2spare.listings',[])
.controller('HomeCtrl',['$window','$rootScope','$scope','$state','$log',
        '$ionicPopup','$ionicModal','$ionicSideMenuDelegate','$ionicLoading','$timeout','URLConstants','Listing','LocalStorage',
        function($window, $rootScope, $scope, $state, $log,
                 $ionicPopup ,$ionicModal,$ionicSideMenuDelegate,$ionicLoading, $timeout, URLConstants, Listing, LocalStorage){


        $scope.URLConstants = URLConstants;
        $scope.topListings;
        $scope.myListings;
        $scope.loginModal = null;
        $scope.listingModal = null;
        $scope.search = {};
        $scope.controls = {
            showDelete: false,
            showNavigation: true
        };

        var loadOptions = {
                content: '<i class=" ion-loading-c"></i>'+' Loading ....',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
        }



        $scope.show = function() {
            $scope.loading = $ionicLoading.show(loadOptions);
        };
        $scope.hide = function(){
            $ionicLoading.hide();
        };

        $scope.toggleSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.getUser = function(){
            return LocalStorage.get("USER");
        }

        $scope.getDisplayName = function(){
            var user = $scope.getUser();
            user = JSON.parse(user);
            return user.displayName;
         }


        $scope.getUserId = function(){
            var user = $scope.getUser();
            user = JSON.parse(user);
            return user.id;
        }






        $scope.getAuthenticated = function(){
            var auth = LocalStorage.get("AUTHENTICATED");
            if(auth){
                return true
            }
            else
            {
                return false;
            }
        }

        // Create modals
       /* $ionicModal.fromTemplateUrl('login.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.loginModal = modal;
        });*/

        $scope.closeLoginModal = function() {
            $scope.loginModal.hide();
        };

        $ionicModal.fromTemplateUrl('new-listing.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.listingModal = modal;
        });

        $scope.closeListingModal = function() {
            $scope.listingModal.hide();
        };

        //Fetch top listings
        $scope.show();
        Listing.find({filter:{order: 'id desc', limit: 10}}).$promise.then(function(data){
           $scope.topListings = data;
           $scope.hide();
        });

        $scope.searchTopListingsByKey = function(){
            $scope.show();
            Listing.find({filter:{where : {descr: {like: '%'+$scope.search.searchKey+'%'}}, order: 'id desc', limit: 10}}).$promise.then(function(data){
                $scope.topListings = data;
                $scope.hide();
            });
        }


        $scope.addListing = function() {
            //check if user is authenticated
            if($scope.getAuthenticated()){
                $scope.listingModal.show();
            }
            else{
                $scope.loginModal.show();
            }

        };


        $scope.createListing = function(listing){
            var newListing = {};
            var userId = LocalStorage.get("USERID", -1);
            userId = parseInt(userId);
            $log.debug("createListing::Fetched userId:"+userId);

            newListing.descr = listing.descr;
            newListing.location = listing.location;
            newListing.contact = listing.contact;
            newListing.userId = userId;

            Listing.create(newListing).$promise.then(function(data){
                $log.debug("Created new listing:"+JSON.stringify(data));
                $scope.topListings.unshift(data);
                if($scope.myListings != undefined){
                    $scope.myListings.unshift(data);
                }
            });
            $scope.listingModal.hide();
        }

        $scope.onMyListingsTabSelected = function(){
            if($scope.getAuthenticated()){
                  // Load user listings
                $scope.show();
                Listing.find({filter:{where: {userId: $scope.getUserId()}, order:'id desc'}}).$promise.then(function(data){
                    $scope.myListings = data;
                    $scope.hide();
                });
            }
            else{
                //alert("No data");
                //$state.go('tab.home');
                //$scope.loginModal.show();

            }
        }

        $scope.searchMyListingsByKey = function(){
            $scope.show();
            Listing.find({filter:{where : {userId: $scope.getUserId(), descr: {like: '%'+$scope.search.searchKey+'%'}}, order:'id desc'}}).$promise.then(function(data){
                $scope.myListings = data;
                $scope.hide();
            });
        }

        $scope.editListing = function(id){

        }

        $scope.deleteListing = function(index, id){
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Listing?',
                template: 'Are you sure you want to delete the listing?'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    // Delete baby!
                    Listing.delete({id: id}, function(data){
                        $scope.myListings.splice(index,1);
                    });
                } else {
                    // Let it be!
                }
            });

        }





    }])
    .controller('ListingDetailCtrl', ['$stateParams','$scope','LocalStorage','Listing',
        function($stateParams, $scope, LocalStorage, Listing){



            $scope.listingId = $stateParams.listingId;
            $scope.listing;
            Listing.find({filter: {where: {id: $scope.listingId}}}, function(data){
               console.log(data);
               $scope.listing = data[0];
            });

            $scope.getUserId = function(){
                var userId = LocalStorage.get("USERID");
                if(userId == undefined){
                    return -1;
                }
                else
                {
                    return userId;
                }
            }

            $scope.getAuthenticated = function(){
                var auth = LocalStorage.get("AUTHENTICATED");
                if(auth){
                    return true
                }
                else
                {
                    return false;
                }
            }



    }]);
/**
 * Created by gopi on 8/27/14.
 */
angular.module('t2spare.listings',[])
.controller('HomeCtrl',['$window','$rootScope','$scope','$state','$log','$ionicModal','$timeout','URLConstants','Listing','LocalStorage', function($window, $rootScope, $scope, $state, $log, $ionicModal,$timeout, URLConstants, Listing, LocalStorage){

        var loginWindow, close, hasUserId, userId, accessToken, userStr, accessTokenStr;
        $scope.URLConstants = URLConstants;
        $scope.topListings = [];
        $scope.loginModal = null;
        $scope.listingModal = null;
        $scope.search = {};


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
        $ionicModal.fromTemplateUrl('login.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.loginModal = modal;
        });

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


        Listing.find({filter:{order: 'id desc', limit: 10}}).$promise.then(function(data){
           $scope.topListings = data;
        });

        $scope.searchByKey = function(){
            Listing.find({filter:{where : {descr: {like: '%'+$scope.search.searchKey+'%'}}, order: 'id desc', limit: 10}}).$promise.then(function(data){
                $scope.topListings = data;
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
            });
            $scope.listingModal.hide();
        }

        $scope.onMyListingsTabSelected = function(){
            if($scope.getAuthenticated()){

            }
            else{
                $state.go('tab.home');
                $scope.loginModal.show();

            }
        }


        $scope.authFB = function(){
            /*$http.defaults.headers.common['Authorization'] = '887RdUdAjdpGlydXY1rHhdfQcYVqlD7YttpIwoE2baJywLff2bPmi27Wmv1NNkvw';
             User.findById({id: 1}, function(data){
             console.log("Fetched data");
             console.log(JSON.stringify(data));
             });*/
            loginWindow = $window.open($scope.URLConstants.FBAuthURL,'_blank','location=yes');
            loginWindow.addEventListener('loadstart', function(event){
                console.log(event.url);
                close = event.url.indexOf("blank.html");
                hasUserId = event.url.indexOf("userId");
                console.log("Has UserId:"+hasUserId);
                if(close > -1 && hasUserId > -1){
                    userId = event.url.match('userId=[^&]*');
                    accessToken = event.url.match('accessToken=[^#]*');
                    userStr = userId[0];
                    accessTokenStr = accessToken[0];
                    userId = userStr.substring(userStr.indexOf('=')+1, userStr.length);
                    //console.log(userStr);
                    //console.log(accessTokenStr);
                    //console.log(userId);
                    accessToken = accessTokenStr.substring(accessTokenStr.indexOf('=')+1, accessTokenStr.length);
                    //console.log(accessToken);
                    $scope.$apply(function(){
                        LocalStorage.set("AUTHENTICATED", true);
                        LocalStorage.set("USERID", userId);
                        LocalStorage.set("ACCESSTOKEN", accessToken);
                        $scope.loginModal.hide();
                    });

                    loginWindow.close();
                }


            });
        }



    }])
    .controller('MyListingsCtrl',['$scope', function($scope){

    }])
    .controller('MyListingDetailCtrl',['$scope', function($scope){

    }])
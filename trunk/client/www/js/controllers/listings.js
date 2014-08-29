/**
 * Created by gopi on 8/27/14.
 */
angular.module('t2spare.listings',[])
.controller('HomeCtrl',['$window','$rootScope','$scope','$state','$log','$ionicModal','$timeout','URLConstants','Listing','LocalStorage', function($window, $rootScope, $scope, $state, $log, $ionicModal,$timeout, URLConstants, Listing, LocalStorage){

        var loginWindow, close, hasUserId, userId, accessToken, userStr, accessTokenStr;
        $scope.URLConstants = URLConstants;
        $scope.topListings = [];
        $scope.listingModal = null;
        $scope.search = {};

        Listing.find({filter:{order: 'id desc', limit: 10}}).$promise.then(function(data){
           $scope.topListings = data;
        });

        $scope.searchByKey = function(){
            Listing.find({filter:{where : {descr: {like: '%'+$scope.search.searchKey+'%'}}, order: 'id desc', limit: 10}}).$promise.then(function(data){
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
            //check if user is authenticated
            var auth = LocalStorage.get("AUTHENTICATED");
            if(auth){
                $scope.listingModal.show();
            }
            else{
                $scope.goToLoginPage();
            }

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

        $scope.goToLoginPage = function(){
            $state.go('tab.login');
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
                    console.log(userStr);
                    console.log(accessTokenStr);
                    console.log(userId);
                    accessToken = accessTokenStr.substring(accessTokenStr.indexOf('=')+1, accessTokenStr.length);
                    console.log(accessToken);
                    $scope.$apply(function(){
                        LocalStorage.set("AUTHENTICATED", true);
                        $state.go('tab.home');
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
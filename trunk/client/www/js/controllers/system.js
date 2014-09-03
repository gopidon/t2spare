/**
 * Created by gopi on 9/2/14.
 */
angular.module('t2spare.system.controllers',[])
    .controller('LoginCtrl',['$window','$rootScope','$scope','$state','$timeout','URLConstants','LocalStorage',
        function($window, $rootScope, $scope, $state, $timeout, URLConstants, LocalStorage){
        var loginWindow, close, hasUserId, userId, accessToken, userStr, accessTokenStr;
        $scope.URLConstants = URLConstants;
        $scope.authFB = function(){
            console.log("1");
            if(!$rootScope.inWeb){
                console.log("2");
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

                        });
                        $state.go('tab.home');
                        loginWindow.close();
                    }


                });
            }
            else{
                $timeout(function(){
                    LocalStorage.set("AUTHENTICATED", true);
                    LocalStorage.set("USERID", 1);
                    LocalStorage.set("ACCESSTOKEN", '');
                    $state.go('tab.home');
                });
            }

        }
    }]);
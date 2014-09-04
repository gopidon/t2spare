/**
 * Created by gopi on 9/2/14.
 */
angular.module('t2spare.system.controllers',['ngCookies'])
    .controller('LoginCtrl',['$window','$http','$rootScope','$cookies','$scope','$state','$timeout','URLConstants','LocalStorage','User','UserIdentity',
        function($window, $http, $rootScope, $cookies, $scope, $state, $timeout, URLConstants, LocalStorage, User, UserIdentity){

        var loginWindow, close, hasUserId, userId, accessToken, userStr, accessTokenStr;
        $scope.URLConstants = URLConstants;

        console.log("Cookies:"+JSON.stringify($cookies));

        $scope.authFB = function(){

            if(!$rootScope.inWeb){
                loginWindow = $window.open($scope.URLConstants.FBAuthURL,'_blank','location=yes');
                loginWindow.addEventListener('loadstart', function(event){
                    console.log(event.url);
                    close = event.url.indexOf("loginSuccess");
                    //hasUserId = event.url.indexOf("userId");
                    console.log("Close:"+close);
                    if(close > -1){
                       /* userId = event.url.match('userId=[^&]*');
                        accessToken = event.url.match('accessToken=[^#]*');
                        userStr = userId[0];
                        accessTokenStr = accessToken[0];
                        userId = userStr.substring(userStr.indexOf('=')+1, userStr.length);
                        //console.log(userStr);
                        //console.log(accessTokenStr);
                        //console.log(userId);
                        accessToken = accessTokenStr.substring(accessTokenStr.indexOf('=')+1, accessTokenStr.length);*/
                        //$http.defaults.headers.common['Authorization']  = 'O71YauoXlntGZRKHpxHSJPn1sRJfuHMM6hUJEpOvGKen9PpbDYGVrqPdUt5QzJsG';
                        //console.log(accessToken);
                        loginWindow.executeScript(
                            { code: "document.body.innerHTML" },
                            function( values ) {
                                console.log("Values:");
                                $scope.$apply(function(){
                                    LocalStorage.set("AUTHENTICATED", true);
                                    //LocalStorage.set("ACCESSTOKEN", accessToken);
                                    LocalStorage.set("USER",values[0]);

                                });
                                $state.go('tab.home');
                                loginWindow.close();

                            }
                        );

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
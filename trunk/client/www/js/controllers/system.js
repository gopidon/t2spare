/**
 * Created by gopi on 9/2/14.
 */
angular.module('t2spare.system.controllers',[])
    .controller('LoginCtrl',['$window','$http','$rootScope','$scope','$state','$timeout','URLConstants','LocalStorage','User','UserIdentity',
        function($window, $http, $rootScope, $scope, $state, $timeout, URLConstants, LocalStorage, User, UserIdentity){

        var loginWindow, close, hasUserId, userId, accessToken, userStr, accessTokenStr;
        $scope.URLConstants = URLConstants;


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

                        //console.log(accessToken);
                        loginWindow.executeScript(
                            { code: "document.getElementById('user').innerHTML" },
                            function( values ) {
                                console.log("Values:");
                                console.log(values[0]);
                                var accessToken
                                var type = typeof values[0];
                                if(type=="string") {
                                    accessToken = JSON.parse(values[0])['accessToken'];
                                }
                                else{
                                    accessToken = values[0]['accessToken'];
                                }
                                console.log(accessToken);
                                $scope.$apply(function(){
                                    LocalStorage.set("AUTHENTICATED", "true");

                                    LocalStorage.set("USER",values[0]);
                                    $http.defaults.headers.common['Authorization']  = accessToken;

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
                    LocalStorage.set("AUTHENTICATED", "true");
                    //$http.defaults.headers.common['Authorization']  = 'VuVtul1eJxPY7f7IcmHJBjlPSZdoSnQEQCyEDSWutbj1wAXFuE9fZkJQKrHacWmE';
                    LocalStorage.set("USER", '{"id": 1, "displayName": "Gopi", "accessToken":"K3bAeOH3RexZWw65RsM7duNLh1BUOFtUj1b4vWTZD0UefB2D2r7NUpsH1wuQdCJh"}');
                    $state.go('tab.home');
                });
            }

        }
    }]);
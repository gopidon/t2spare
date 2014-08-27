angular.module('t2spare.controllers', ['lbServices'])

.controller('HomeCtrl', ['$scope','URLConstants','$window','$location','User','$http','$rootScope', 'Global','LocalStorage',function($scope, URLConstants, $window, $location, User, $http, $rootScope, Global, LocalStorage) {
        $scope.global = Global;
        $scope.getAuthenticated = function(){
            return LocalStorage.get("authenticated", false);
        }
        $scope.FBAuthURL = URLConstants.FBAuthURL;
        var loginWindow,close, hasUserId, userId, accessToken, userStr, accessTokenStr;
        $scope.openFB = function(){
            /*$http.defaults.headers.common['Authorization'] = '887RdUdAjdpGlydXY1rHhdfQcYVqlD7YttpIwoE2baJywLff2bPmi27Wmv1NNkvw';
            User.findById({id: 1}, function(data){
                console.log("Fetched data");
                console.log(JSON.stringify(data));
            });*/
            loginWindow = $window.open($scope.FBAuthURL,'_blank','location=yes');
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

                    /*$scope.$apply(function(){
                        $scope.global.user.id = userId;
                        $scope.global.authenticated = true;
                    })*/
                    $scope.$apply(function(){
                        LocalStorage.set("authenticated", true);
                    });

                    loginWindow.close();
                }


            });
        }
}])

.controller('MyListingsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('MyListingDetailDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
});



//curl -X GET -H "Authorization: 887RdUdAjdpGlydXY1rHhdfQcYVqlD7YttpIwoE2baJywLff2bPmi27Wmv1NNkvw" http://localhost:3000/api/Users/1
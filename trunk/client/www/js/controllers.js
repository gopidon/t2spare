angular.module('t2spare.controllers', [])

.controller('DashCtrl', ['$scope','URLConstants','$window','$location',function($scope, URLConstants, $window, $location) {
        $scope.FBAuthURL = URLConstants.FBAuthURL;
        var loginWindow,close, hasUserId, userId;
        $scope.openFB = function(){
            loginWindow = $window.open($scope.FBAuthURL,'_blank','location=yes');
            loginWindow.addEventListener('loadstart', function(event){
                console.log(event.url);
                close = event.url.indexOf("blank.html");
                hasUserId = event.url.indexOf("userId");
                console.log("Has UserId:"+hasUserId);
                if(close > -1 && hasUserId > -1){
                    userId = event.url.match('userId=[^#]*');
                    var userStr = userId[0];
                    console.log(typeof userStr);
                    console.log(userStr.indexOf('='));
                    console.log(userStr.length);
                    var res = userStr.substring(userStr.indexOf('=')+1);
                    console.log(res);
                    loginWindow.close();
                }
               // console.log(loginWindow);

            })
        }
}])

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});

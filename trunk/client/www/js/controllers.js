angular.module('t2spare.controllers', [])

.controller('DashCtrl', ['$scope','URLConstants','$window','$location',function($scope, URLConstants, $window, $location) {
        $scope.FBAuthURL = URLConstants.FBAuthURL;
        var loginWindow,close;
        $scope.openFB = function(){
            loginWindow = $window.open($scope.FBAuthURL,'_blank','location=yes');
            loginWindow.addEventListener('loadstart', function(event){
                close = event.url.indexOf("login_success");
                if(close > -1){
                    loginWindow.close();
                }

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

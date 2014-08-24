angular.module('t2spare.controllers', [])

.controller('DashCtrl', ['$scope','URLConstants',function($scope, URLConstants) {
        $scope.FBAuthURL = URLConstants.FBAuthURL;
}])

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});

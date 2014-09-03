// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('t2spare', ['ionic', 't2spare.system.services','t2spare.system.controllers', 't2spare.listings','t2spare.values','lbServices'])

.run(function($ionicPlatform,$rootScope, $state, LocalStorage) {
  $rootScope.inWeb = true;
  $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
  });

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (toState.name !== "login" && toState.name !== "logout" && !LocalStorage.get("AUTHENTICATED")) {
                $state.go('login');
                event.preventDefault();
            }
        });

})

.config(['$stateProvider','$urlRouterProvider','$logProvider',function($stateProvider, $urlRouterProvider, $logProvider) {

  $logProvider.debugEnabled(true);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'

      }
     )

    // Each tab has its own nav history stack:

    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('tab.myListings', {
      url: '/myListings',
      views: {
        'tab-myListings': {
          templateUrl: 'templates/tab-myListings.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('tab.myListingDetailEdit', {
      url: '/myListings/showListing/:listingId',
      views: {
        'tab-myListings': {
          templateUrl: 'templates/myListing-detail.html',
          /*controller: function($stateParams){
              console.log($stateParams.listingId)
          }*/
          controller: 'ListingDetailCtrl'
        }
      }
    })
      .state('tab.myListingDetailView', {
          url: '/home/showListing/:listingId',
          views: {
              'tab-home': {
                  templateUrl: 'templates/myListing-detail.html',
                  /*controller: function($stateParams){
                   console.log($stateParams.listingId)
                   }*/
                  controller: 'ListingDetailCtrl'
              }
          }
      })



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

}]);


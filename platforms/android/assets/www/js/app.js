// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('pricingdemo', ['ionic', 'pricingdemo.controllers', 'pricingdemo.services', 'ngResource','ODataResources','ngCordovaOauth','ngSanitize'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $httpProvider.defaults.withCredentials = true;
  
  $stateProvider

  

  // Each tab has its own nav history stack:

  .state('dash', {
    url: '/dash',
    templateUrl: 'templates/dash.html',
    controller: 'DashCtrl'
    
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
    
  })

   .state('powerbidash', {
    url: '/powerbidash',
    templateUrl: 'templates/powerbidash.html',
    controller: 'PowerBIDashCtrl'
    
  })

.state('detail', {
    url: 'x`/detail/:productId',
    templateUrl: 'templates/detail.html'
      
    
  })

.state('searchResults', {
    url: '/searchResults',
    templateUrl: 'templates/detail.html',
    controller: 'SearchResultsCtrl'
      
    
  })
  



  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
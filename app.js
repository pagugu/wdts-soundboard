'use strict';

// Declare app level module which depends on views, and components
angular.module('SoundboardApp', [
  'ngRoute',
  'soundboard',
//  'SoundboardApp.view1',
//  'SoundboardApp.view2',
  'SoundboardApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);


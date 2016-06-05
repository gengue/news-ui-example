/*
 * Modules
 */
angular.module('app', ['ngRoute', 'ngAnimate', 'templates', 'app.news']);

/*
 * Routes
 */
angular.module('app') 
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
    .when("/", {
      controller: "NewsCtrl",
      templateUrl: "js/news/news.html"
    })
    .when("/news/:id/", {
      controller: "NewsCtrl",
      templateUrl: "js/news/news.html"
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true); //pretty urls
  }]);

/*
 * Constants
 */
  angular.module("app").constant("CONFIG", {
    NEWS_URL: "/data/news_mock.json",
    //NEWS_URL: "http://example.com/api/v1/news/"
  });


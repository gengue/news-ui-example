angular.module('app.news')

.controller('NewsCtrl', ['$scope', 'NewsService', function($scope, NewsService) {
  $scope.news = [];
  $scope.selectedNews = {};

  $scope.loadNews = function() {
    NewsService.getAll(function(response) {
      console.log(response);
      $scope.news = response.data.map((item)=> {
        item.selected = false;
        return item;
      }); 
    }, function(errorResponse) {
      console.info(errorResponse);
    });
  };

  $scope.openNews = function(news){
    news.selected = !news.selected; 
    if(news.selected){
      $scope.selectedNews = news;
    } else {
      $scope.selectedNews = {};
    }
  }
}]);

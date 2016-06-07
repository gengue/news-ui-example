angular.module('app.news')

.controller('NewsCtrl', ['$scope', 'NewsService', function($scope, NewsService) {
  $scope.feed = [];
  $scope.selectedNews = {};

  /*
   *fetch all news from server
   */
  $scope.loadNews = function() {
    NewsService.getAll(function(response) {
      console.log(response);
      $scope.feed = response.data.map((item)=> {
        item.selected = false;
        return item;
      }); 
    }, function(errorResponse) { //on error
      console.info(errorResponse);
    });
  };

  /*
   *show more info
   */
  $scope.openNews = function(news){
    news.selected = !news.selected; 
    if(news.selected){
      $scope.selectedNews = news;
    } else {
      $scope.selectedNews = {};
    }
  }
}]);

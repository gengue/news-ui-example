angular.module('app.news')

.controller('NewsCtrl', ['$scope', 'NewsService', function($scope, NewsService) {
  $scope.feed = [];
  $scope.selectedNews = {};
  $scope.busy = false;

  /*
   *fetch all news from server
   */
  $scope.loadNews = function() {
    $scope.busy = true;
    NewsService.getAll(function(response) {
      console.log(response);
      $scope.feed = response.data.map((item)=> {
        item.selected = false;
        return item;
      }); 
      $scope.busy = false;
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

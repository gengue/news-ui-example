
angular.module('app.news', [])

.service('NewsService', ['$http', 'CONFIG', function($http,  CONFIG){
    this.url = CONFIG.NEWS_URL;

    this.getAll = function(callback, err){
      return $http.get(this.url).then(callback, err);
    };

    //this.getOne = function(id, callback){
      //return $http.get(this.url+id+'/').then(callback);
    //};

}]);

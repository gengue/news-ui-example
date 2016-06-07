
angular.module('app.news', [])

.service('NewsService', ['$http', 'CONFIG', function($http,  CONFIG){
    this.url = CONFIG.NEWS_URL;

    this.handleError = function(err){
      console.info(err);
    };

    this.getAll = function(callback){
      setTimeout(()=>{
        return $http.get(this.url).then(callback, this.handleError);
      }, 2000); 

      //return $http.get(this.url).then(callback, err);
    };

    //this.getOne = function(id, callback){
      //return $http.get(this.url+id+'/').then(callback);
    //};

}]);

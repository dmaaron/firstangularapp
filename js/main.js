var app = angular.module('myApp', []);

var apiKey = 'MDE1NDg2MzY1MDE0MDY3NDY2MDYzZGRjOQ001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('PlayerController', ['$scope', '$http', function($scope, $http){
    $scope.playing = false;
    $scope.audio = document.createElement('audio');
    $scope.audio.src = 'media/surfsong.mp4';
    $scope.play = function() {
        $scope.audio.play();
        $scope.playing = true;
    };

    $scope.stop = function() {
        $scope.audio.pause();
        $scope.playing = false;
    };
    $scope.audio.addEventListener('ended', function(){
        $scope.$apply(function(){
            $scope.stop();
        });
    });
      $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data, status) {
    // Now we have a list of the stories (data.list.story)
    // in the data object that the NPR API 
    // returns in JSON that looks like:
    // data: { "list": {
    //   "title": ...
    //   "story": [
    //     { "id": ...
    //       "title": ...
    $scope.programs = data.list.story;
  }).error(function(data, status) {
    // Some error occurred
  });

}]);

app.controller('RelatedController', ['$scope', function($scope){
}]);


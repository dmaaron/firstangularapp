var app = angular.module('myApp', []);

var apiKey = ,
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.factory('audio', ['$document', function($document) {
    var audio = $document[0].createElement('audio');
    return audio;
}]);

app.directive('nprLink', function(){
    return {
        restrict: 'EA',
        require: ['^ngModel'],
        replace: true,
        scope: {
            ngModel: '=',
            play: '&'
        },
        templateUrl: 'views/nprListItem.html',
        link: function(scope, ele, attr) {
            scope.duration = scope.ngModel.audio[0].duration.$text;
        }
    };
});


app.controller('PlayerController', ['$scope', '$http', 'audio',
    function($scope, $http, audio){
    $scope.audio = audio;

    $scope.play = function(program) {
        if ($scope.playing) audio.pause();
        var url = program.audio[0].format.mp4.$text;
        audio.src = url;
        audio.play();
        $scope.playing = true;
    };

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


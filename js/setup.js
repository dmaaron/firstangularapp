(function(){
  var app = angular.module('setup', [ ]);

  app.controller('RepeaterController', function($scope){
    $scope.users = [
    {'name': 'Johnny', 'gender': 'M'},
    {'name': 'Bobby', 'gender': 'M'},
    {'name': 'Jenny', 'gender': 'F'}
    ];
  });

  app.controller('CountController', function($scope) {
    $scope.val = 5;
    $scope.title = 'Some title';

    $scope.up = function() {
        this.val += 1;
    };
    $scope.down = function() {
        this.val -=1;
    };
 });

})();



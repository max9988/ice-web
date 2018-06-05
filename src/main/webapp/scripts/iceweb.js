var iceApp = angular.module('iceApp', []);

iceApp.controller('iceCtrl', function($scope, $http, $q, $location) {

    //$scope.iceData = [{"id":97781502,"firstName":null,"lastName":null},{"id":97781504,"firstName":null,"lastName":null}];
    //$scope.icePersonData = [{"id":97781502,"firstName":null,"lastName":null},{"id":97781504,"firstName":null,"lastName":null}];
	$scope.init = function(){	
		console.log("Angular HTTP init()....");
		$http.get("http://liwang.unisys.com:8080/Persons")
		.then(function success(response) {
			//$scope.iceData = JSON.parse(response.data);
			$scope.iceData = response.data;
			console.log("AppData from Server: " + JSON.stringify(response.data));		
		}, function error(response) {
            $scope.iceData = response.status + " " + response.statusText + " " + response.headers();
        });
	};

	$scope.getPerson = function(){	
		console.log("Angular HTTP getPerson....");

        //$scope.id = $routeParams.id;
        //var routeID = $routeParams.id;
		
        var url = $location.absUrl().split("/").pop();
        var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });	      

		$http.get("http://liwang.unisys.com:8080/Person/" + vars["id"])
		.then(function success(response) {
			//$scope.icePersonData = JSON.parse(response.data);
			$scope.icePersonData = response.data;
			console.log("AppData from Server: " + JSON.stringify(response.data));
			
				$http.get("http://liwang.unisys.com:8080/applications/" + vars["id"])
				.then(function success(response) {
					//$scope.icePersonData = JSON.parse(response.data);
					$scope.iceApplicationData = response.data;
					console.log("AppData from Server: " + JSON.stringify(response.data));		
				}, function error(response) {
		            $scope.iceApplicationData = response.status + " " + response.statusText + " " + response.headers();
		        });			
					
		}, function error(response) {
            $scope.icePersonData = response.status + " " + response.statusText + " " + response.headers();
        });
	};
	      
});

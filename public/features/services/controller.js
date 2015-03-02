function ServicesCtrl($scope,$http)
{
 $scope.message = 'Add some facebook username to find his Full Name ';   
  
 $scope.create=function(){
 $http.post("/serviceClients",$scope.serviceClient)
 .success(function(response)
          {$scope.all();});
 }
 
 

    $scope.renderServiceClients=function(response){
     $scope.serviceClients=response;
    }
    
    $scope.remove=function(id)
    {
    $http.delete("/serviceClients/" + id)
    .success(function(response){
    $scope.all();});
    }
    
    
     $scope.select=function(id)
    {
     $http.get("/serviceClients/" + id)
     .success(function(response){
     console.log(response);
     $scope.fname=response;

     });
    
     }
    //get all
    $scope.all=function(){
    $http.get("/serviceClients")
    .success($scope.renderServiceClients);
      }
 $scope.all();
}
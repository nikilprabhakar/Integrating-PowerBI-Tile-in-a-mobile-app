angular.module('pricingdemo.controllers', [])

.controller('DashCtrl', function($scope,$odataresource,$odata,$state,IngredientService,LoaderService) {
	$scope.data={};
	$scope.message='';

	$scope.getProducts=function(){
		var searchresults=[];
		var mat_gp=$scope.data.material_group;
		var mat_cat=$scope.data.material_category;
		var ingred=$scope.data.ingredient;
		console.log('material group:'+mat_gp);
		LoaderService.show();
		$odataresource("http://pricingservice-obvience.azurewebsites.net/Ingredients")
							.odata()
							.filter(new $odata.Func("startswith","Material_Group",mat_gp))
							.filter(new $odata.Func("startswith","Material_Category",mat_cat))
							.filter(new $odata.Func("startswith","IngredientDescription",ingred))
							.query(function(Ingredients){
								
								if(Ingredients.length >=1 ) {
									angular.forEach(Ingredients, function(ingredient){
						 			searchresults.push({
						 				"IngredientID":ingredient.IngredientID,
						 				"Material_Category":ingredient.Material_Category,
						 				"IngredientDescription":ingredient.IngredientDescription,
						 				"Price_Change":ingredient.Price_Change
	 								});
									IngredientService.setSearchResults(searchresults);
									LoaderService.hide();
									$scope.message=''
									$state.go("searchResults");
									},function(error){
										console.log("Something is wrong:"+error)
									});

								}else{
									console.log('In else loop');
									LoaderService.hide();
									$scope.message="No results, please check your search criteria";
								}
								

							})
						}
	
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SearchResultsCtrl', function($scope, $stateParams, IngredientService) {
  $scope.searchresults = IngredientService.getSearchResults();
  $scope.data={};

  $scope.updatePrice=function(){
  	console.log("Updated Price:"+JSON.stringify($scope.data));
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

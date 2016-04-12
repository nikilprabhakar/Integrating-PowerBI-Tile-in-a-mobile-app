angular.module('pricingdemo.controllers', [])

.controller('DashCtrl', function($scope,$odataresource,$odata,$state,IngredientService,LoaderService) {
	$scope.data={};
	$scope.message='';
	var mat_gp='';
	var mat_cat='';
	var ingred='';
	$scope.getProducts=function(){
		var searchresults=[];
		console.log('$scope.data.material_group:'+$scope.data.material_group);
		if(typeof $scope.data.material_group!="undefined")
			mat_gp=$scope.data.material_group;
		

		if(typeof $scope.data.material_category!="undefined")
			mat_cat=$scope.data.material_category;
		

		if(typeof $scope.data.ingredient!="undefined")
			ingred=$scope.data.ingredient;

		//console.log('material group:'+mat_gp);
		LoaderService.show();
		$odataresource("http://pricingservice-obvience.azurewebsites.net/Ingredients")
							.odata()
							.filter(new $odata.Func("startswith","Material_Group",mat_gp))
							.filter(new $odata.Func("startswith","Material_Category",mat_cat))
							.filter(new $odata.Func("startswith","IngredientDescription",ingred))
							.query(function(Ingredients){
								//console.log('here after query');
								if(Ingredients.length >=1 ) {
									angular.forEach(Ingredients, function(ingredient){
						 			searchresults.push({
						 				"IngredientUID":ingredient.IngredientUID,
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

.controller('SearchResultsCtrl', function($odataresource,$odata,$scope, $stateParams,$state,$ionicPopup,IngredientService, ProductService) {
  $scope.searchresults = IngredientService.getSearchResults();
  $scope.data={};
  $scope.accesstoken='';
  $scope.updatePrice=function(){
  	console.log("Updated Price:"+$scope.data);
  	console.log('keys:'+Object.keys($scope.data));
  	Object.getOwnPropertyNames($scope.data).forEach(function(key, idx, array) {
	  console.log(key + ' -> ' + $scope.data[key]);
	  (new ProductService({
		  		"Price_Change":$scope.data[key]
	  		})).$update({key:key});

	});
	$state.go('powerbidash');
	//var alertPopup = $ionicPopup.alert({
		//title:'Your updates have been submitted',
	//	template: 'Please go to Power BI to check your new report'
	//});
	//alertPopup.then(function(res){
	//	$state.go("dash");
	//});
	
  	
  	
  	//var clientId = '8c48f13e-8d66-4da9-b129-66d986a5ce9c';
  	//var tenantid = 'f16012e7-8f45-40c2-b565-d05f46b463e5';
  	
  	

  }
})

.controller('LoginCtrl', function($scope, $state, $cordovaOauth, IngredientService) {
    var clientId = ' 0c79161d-2cc3-4cd5-bdbe-8d3b65f595c1';
  	var tenantId = 'c8982b6d-b8f9-48bb-816f-3c9b19b0b6a5';	
  	var resourceURI = 'https://analysis.windows.net/powerbi/api';
  	$scope.message='';
  	$scope.loginToApp=function(){
  		$cordovaOauth.azureAD(clientId,tenantId,resourceURI).then(function(result){
  		console.log('result:'+result.access_token);
  		IngredientService.setAzureADToken(result.access_token);
  		$state.go('dash');
  	},function(error){
  		console.log('Error->'+error);
  		$scope.message=error;
  		$state.go('login');
  	})
  	}
  	
  
})

.controller('PowerBIDashCtrl', function($scope,$state,$http,$sce,AzureService,IngredientService){
	
	$scope.postActionLoadTile=function(){
		var access_token = IngredientService.getAzureADToken();
		var dashId = IngredientService.getDashId();
		if(""===dashId)
			return;
		if(""===access_token)
			return;

		console.log('in palt');
		var m = {action:"loadTile", accessToken:access_token,height:600, width:400};
		message = JSON.stringify(m);
		console.log("message:"+message);
		iframe = document.getElementById('ifrmtile').contentWindow;
		iframe.postMessage(message,"https://app.powerbi.com");
	}

	AzureService.getDashboard().get({},'',function(dashboard){
		console.log('dash details:'+JSON.stringify(dashboard));
		var results = dashboard.value;
		for(var i=0;i<results.length;i++){
			var dname = results[i].displayName;
			var did = results[i].id;
			if(dname=='Pricing'){
				$scope.dashid=did;
				$scope.displayname=dname;
				IngredientService.setDashId(did);
				AzureService.getTiles().get({},'',function(tiles){
					var tileArr = tiles.value;
					for(var j=0;j<tileArr.length;j++){
						var ttitle = tileArr[j].title;
						var tembedurl = tileArr[j].embedUrl;
						if(ttitle=='Ingredient Price Change'){
							$scope.embedurl = $sce.trustAsResourceUrl(tembedurl);	
							$scope.title= ttitle;
						}
						
					}
				},function(error){
					console.log('error in tiles:'+error);
					$scope.message=error;
				})
			} 
		}

		
	},function(error){
		$scope.message=error;
	});
	

	

})



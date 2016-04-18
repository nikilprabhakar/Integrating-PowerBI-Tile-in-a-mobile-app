angular.module('powerbidemo.controllers', [])


.controller('LoginCtrl', function($scope, $state, $cordovaOauth, YourService) {
    var clientId = '0c79161d-2cc3-4cd5-bdbe-8d3b65f595c1';
  	var tenantId = 'c8982b6d-b8f9-48bb-816f-3c9b19b0b6a5';	
  	var resourceURI = 'https://analysis.windows.net/powerbi/api';
  	$scope.message='';
  	$scope.loginToApp=function(){
  		$cordovaOauth.azureAD(clientId,tenantId,resourceURI).then(function(result){
  		console.log('result:'+result.access_token);
  		YourService.setAzureADToken(result.access_token);
  		$state.go('powerbidash');
  	},function(error){
  		console.log('Error->'+error);
  		$scope.message=error;
  		$state.go('login');
  	})
  	}
  	
  
})

.controller('PowerBIDashCtrl', function($scope,$state,$http,$sce,AzureService,YourService){
	
	$scope.postActionLoadTile=function(){
		var access_token = YourService.getAzureADToken();
		var dashId = YourService.getDashId();
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
			if(dname=='.VanArsdel'){
				$scope.dashid=did;
				$scope.displayname=dname;
				YourService.setDashId(did);
				AzureService.getTiles().get({},'',function(tiles){
					var tileArr = tiles.value;
					for(var j=0;j<tileArr.length;j++){
						var ttitle = tileArr[j].title;
						var tembedurl = tileArr[j].embedUrl;
						if(ttitle=='Revenue, Units'){
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



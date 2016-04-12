angular.module('pricingdemo.services', [])



  .factory('AzureService', function($resource,IngredientService){
    return {
      getDashboard:function()
      {
        return $resource('',null,
        {
          'get' : {
              method:'GET',
              url:"https://api.powerbi.com/beta/myorg/dashboards?$filter=startswith(displayName,'Pricing')",
              withCredentials:true,
              headers:{
                  Authorization: 'Bearer ' +IngredientService.getAzureADToken()
              }
          }
        })
      },
      getTiles:function()
      {
        return $resource('',null,
        {
          'get' : {
                method:'GET',
                url:"https://api.powerbi.com/beta/myorg/dashboards/"+IngredientService.getDashId()+"/tiles",
                withCredentials:true,
                headers:{
                    Authorization: 'Bearer ' +IngredientService.getAzureADToken()
                }
            }
        })
      }
    }
  }) 


  .factory('ProductService', function($resource){
    var odataUrl = 'http://pricingservice-obvience.azurewebsites.net/Ingredients';
    return $resource('', {},
    {
      'get' : {
          method:'GET',
          url:odataUrl,
          dataType:"json"
        },
      'update': { method: 'PATCH', params: { key: "@key" }, url: odataUrl + "('"+':key'+"')" }


      });

  })

  .factory('IngredientService', function() {
    var searchResults=[];
    var ad_access_token='';
    var dashId='';
    return {

      getSearchResults: function() {
        console.log("in services IngredientService");
        return searchResults;
      },
      setSearchResults:function(value){
        searchResults = value;
      },
      setAzureADToken:function(value){
        ad_access_token = value;
      },
      getAzureADToken:function(){
        return ad_access_token;
      },
      setDashId:function(id){
        dashId=id;
      },
      getDashId:function(){
        return dashId;
      }


    }


  })


  .directive('iframeOnload', [function(){
    return {
        scope: {
            callBack: '&iframeOnload'
        },
        link: function(scope, element, attrs){
            element.on('load', function(){
                return scope.callBack();
            })
        }
    }}])

  .factory('LoaderService', function($rootScope, $ionicLoading) {
    return {
        show : function() {

            $rootScope.loading = $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in',
                showBackdrop: true,
                minWidth: 200,
                showDelay: 4
            });
        },

        hide : function(){
            $ionicLoading.hide();
        }
    }
});




  

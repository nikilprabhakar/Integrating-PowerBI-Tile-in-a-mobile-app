angular.module('powerBIDemo.services', [])



  .factory('AzureService', function($resource,IngredientService){
    return {
      getDashboard:function()
      {
        return $resource('',null,
        {
          'get' : {
              method:'GET',
              url:"https://api.powerbi.com/beta/myorg/dashboards?$filter=startswith(displayName,'YourDashboardName')",
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
                url:"https://api.powerbi.com/beta/myorg/dashboards/"+YourService.getDashId()+"/tiles",
                withCredentials:true,
                headers:{
                    Authorization: 'Bearer ' +YourService.getAzureADToken()
                }
            }
        })
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




  

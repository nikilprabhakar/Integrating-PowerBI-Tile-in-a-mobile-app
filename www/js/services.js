angular.module('powerbidemo.services', [])

.factory('AzureService', function($resource,YourService){
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
                  Authorization: 'Bearer ' +YourService.getAzureADToken()
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


.factory('YourService', function() {
    var searchResults=[];
    var ad_access_token='';
    var dashId='';
    return {

      getSearchResults: function() {
        console.log("in services");
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
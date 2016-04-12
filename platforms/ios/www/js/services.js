angular.module('pricingdemo.services', [])



  .factory('AzureService', function($http,$q){
    var serviceRoot='http://pricingservice-obvience.azurewebsites.net/';
    return {
      getProducts:function(){
       $http.jsonp(serviceRoot).success(function(data){
          console.log("data:"+data.value);
       }).error(function(data){
          console.log("error:"+data);
       });
      

    }
  }
})


  .factory('ProductService', function($resource){
    
    var mat_cat="'Ar'";
    var ing_desc="'Ir'"
    var odataUrl = 'http://pricingservice-obvience.azurewebsites.net/Ingredients?$filter=startswith(IngredientDescription,'+ing_desc+
      ')and startswith(Material_Category,'+mat_cat+')';
    return $resource('', {},
    {
      'getProducts' : {
          method:'GET',
          url:odataUrl,
          dataType:"json"
        }


      });

  })

  .factory('IngredientService', function() {
    var searchResults=[];

    return {
      getSearchResults: function() {
        console.log("in services IngredientService");
        return searchResults;
      },
      setSearchResults:function(value){
        console.log("in services IngredientService");
        searchResults = value;
      }

    }


  })

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


  

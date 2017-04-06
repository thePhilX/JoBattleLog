(function () {
  'use strict';

  angular.module('BlurAdmin.pages.bad.see', ['ui.select', 'ngSanitize'])
      .config(routeConfig);
      console.log("Badminton see works");
      /** @ngInject */
      function routeConfig($stateProvider) {
        $stateProvider
            .state('badsee', {
              url: '/search/:id',
              title: 'Match',
              templateUrl: 'app/pages/bad.see/badsee.html',
              controller: 'BadSeeCtrl',
              controllerAs: 'vm',
              resolve:{
                 id: ['$stateParams', function($stateParams){
                     return $stateParams.id;
                 }]
              }
            });

      }
})();

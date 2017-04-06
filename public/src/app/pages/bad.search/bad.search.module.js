(function () {
  'use strict';

  angular.module('BlurAdmin.pages.bad.search', ['ui.select', 'ngSanitize'])
      .config(routeConfig);
      console.log("Badminton search works");
      /** @ngInject */
      function routeConfig($stateProvider) {
        $stateProvider
            .state('badsearch', {
              url: '/search',
              title: 'Spiele durchsuchen',
              templateUrl: 'app/pages/bad.search/badsearch.html',
              controller: 'BadSearchCtrl',
              controllerAs: 'vm',
              sidebarMeta: {
                icon: 'fa fa-binoculars',
                order: 200,
              },
            });
      }
})();

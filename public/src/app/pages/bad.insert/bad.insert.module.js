(function () {
  'use strict';

  angular.module('BlurAdmin.pages.bad.insert', ['ui.select', 'ngSanitize'])
      .config(routeConfig);
      console.log("Badminton insert works");
      /** @ngInject */
      function routeConfig($stateProvider) {
        $stateProvider
            .state('badinsert', {
              url: '/new-game',
              title: 'Spiel erstellen',
              templateUrl: 'app/pages/bad.insert/badinsert.html',
              controller: 'BadInsertCtrl',
              controllerAs: 'vm',
              sidebarMeta: {
                icon: 'ion-document-text',
                order: 200,
              },
            });
      }
})();

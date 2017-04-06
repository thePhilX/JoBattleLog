(function () {
  'use strict';

  angular.module('BlurAdmin.pages.bad.see')
      .controller('BadSeeCtrl', BadSeeCtrl);

  /** @ngInject */
  function BadSeeCtrl($scope, $filter, $stateParams) {
    var vm =this;
    vm.id = $stateParams.id;
  };
})();

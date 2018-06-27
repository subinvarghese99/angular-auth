(function () {

    'use strict';
  
    angular
      .module('app')
      .controller('ProfileController', profileController);
  
    profileController.$inject = ['authService'];
  
    function profileController(authService) {
  
      var vm = this;
      vm.auth = authService;
      vm.profile = JSON.parse(localStorage.getItem('profile'));
  
    }
  
  })();
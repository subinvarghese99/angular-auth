(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$state', 'angularAuth0', 'authManager'];

  function authService($state, angularAuth0, authManager) {
    function login(username, password) {
      angularAuth0.authorize();
    }
    
    function handleParseHash() {
      angularAuth0.parseHash(
        { _idTokenVerification: false },
        function(err, authResult) {
        if (err) {
          console.log(err);
        }
        if (authResult && authResult.idToken) {
          setUser(authResult);
          console.log(authResult);
        }
      });
    }
  function setUser(authResult){
    var expireAt = JSON.stringify(authResult.expireIn*1000 + new Date().getTime());

    var profile = {
      name: authResult.idTokenPayload.name,
      nickname: authResult.idTokenPayload.nickname,
      picture: authResult.idTokenPayload.picture
    };
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('profile', JSON.stringify(profile));
  }
  function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
  }
    function isAuthenticated() {
      return authManager.isAuthenticated();
    }

    return {
      login: login,
      handleParseHash: handleParseHash,
      logout: logout,
      isAuthenticated: isAuthenticated,
    }
  }
})();

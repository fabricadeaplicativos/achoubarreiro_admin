function myCustomOnNotificationHandler(res) {
    window.tokenRegister(res.regid);
}

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('achoubarreiro', ['ionic', 'achoubarreiro.controllers', 'ngCordova'])

.run(function($ionicPlatform, $cordovaPush, $http) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }

        // Make http available globaly
        window.tokenRegister = function(token) {

          $http.get("http://achoubarreiro.goldarkapi.com/tokens?token=" + token, {
              headers: {
                  "Accept": "application/json",
                  "X-Api-Token": "4WZ1sleJLR1krSXzx5JmHAgF4h52o2/3jMfoSEjEwnBbmPNg6zbTpOdDm5dJmoaQ/BE2IR7eLrqsDa8fW+ZOuA==",
                  "Content-Type": "application/json;charset=utf-8"
              }
            })

            .success(function(data, status, headers, config) {
              alert('Seu token já está registrado!!!');
            })

            .error(function(data, status, headers, config) {
                $http.post("http://achoubarreiro.goldarkapi.com/tokens", {
                  "token": token
                },
                {
                  headers: {
                      "Accept": "application/json",
                      "X-Api-Token": "4WZ1sleJLR1krSXzx5JmHAgF4h52o2/3jMfoSEjEwnBbmPNg6zbTpOdDm5dJmoaQ/BE2IR7eLrqsDa8fW+ZOuA==",
                      "Content-Type": "application/json;charset=utf-8"
                  }
                })

                .success(function(data, status, headers, config) {
                    alert('Token registrado com sucesso!');
                })

                .error(function(data, status, headers, config) {
                    alert('Houve uma falha na tentativa de registrar seu token: ' + JSON.stringify(data));
                });
            });
        }

        // ***********************************
        // P U S H   N O T I F I C A T I O N

        var androidConfig = {
            "senderID":"738722305617",
        };

        androidConfig.ecb = "myCustomOnNotificationHandler";

        alert('Sender ID: ' + androidConfig.senderID);

        // Register for push notification
        $cordovaPush.register(androidConfig).then(function(result) {
            alert('Result: ' + result);
        }, function(err) {
            alert('Error occurred while registering for push notification: ' + err);
        });

        // receive notification
        // myApp.controller('myCtrl', ['$scope', function($scope) {
        //     $scope.$on('pushNotificationReceived', function(event, notification) {
        //         // process notification
        //     });
        // }]);
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('enviarPromocao', {
        url: '/',
        templateUrl: 'templates/enviar_promocao.html',
        controller: 'EnviarPromocaoController'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
})

.factory('PushNotificationService', ['$http', function($http) {
    var service = {
        registerToken: function(token) {
            $http.post('http://achoubarreiro.goldarkapi.com/tokens', {
                'token': token,
                headers: {
                    'Accept': 'application/json',
                    'X-Api-Token': 'YqgEiyaUbpZP/18FDYdR/W200vT/Mn3eN+q+gae3IaBZlLKVPSmo1giwa84B2qL3vMHsJiHIEUcjjn5aMarnTw==',
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })

            .success(function(data, status, headers, config) {
                alert('Token registrado com sucesso!');
            })

            .error(function(data, status, headers, config) {
                alert('Houve uma falha na tentativa de registrar seu token: ' + data);
            });
        },

        sendPushNotification: function(title) {
            alert('Promoção: ' + title);
        }
    }

    return service;
}]);
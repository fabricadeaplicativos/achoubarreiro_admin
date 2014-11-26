angular.module('achoubarreiro.controllers', [])

.controller('EnviarPromocaoController', ['$scope', '$ionicModal', 'PushNotificationService', '$cordovaPush', '$http', function($scope, $ionicModal, PushNotificationService, $cordovaPush, $http) {

	// ***********************************************
	// 		    I N I T I A L I Z A T I O N

	// Sets the scope as delegate and chooses the animation
	$ionicModal.fromTemplateUrl('../templates/modals/create_new_sale.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	// Creates the array which will hold the sales
	$scope.sales = [];

	// ***********************************************
	// 				 M E T H O D S 

	// Open Modal
	$scope.openCreateNewSaleModal = function() {
		// Before opening the modal, we'll clean
		// the scope in case there's a sale object
		// in it.
		$scope.sale = {};
		$scope.modal.show();
	};

	// Close Modal
	$scope.closeCreateNewSaleModal = function() {
		$scope.modal.hide();
	}

	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

	// Execute action on hide modal
	$scope.$on('modal.hidden', function() {
		// Execute action
		console.log();
	});

	$scope.saveSaleAndCloseModal = function(saleObj) {
		$scope.addSale(saleObj);
		$scope.closeCreateNewSaleModal();
	}

	// Gets the properties of the sale and put them
	// into an object, which will be added later on
	// to an array
	$scope.addSale = function(saleObj) {
		$scope.sales[$scope.sales.length] = {
			title: saleObj.title,
			description: saleObj.description,
			date: saleObj.date,
			time_hours: saleObj.time.hours,
			time_minutes: saleObj.time.minutes,
		}
	}

	// Send Push Notification
	$scope.sendPushNotification = function(pushTitle) {
		PushNotificationService.sendPushNotification(pushTitle);
	}

	$scope.sendSucoLaranjaNotification = function() {
		$http.post('http://achoubarreiro.goldarkapi.com/push/devices/all/messages', {
			"message": "Promoção: Suco de Laranja Grátis!!!"
		}, {
			headers: {
                  "Accept": "application/json",
                  "X-Api-Token": "4WZ1sleJLR1krSXzx5JmHAgF4h52o2/3jMfoSEjEwnBbmPNg6zbTpOdDm5dJmoaQ/BE2IR7eLrqsDa8fW+ZOuA==",
                  "Content-Type": "application/json;charset=utf-8"
              }
		});
	}

	$scope.sendFeijoadaNotification = function() {
		$http.post('http://achoubarreiro.goldarkapi.com/push/devices/all/messages', {
			"message": "Promoção: Feijoada Grátis!!!"
		}, {
			headers: {
                  "Accept": "application/json",
                  "X-Api-Token": "4WZ1sleJLR1krSXzx5JmHAgF4h52o2/3jMfoSEjEwnBbmPNg6zbTpOdDm5dJmoaQ/BE2IR7eLrqsDa8fW+ZOuA==",
                  "Content-Type": "application/json;charset=utf-8"
              }
		});
	}
}]);
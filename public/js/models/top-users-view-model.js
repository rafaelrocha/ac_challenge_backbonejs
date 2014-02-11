define([
	'backbone',
	'models/users'
], 
function(Backbone, Users) {

	//todo: split this in two objects, top and last users
	var TopUsersViewModel = function(topUsersView) {
		var that = {};

		var topFiveUsers = new Users();


		// lastFiveUser.comparator = function(userOne, userTwo) {
		// 	return userOne.correctAnswersInPercentage() > userTwo.correctAnswersInPercentage() ? 1 : -1;
		// };

		topFiveUsers.on('change', function(user) {
			Backbone.trigger('users:top:changed', topFiveUsers);
		});

		that.addCandidate = function(user) {
			topFiveUsers.add(user);
		};

		return that;
	}


	return TopUsersViewModel;
})

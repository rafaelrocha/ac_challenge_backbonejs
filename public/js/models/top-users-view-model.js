define([
	'backbone',
	'models/users'
], 
function(Backbone, Users) {

	var TopUsersViewModel = function(topUsersView) {
		var that = {};

		var topFiveUsers = new Users();
		var lastFiveUser = new Users();


		lastFiveUser.comparator = function(userOne, userTwo) {
			return userOne.correctAnswersInPercentage() > userTwo.correctAnswersInPercentage() ? 1 : -1;
		};

		topFiveUsers.on('change', function(user) {
			Backbone.trigger('users:top:changed', topFiveUsers);
		});

		lastFiveUser.on('change', function(user) {
			Backbone.trigger('users:last:changed', lastFiveUser);
		});

		var addLastUser = function(user) {
			if (lastFiveUser.length == 5) {
				lastFiveUser.pop();
			}
			lastFiveUser.add(user, {at: 0});
		}

		that.addCandidate = function(user) {
			topFiveUsers.add(user);
			lastFiveUser.add(user);
			//addLastUser(user);
		};

		return that;
	}


	return TopUsersViewModel;
})

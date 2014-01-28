define([
	'backbone',
	'models/users'
], 
function(Backbone, Users) {

	var TopUsersViewModel = function(topUsersView) {
		var that = {};

		var topFiveUsers = new Users();

		topFiveUsers.on('change', function(user) {
			//select the first 5 best user scores

			topFiveUsers.add(user);

			topUsersView.model = topFiveUsers;
			topUsersView.render();
		});

		that.addCandidate = function(user) {
			topFiveUsers.add(user);
		};

		return that;
	}


	return TopUsersViewModel;
})

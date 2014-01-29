define([
  'backbone',
  'models/user'
],
function (Backbone, User) {
  'use strict';

  var Users = Backbone.Collection.extend({
	  model: User
	});

	return Users;

});
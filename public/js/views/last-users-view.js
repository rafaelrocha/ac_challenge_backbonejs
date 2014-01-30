define([
    'jquery', 
    'backbone',
    'handlebars',
    'backbone.handlebars',
    'models/users'
],
function ($, Backbone, Handlebars, BackboneHandlebars, Users) {
  'use strict';

  var LastUsersView = Backbone.View.extend({

    events: {
    },

    bindings: {
    },

    initialize: function (options) {
      this.container = options.container;
      this.model = options.model;

      var that = this;
      Backbone.on('users:last:changed', function(lastFiveUsers) {
        that.model = lastFiveUsers;
        that.render();
      });
    },

    render: function () {
      var template = _.template($('#top-users-template').html(), {
        title: 'Last Five Users!',
        users: this.model.models
      });

      this.$el.html(template);
      this.container.html(this.$el);
      return this;
    },
  });

  return LastUsersView;

 });
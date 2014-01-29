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
      var template = Handlebars.compile($('#top-users-template').html());
      this.$el.html(template({
        title: 'Last Five Users!',
        user: this.model
      }));
      this.container.html(this.$el);

      return this;
    },
  });

  return LastUsersView;

 });
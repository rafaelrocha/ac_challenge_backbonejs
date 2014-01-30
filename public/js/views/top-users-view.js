define([
    'jquery', 
    'backbone',
    'handlebars',
    'backbone.handlebars',
    'models/users'
],
function ($, Backbone, Handlebars, BackboneHandlebars, Users) {
  'use strict';

  var TopUsersView = Backbone.View.extend({

    events: {
    },

    bindings: {
    },

    initialize: function (options) {
      this.container = options.container;
      this.model = options.model;

      var that = this;
      Backbone.on('users:top:changed', function(topFiveUsers) {
        that.model = topFiveUsers;
        that.render();
      });
    },

    render: function () {
      var template = _.template($('#top-users-template').html(), {
        title: 'Top Five Users!',
        users: this.model.models
      });

      this.$el.html(template);
      this.container.html(this.$el);
      return this;
    },
  });

  return TopUsersView;

 });
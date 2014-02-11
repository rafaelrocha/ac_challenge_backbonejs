define([
  'jquery',
  'backbone',
  'models/user',
  'models/users',
  'models/top-users-view-model',
  'views/user-view',
  'views/question-view',
  'views/result-view',
  'views/top-users-view'
],
function ($, Backbone, User, Users, TopUsersViewModel, UserView, QuestionView, ResultView, TopUsersView) {
  'use strict';

  var routerManager = function() {
    var that = {};

    var quizMainContainer = $("#quizmain");
    var topUsersContainer = $("#topusers");
    
    var currentUser = new User({});

    var currentMainView;
    var quizView = new QuestionView(quizMainContainer);
    var topUsersView = new TopUsersView({
      container: topUsersContainer
    });

    var topUsersViewModel = new TopUsersViewModel(topUsersView);

    that.routes = {
      '': 'index',
      'question/q:id': 'question',
      'result': 'result'
    }

    var showMainView = function(view, renderParam) {
      if (currentMainView) {
        currentMainView.remove();
        currentMainView.unbind();
      }

      currentMainView = view;
      currentMainView.delegateEvents();
      currentMainView.render(renderParam);
    }
    
    that.index = function() {
      currentUser = new User({}); //restart user state
      topUsersViewModel.addCandidate(currentUser);
      quizView = new QuestionView(quizMainContainer); //restart quizview state  
      
      showMainView(new UserView({
        model: currentUser,
        container: quizMainContainer
      }));      
    }

    that.question = function(id) {
       showMainView(quizView, {
         user: currentUser,
         questionId: Number.valueOf()(id)
       });
    }

    that.result = function() {
       showMainView(new ResultView({
         container: quizMainContainer,
         user: currentUser
       }));
    }

    return that;
  }

  return Backbone.Router.extend(routerManager());;
});
define([
  'backbone',
  'models/question',
  'models/questions'
],
function (Backbone, Question, Questions) {
  'use strict';

	var User = Backbone.Model.extend({
		urlRoot: "http://localhost:4000/users",

        initialize: function(data) {
            this.set({
                  name: data.name || '',
                  email: data.email || '',
                  answers: new Questions()
            });

            this.on('change:name', this.validateName, this);
            this.on('change:email', this.validateEmail, this);
        },

        alreadyAnsweredTheQuiz: function() {
        	if (this.get("answers") && this.get("answers").length > 0) {
        		return true;
        	}
        	return false;
        },

        correctAnswersInPercentage: function() {
          var answers = this.get("answers");
          var quantityOfAnswers = answers.length;
          var answerPercentageCount = 0;

          if (quantityOfAnswers === 0) {
            return undefined;
          }

          _.each(answers.models, function(answer) {
            answerPercentageCount = answerPercentageCount + answer.correctAnswersInPercentage();
          })

          return  (answerPercentageCount / quantityOfAnswers).toFixed(2) * 100;
        },

        validateName: function() {
          if (!this.get("name")) {
            this.set("nameInvalid", "Please fill out your name.");
          } else {
            this.set("nameInvalid", "");
          }
        },

        isNameValid: function() { 
          return this.get("nameInvalid") != undefined && this.get("nameInvalid").length == 0;
        },

        isValid: function() {
          //improve these validation methods
          this.validateName();
          this.validateEmail();
          return this.isEmailValid() && this.isNameValid();
        },

        validateEmail: function() {
          if (!this.get("email")) {
            this.set("emailInvalid", "Please fill out your email.");
          } else {
            var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
            if (String(this.get("email")).search (filter) == -1) {
              this.set("emailInvalid", "Invalid email.");
            } else {
              this.set("emailInvalid", "");
            }
          }
        },

        isEmailValid: function() {
          return this.get("emailInvalid") != undefined && this.get("emailInvalid").length == 0;
        },

        fetchByEmail: function(email, options) {
          options = options || {};
          if (options.url === undefined) {
              options.url = this.urlRoot + "/email/" + email;
          }

          return Backbone.Model.prototype.fetch.call(this, options);
        },

        parse: function(response) {
            if (response) {
              var that = this;

              _.each(response.answers, function(answer) {
                var answerModel = new Question({description: answer.description});
               
                _.each(answer.optionns, function(option) {
                  answerModel.get("optionns").push(new Option(option));
                })
               
                that.get("answers").push(answerModel);
             });
          }
          return this.model;
        }
  });

  return User;
});
define([
  'underscore',
  'models/top-users-view-model',
], 
function(_, TopUsersViewModel) {

  var lastUsers;

  beforeEach(function() {
    lastUsers = new TopUsersViewModel();
  });

  describe('Given I have a LastUser with five users.', function() {
    
    describe('When I add a new user with a score higher than the 5 last users', function() {
      it('should not trigger a "users:last:changed" event');

      it('should not have this user on the list');
    });

    describe('When I add a new user with a score between the second and the third last users', function() {
      it('should trigger a "users:last:changed" event');

      it('should have this user on the third place of this list');

    });    

  });

});
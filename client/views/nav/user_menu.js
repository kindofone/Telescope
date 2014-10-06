Template[getTemplate('userMenu')].helpers({
  isLoggedIn: function () {
    return !!Meteor.user();
  },
  name: function () {
    return getDisplayName(Meteor.user());
  },
  profileUrl: function () {
    return getProfileUrl(Meteor.user());
  },
  profileImageUrl: function() {
    return getAvatarUrl(Meteor.user());
  }
});

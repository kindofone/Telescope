Template[getTemplate('userMenu')].helpers({
  isLoggedIn: function () {
    return !!Meteor.user();
  },
  name: function () {
    return getDisplayName(Meteor.user());
  },
  firstName: function() {
    var displayName = getDisplayName(Meteor.user());
    var firstSpaceIndex = displayName.indexOf(" ");

    if (firstSpaceIndex == -1) {
        firstSpaceIndex = displayName.length;
    }

    return displayName.substring(0, firstSpaceIndex);
  },
  profileUrl: function () {
    return getProfileUrl(Meteor.user());
  },
  profileImageUrl: function() {
    return getAvatarUrl(Meteor.user());
  },

  // Notifications Menu helpers
  notificationItem: function () {
    return getTemplate('notificationItem');
  },
  notifications: function(){
    return Notifications.find({userId: Meteor.userId(), read: false}, {sort: {timestamp: -1}});
  },
  hasNotifications: function () {
    return !!Notifications.find({userId: Meteor.userId(), read: false}, {sort: {timestamp: -1}}).count();
  },
  notification_count: function(){
    var notifications=Notifications.find({userId: Meteor.userId(), read: false}).fetch();
    return notifications.length;
  },
  notification_count_formatted: function(){
    var notifications=Notifications.find({userId: Meteor.userId(), read: false}).fetch();
    if(notifications.length==0){
      return i18n.t('No notifications');
    }else if(notifications.length==1){
      return i18n.t('1');
    }else{
      return notifications.length+' '+i18n.t('notifications');
    }
  },
  notification_class: function(){
    var notifications=Notifications.find({userId: Meteor.userId(), read: false}).fetch();
    if(notifications.length==0)
      return 'no-notifications';
  }
});

Template[getTemplate('userMenu')].events({
  'click .notifications-toggle': function(e){
    e.preventDefault();
    $('body').toggleClass('notifications-open');
  },
  'click .mark-as-read': function(){
    Meteor.call('markAllNotificationsAsRead',
      function(error, result){
        error && console.log(error);
      }
    );
  }
});
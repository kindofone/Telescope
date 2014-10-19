Template[getTemplate('layout')].helpers({
  mobile_nav: function () {
    return getTemplate('mobile_nav');
  },
  nav: function () {
    return getTemplate('nav');
  },
  error: function () {
    return getTemplate('error');
  },
  notifications: function () {
    return getTemplate('notifications');
  },
  posts_list: function () {
    return getTemplate('posts_list');
  },
  footer: function () {
    return getTemplate('footer');
  },
  pageName : function(){
    return getCurrentTemplate();
  },
  css: function () {
    return getTemplate('css');
  },
  heroModules: function () {
    return heroModules;
  },
  getTemplate: function () {
    return getTemplate(this.template);
  }
});

Template[getTemplate('layout')].created = function(){
  Session.set('currentScroll', null);
};

Template[getTemplate('layout')].rendered = function(){
  if(currentScroll=Session.get('currentScroll')){
    $('body').scrollTop(currentScroll);
    Session.set('currentScroll', null);
  }
};

Template[getTemplate('layout')].events({
    'click .overlay': function (event) {
        Router.go('/');
    }
});

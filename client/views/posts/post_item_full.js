var filteredModules = function (group) {
  // return the modules whose positions start with group
  return _.filter(postModules, function(module){return module.position.indexOf(group) == 0});
};

var post = {};

Template[getTemplate('post_item_full')].created = function () {
  post = this.data;
};

Template[getTemplate('post_item_full')].events({
    'click .post': function (event) {
        var target = event.target,
            isPostClick = true;

        while (target) {
            if (target.tagName.toLowerCase() == "a") {
                isPostClick = false;
            }
            target = target.parentElement;
        }

        if (isPostClick) {
            $(event.currentTarget).find(".discuss-link.go-to-comments").get(0).click();
        }
    }
});

Template[getTemplate('post_item_full')].helpers({
  leftPostModules: function () {
    return filteredModules('left');
  },
  postHeading: function () {
    return postHeading;
  },
  post_body: function () {
    return getTemplate('post_body');
  },
  postMeta: function () {
    return postMeta;
  },
  rightPostModules: function () {
    return filteredModules('right');
  },
  getTemplate: function () {
    return getTemplate(this.template);
  },
  moduleContext: function () { // not used for now
    var module = this;
    module.templateClass = camelToDash(this.template) + ' ' + this.position + ' cell';
    module.post = post;
    return module;
  },
  moduleClass: function () {
    return camelToDash(this.template) + ' ' + this.position + ' cell';
  }
});

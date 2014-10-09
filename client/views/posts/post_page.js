Template[getTemplate('post_page')].helpers({
  post_item_full: function () {
    return getTemplate('post_item_full');
  },
  post_body: function () {
    return getTemplate('post_body');
  },
  comment_form: function () {
    return getTemplate('comment_form');
  },
  comment_list: function () {
    return getTemplate('comment_list');
  }
});

Template[getTemplate('post_page')].rendered = function(){
  $('body').scrollTop(0);
  if(this.data) // XXX
    document.title = $(".post-title").text();
};

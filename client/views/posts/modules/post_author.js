Template[getTemplate('postAuthor')].helpers({
  authorName: function(){
    return getAuthorName(this);
  },
  ago: function(){
    // if post is approved show submission time, else show creation time. 
    time = this.status == STATUS_APPROVED ? this.postedAt : this.createdAt;
    return moment(time).fromNow();
  },
  profileUrl: function(){
    // note: we don't want the post to be re-rendered every time user properties change
    var user = Meteor.users.findOne(this.userId, {reactive: false});
    if(user)
      return getProfileUrl(user);
  }
});
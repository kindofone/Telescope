Template[getTemplate('comment_form')].helpers({
  canComment: function(){
    return canComment(Meteor.user());
  },
  currentUserId: function(){
    return Meteor.user()._id;
  }
});

Template[getTemplate('comment_form')].rendered = function(){
  if(Meteor.user() && !this.editor){
    this.editor = new EpicEditor(EpicEditorOptions);
    this.editor.on('load', function () {
       // Step 1: Grab the editor element
       var editorDoc = this.editor.getElement('editor');

       // Step 2: Create the script tag
       var script = editorDoc.createElement('script');
       script.type = 'text/javascript';
       script.innerHTML = "(function() {var config = {kitId: 'ktr5mwg'}; var d = false; var tk = document.createElement('script'); tk.src = '//use.typekit.net/' + config.kitId + '.js'; tk.type = 'text/javascript'; tk.async = 'true'; tk.onload = tk.onreadystatechange = function() {var rs = this.readyState; if (d || rs && rs != 'complete' && rs != 'loaded') return; d = true; try { Typekit.load(config); } catch (e) {} }; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tk, s); })();";

       // Step 3: Add it to the editor's <head>
       var editorHead = editorDoc.getElementsByTagName('head')[0];
       editorHead.appendChild(script);
    }.bind(this));
    this.editor.load();
    $(this.editor.editor).bind('keydown', 'meta+return', function(){
      $(window.editor).closest('form').find('input[type="submit"]').click();
    });
  }
};

Template[getTemplate('comment_form')].events({
  'submit form': function(e, instance){
    e.preventDefault();
    $(e.target).addClass('disabled');
    clearSeenErrors();
    var content = instance.editor.exportFile();
    if(getCurrentTemplate() == 'comment_reply'){
      // child comment
      var parentComment = this.comment;
      Meteor.call('comment', parentComment.postId, parentComment._id, content, function(error, newComment){
        if(error){
          console.log(error);
          throwError(error.reason);
        }else{
          trackEvent("newComment", newComment);
          Router.go('/posts/'+parentComment.postId+'/comment/'+newComment._id);
        }
      });
    }else{
      // root comment
      var post = postObject;

      Meteor.call('comment', post._id, null, content, function(error, newComment){
        if(error){
          console.log(error);
          throwError(error.reason);
        }else{
          trackEvent("newComment", newComment);
          Session.set('scrollToCommentId', newComment._id);
          instance.editor.importFile('editor', '');
        }
      });
    }
  }
});
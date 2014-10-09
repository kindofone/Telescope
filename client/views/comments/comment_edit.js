Template[getTemplate('comment_edit')].rendered = function(){
  if(this.data){ // XXX
    var comment = this.data.comment;

    if(comment && Meteor.user() && !this.editor){
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
      this.editor.importFile('editor', comment.body);
      $(this.editor.editor).bind('keydown', 'meta+return', function(){
        $(window.editor).closest('form').find('input[type="submit"]').click();
      });
    }
  }
};

Template[getTemplate('comment_edit')].events({
  'click input[type=submit]': function(e, instance){
    var comment = this;
    var content = cleanUp(instance.editor.exportFile());

    e.preventDefault();

    if(!Meteor.user())
      throw i18n.t('You must be logged in.');

    Comments.update(comment._id, {
      $set: {
        body: content
      }
    });

    trackEvent("edit comment", {'postId': comment.postId, 'commentId': comment._id});
    Router.go("/posts/"+comment.postId+"/comment/"+comment._id);
  },
  'click .delete-link': function(e){
    var comment = this;

    e.preventDefault();
    
    if(confirm(i18n.t("Are you sure?"))){
      Meteor.call('removeComment', comment._id);
      Router.go("/posts/"+comment.postId);
      throwError("Your comment has been deleted.");
//      Router.go("/comments/deleted");
    }
  }
});
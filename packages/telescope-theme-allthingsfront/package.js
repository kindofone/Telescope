Package.describe({
  summary: "Telescope All Things Front theme",
  version: '0.1.0',
  name: "telescope-theme-allthingsfront"
});

Package.onUse(function (api) {

//  api.use(['telescope-theme-hubble'], ['client']);

  api.add_files([
    'lib/client/css/screen.css',
    ], ['client']);

});
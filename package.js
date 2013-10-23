Package.describe({
  summary: "PowerQueue is a powerful tool for handling async tasks, throtling etc."
});

Package.on_use(function (api) {
  "use strict";
  api.export && api.export('PowerQueue');
  //api.export && api.export('_PowerQueue', ['client', 'server'], {testOnly: true});
  api.use(['meteor', 'underscore', 'random'],
          ['client', 'server']);

  api.use('standard-app-packages', ['client', 'server']);

  api.use(['deps'], 'client');
  //api.use([], 'server');
  //api.use(['localstorage', 'ejson'], 'client');
  api.add_files('powerqueue.common.js', ['client', 'server']);
  api.add_files('powerqueue.client.js', 'client');
  api.add_files('powerqueue.server.js', 'server');
});

Package.on_test(function (api) {
  api.use('grounddb', ['client']);
  api.use('test-helpers', 'client');
  api.use(['tinytest', 'underscore', 'ejson', 'ordered-dict',
           'random', 'deps']);

  api.add_files('powerqueue.client.tests.js', 'client');
  api.add_files('powerqueue.server.tests.js', 'server');
});

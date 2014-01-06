Package.describe({
  summary: "PowerQueue is a powerful tool for handling async tasks, throtling etc."
});

Package.on_use(function (api) {

  api.use(['deps', 'reactive-property', 'reactive-list'], ['client', 'server']);

  api.export && api.export('PowerQueue');
  api.add_files(['micro-queue.js', 'power-queue.js'], ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('power-queue');
  api.use('test-helpers', 'server');
  api.use('tinytest');

  api.add_files('tests.js');
});

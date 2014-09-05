Package.describe({
  name: 'cfs:power-queue',
  version: '0.0.0',
  summary: "PowerQueue is a powerful tool for handling async tasks, throtling etc."
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@0.9.1');

  api.use(['deps', 'cfs:reactive-property@0.0.0'], ['client', 'server']);

  // We let the user decide what spinal queue to use - We support both
  // reactive-list and micro-queue they obey the spinal-queue spec
  api.use(['cfs:reactive-list@0.0.0', 'cfs:micro-queue@0.0.0'], ['client', 'server'], { weak: true });

  api.export && api.export('PowerQueue');
  api.add_files(['power-queue.js'], ['client', 'server']);
});

Package.on_test(function (api) {
  api.use(['cfs:power-queue', 'cfs:reactive-list']);
  api.use('test-helpers', ['server', 'client']);
  api.use('tinytest');

  api.add_files('tests.js');
});

Package.describe({
  name: 'cfs:power-queue',
  version: '0.9.10',
  summary: "PowerQueue is a powerful tool for handling async tasks, throtling etc.",
  git: 'https://github.com/CollectionFS/Meteor-power-queue.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.0');

  api.use(['deps', 'cfs:reactive-property@0.0.3'], ['client', 'server']);

  // We let the user decide what spinal queue to use - We support both
  // reactive-list and micro-queue they obey the spinal-queue spec
  api.use(['cfs:reactive-list@0.0.8', 'cfs:micro-queue@0.0.4'], ['client', 'server'], { weak: true });

  api.export && api.export('PowerQueue');
  api.addFiles(['power-queue.js'], ['client', 'server']);
});

Package.onTest(function (api) {
  api.use(['cfs:power-queue', 'cfs:reactive-list']);
  api.use('test-helpers', ['server', 'client']);
  api.use('tinytest');

  api.addFiles('tests.js');
});

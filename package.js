Package.describe({
  name: 'zcfs:power-queue',
  version: '0.9.11',
  summary: "PowerQueue is a powerful tool for handling async tasks, throtling etc.",
  git: 'https://github.com/zcfs/Meteor-power-queue.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.0');

  api.use(['deps', 'zcfs:reactive-property@0.0.4'], ['client', 'server']);

  // We let the user decide what spinal queue to use - We support both
  // reactive-list and micro-queue they obey the spinal-queue spec
  api.use(['zcfs:reactive-list@0.0.9', 'zcfs:micro-queue@0.0.6'], ['client', 'server'], { weak: true });

  api.export && api.export('PowerQueue');
  api.addFiles(['power-queue.js'], ['client', 'server']);
});

Package.onTest(function (api) {
  api.use(['zcfs:power-queue', 'zcfs:reactive-list']);
  api.use('test-helpers', ['server', 'client']);
  api.use('tinytest');

  api.addFiles('tests.js');
});

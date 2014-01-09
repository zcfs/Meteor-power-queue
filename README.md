Power Queue [![Build Status](https://travis-ci.org/CollectionFS/Meteor-powerqueue.png?branch=master)](https://travis-ci.org/CollectionFS/Meteor-powerqueue)
=========

PowerQueue is a powerful tool for handling:
* async tasks
* throttling resource usage
* retry failed tasks
* Allows sub queues
* etc.

[Live sub queue Example](http://power-queue-sub-test.meteor.com)

And... It's powered by Meteor's reactive sugar :)

Kind regards Eric(@aldeed) and Morten(@raix)

Happy coding!!

#API
All getters and setters are reactive.
[API Documentation](api.md)

##Helpers / Getters / Setters:
* PowerQueue.length - Number of tasks in queue
* PowerQueue.progress - Current progress in percent
* PowerQueue.usage - Current load in percent
* PowerQueue.total - Sum of tasks to run in current queue
* PowerQueue.isPaused - True if queue is paused
* PowerQueue.isHalted - True if queue is paused or stopped
* PowerQueue.processing - Number of tasks being processed
* PowerQueue.errors - Failures where task is passed to the errorHandler
* PowerQueue.failures - Number of failures in current queue
* PowerQueue.isRunning - True if queue is active
* PowerQueue.maxProcessing - Getter + Setter for max tasks to run in parallel
* PowerQueue.autostart - Getter + Setter for autostart flag - Allow add task to start the queue
* PowerQueue.maxFailures - Max allowed retries for failing tasks before marked as an error
* options.queue - Use custom micro-queue compatible queue
* options.onEnded - Called when queue has ended
* options.onRelease(remainingTasks) - Called when queue has ended or paused
* options.onAutostart - Called when queue was autostarted

##Methods
* PowerQueue.add(data) - Add a task to queue
* PowerQueue.run() - Start the queue
* PowerQueue.pause() - Pause the queue
* PowerQueue.resume() - Resmue the queue if paused
* PowerQueue.reset() - Reset the queue
* PowerQueue.taskHandler(data, next, failures) - Default task handler, where data is a `function(done)`, can be overwritten
* PowerQueue.errorHandler(data, addTask, failures) - Default error handler, can be overwritten

#Example 1
```js
    var queue = new PowerQueue({
      isPaused: true
    });

    queue.add(function(done) {
      console.log('task 1');
      done();
    });
    queue.add(function(done) {
      console.log('task 2');
      done();
    });
    queue.add(function(done) {
      console.log('task 3');
      done();
    });

    console.log('Ready to run queue');
    queue.run();
```

#Example 2
This is a very rough example of how to make custom task handling,
```js

  queue.errorHandler = function(data, addTask) {
    // This error handler lets the task drop, but we could use addTask to
    // Put the task into the queue again
    tasks.update({ _id: data.id }, { $set: { status: 'error'} });
  };

  queue.taskHandler = function(data, next) {

    // The task is now processed...
    tasks.update({ _id: data.id }, { $set: { status: 'processing'} });

    Meteor.setTimeout(function() {
      if (Math.random() > 0.5) {
        // We random fail the task
        tasks.update({ _id: data.id }, { $set: { status: 'failed'} });
        // Returning error to next
        next('Error: Fail task');
      } else {
        // We are done!
        tasks.update({ _id: data.id }, { $set: { status: 'done'} });
        // Trigger next task
        next();
      }
      // This async task duration is between 500 - 1000ms
    }, Math.round(500 + 500 * Math.random()));
  };

  // Add the task:
  var taskId = 0;
  queue.add({ id: tasks.insert({ status: 'added', index: ++taskId }) });
```

#Contribute
[API Complete Documentation](internal.api.md)
Update docs, `npm install docmeteor`
```bash
$ docmeteor
```
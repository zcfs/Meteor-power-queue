/**
  * Creates an instance of a power queue // Testing inline comment
  * [Check out demo](http://power-queue-test.meteor.com/)
  * @constructor
  * @self powerqueue
  * @param {object} [options] Settings
  * @param {boolean} [options.filo=false] Make it a first in last out queue
  * @param {boolean} [options.isPaused=false] Set queue paused
  * @param {boolean} [options.autostart=true] May adding a task start the queue
  * @param {string} [options.name="Queue"] Name of the queue
  * @param {number} [options.maxProcessing=1] Limit of simultanous running tasks
  * @param {number} [options.maxFailures = 5] Limit retries of failed tasks
  */
PowerQueue = function(options) {
  var self = this; var test = 5;

  // Allow user to use another micro-queue #3
  var ActiveQueue = options && options.queue || MicroQueue;

  // Default is fifo lilo
  var invocations = new ActiveQueue(options && options.filo || options && options.lifo);

  // Max number of simultanious tasks being processed
  var _maxProcessing = new ReactiveProperty(options && options.maxProcessing || 1);

  // Reactive number of tasks being processed
  var _isProcessing = new ReactiveProperty(0);

  // Marker if we did pause any sub queues
  _pausedSubQueues = false;

  // Boolean indicating if queue is paused or not
  var _paused = new ReactiveProperty(options && options.isPaused || false);

  // Boolean indicator for queue status active / running (can still be paused)
  var _running = new ReactiveProperty(false);

  // Counter for errors, errors are triggered if maxFailures is exeeded
  var _errors = new ReactiveProperty(0);

  // Counter for task failures, contains error count
  var _failures = new ReactiveProperty(0);

  // Count of all added tasks
  var _maxLength = new ReactiveProperty(0);

  // List of current tasks being processed
  var _processList = new ReactiveList();

  // Boolean indicate whether or not a "add" task is allowed to start the queue
  var _autostart = new ReactiveProperty((options && options.autostart === false)?false : true);

  // Limit times a task is allowed to fail and be rerun later before triggering an error
  var _maxFailures = new ReactiveProperty(options && options.maxFailures || 5);

  // Name / title of this queue - Not used - should deprecate
  var title = options && options.name || 'Queue';

  /** @callback PowerQueue.onEnded
    * Is called when queue is ended
    */
  self.onEnded = options && options.onEnded || function() { console.log(title + ' ENDED'); };

  /** @callback PowerQueue.onEnded
    * Is called when queue is ended
    */
  self.onRelease = options && options.onRelease || function() { /* console.log(title + ' RELEASED'); */ };

  /** @callback PowerQueue.onAutostart
    * Is called when queue is auto started
    */
  self.onAutostart = options && options.onAutostart || function() { console.log(title + ' Autostart'); };

  /** @method PowerQueue.length
    * @reactive
    * @returns {number} Number of tasks left in queue to be processed
    */
  self.length = invocations.length;

  /** @method PowerQueue.progress
    * @reactive
    * @returns {number} 0 .. 100 % Indicates the status of the queue
    */
  self.progress = function() {
    var progress = _maxLength.get()-invocations.length();
    if (_maxLength.value > 0) {
      return Math.round( progress / _maxLength.value * 100);
    }
    return 0;
  };

  /** @method PowerQueue.usage
    * @reactive
    * @returns {number} 0 .. 100 % Indicates ressource usage of the queue
    */
  self.usage = function() {
    return Math.round(_isProcessing.get() / _maxProcessing.get() * 100);
  };

  /** @method PowerQueue.total
    * @reactive
    * @returns {number} The total number of tasks added to this queue
    */
  self.total = _maxLength.get;

  /** @method PowerQueue.isPaused
    * @reactive
    * @returns {boolean} Status of the paused state of the queue
    */
  self.isPaused = _paused.get;

  /** @method PowerQueue.processing
    * @reactive
    * @returns {number} Number of tasks currently being processed
    */
  self.processing = _isProcessing.get;

  /** @method PowerQueue.processList
    * @reactive
    * @returns {array} List of tasks currently being processed
    */
  self.processingList = function() {
    return _processList.fetch();
  };

  /** @method PowerQueue.errors
    * @reactive
    * @returns {number} The total number of errors
    * Errors are triggered when [maxFailures](PowerQueue.maxFailures) are exeeded
    */
  self.errors = _errors.get;

  /** @method PowerQueue.failures
    * @reactive
    * @returns {number} The total number of failed tasks
    */
  self.failures = _failures.get;

  /** @method PowerQueue.isRunning
    * @reactive
    * @returns {boolean} True if the queue is running
    * > NOTE: The task can be paused but marked as running
    */
  self.isRunning = _running.get;

  /** @method PowerQueue.maxProcessing Get setter for maxProcessing
    * @param {number} [max] If not used this function works as a getter
    * @reactive
    * @returns {number} Maximum number of simultaneous processing tasks
    *
    * Example:
    ```js
      foo.maxProcessing();    // Works as a getter and returns the current value
      foo.maxProcessing(20);  // This sets the value to 20
    ```
    */
  self.maxProcessing = _maxProcessing.getset;

  /** @method PowerQueue.autostart Get setter for autostart
    * @param {boolean} [autorun] If not used this function works as a getter
    * @reactive
    * @returns {boolean} If adding a task may trigger the queue to start
    *
    * Example:
    ```js
      foo.autostart();    // Works as a getter and returns the current value
      foo.autostart(true);  // This sets the value to true
    ```
    */
  self.autostart = _autostart.getset;

  /** @method PowerQueue.maxFailures Get setter for maxFailures
    * @param {number} [max] If not used this function works as a getter
    * @reactive
    * @returns {number} The maximum for failures pr. task before triggering an error
    *
    * Example:
    ```js
      foo.maxFailures();    // Works as a getter and returns the current value
      foo.maxFailures(10);  // This sets the value to 10
    ```
    */
  self.maxFailures = _maxFailures.getset;

  /** @method PowerQueue.reset Reset the queue
    * Calling this will:
    * * stop the queue
    * * paused to false
    * * Discart all queue data
    *
    * > NOTE: At the moment if the queue has processing tasks they can change
    * > the `errors` and `failures` counters. This could change in the future or
    * > be prevented by creating a whole new instance of the `PowerQueue`
    */
  self.reset = function() {
    console.log(title + ' RESET');
    _running.set(false);
    _paused.set(false);

    // Loop through the processing tasks and reset these
    _processList.forEach(function(data) {
      if (data.queue instanceof PowerQueue) {
        // _isProcessing.dec();

        data.queue.reset();
      }
    }, true);
    _pausedSubQueues = false;
    // _processList.reset();
    _maxLength.set(0);
    _failures.set(0);
    _errors.set(0);
    invocations.reset();
  };

  /** @method PowerQueue.add
    * @param {any} data The task to be handled
    * @param {number} [failures] Internally used to Pass on number of failures.
    */
  self.add = function(data, failures, id, reversed) {
    var self = this;
    //console.log(title + ' ADD');
    invocations.add({ _id: id || _maxLength.value+1, data: data, failures: failures || 0 }, reversed);
    _maxLength.inc();
    // If we should start running the queue when tasks are added:
    if (!_paused.value && !_running.value && _autostart.value) {
      self.onAutostart();
      _running.set(true);
      self.next(null);
    } else if (_running.value && !_paused.value) {
      // Make sure that we use all available ressources
      self.next(null);
    }
  };

  /** @method PowerQueue.next
    * @param {string} [err] Error message if task failed
    * > * Can pass in `null` to start the queue
    * > * Passing in a string to `next` will trigger a failure
    * > * Passing nothing will simply let the next task run
    * `next` is handed into the [taskHandler](PowerQueue.taskHandler) as a
    * callback to mark an error or end of current task
    */
  self.next = function(err) {
    // If started with null then we are initialized by run
    if (err !== null && _isProcessing.value > 0) {
      _isProcessing.dec();
    }
    // If not paused and running then
    if (!_paused.value && _running.value) {
      // If room for more current in process
      for (var i = 0; (_maxProcessing.value > _isProcessing.value) && (invocations.length() > 0); i++) {
        // Increase counter of current number of tasks being processed
        _isProcessing.inc();
        // Spawn task
        (function(data) {
          Meteor.setTimeout(function() {
            // Run function
            self.runTask(data);
          }, 0);
        })(invocations.get()); // Get a task
      }

    }

    // Check if queue has released ressources
    if (_running.value && _isProcessing.value === 0 && err !== null && _paused.value) {
      self.onRelease(invocations.length());
    }

    // Check if queue is done working
    if (_running.value && _isProcessing.value === 0 && err !== null && !_paused.value) {
      // Stop the queue
      _running.set(false);
      invocations.reset();
      self.onEnded();
    }
  };

  /** @method PowerQueue.runTask
    * @private // This is not part of the open api
    * @param {object} invocation The object stored in the micro-queue
    */
  self.runTask = function(invocation) {
    var self = this;
    if (invocation.data instanceof PowerQueue) {
      _processList.insert(invocation._id, { id: invocation._id, queue: invocation.data });
    } else {
      _processList.insert(invocation._id, invocation.data);
    }
    function callback(error) {
      // Remove the invocation from the processing list

      if (typeof error !== 'undefined') {
        // If the task handler throws an error then add it to the queue again
        // we allow this for a max of _maxFailures
        if (error !== null) {
          // If the error is null then we add the task silently back into the
          // microQueue in reverse... This could be due to pause or throttling
          invocation.failures++;
          _failures.inc();
        }

        if (invocation.failures < _maxFailures.value) {
          // Add the task again with the increased failures
          self.add(invocation.data, invocation.failures, invocation._id, (error === null));
        } else {
          _errors.inc();
          self.errorHandler(invocation.data, self.add, invocation.failures);
        }

      }
      _processList.remove(invocation._id);
      self.next();
    }

    try {
      if (invocation.data instanceof PowerQueue) {
        self.queueTaskHandler(invocation.data, callback, invocation.failures);
      } else {
        self.taskHandler(invocation.data, callback, invocation.failures);
      }
    } catch(err) {
      throw new Error('Error while running taskHandler for queue, Error: ' + err.message);
    }
  };

  /** @method PowerQueue.queueTaskHandler
    * This method handles tasks that are sub queues
    */
  self.queueTaskHandler = function(data, next, failures) {
    data.onEnded = function() {
      // We simply trigger next task when the sub queue is complete
      next();
      // When running subqueues it doesnt make sense to track failures and retry
      // the sub queue - this is sub queue domain
    };

    data.onRelease = function(remaining) {
      // Ok, we were paused - this could be throttling so we respect this
      if (remaining > 0) {
        // We get out of the queue but dont repport error and add to run later
        next(null);
      }
    };

    data.run();
  };

  /** @callback PowerQueue.taskHandler
    * @param {any} data This can be data or functions
    * @param {function} next Function `next` call this to end task
    * @param {number} failures Number of failures on this task
    *
    * Default task handler expects functions as data:
    ```js
      self.taskHandler = function(data, next, failures) {
        // This default task handler expects invocation to be a function to run
        if (typeof data !== 'function') {
          throw new Error('Default task handler expects a function');
        }
        try {
          // Have the function call next
          data(next, failures);
        } catch(err) {
          // Throw to fail this task
          next('Default task handler could not run task, Error: ' + err.message);
        }
      };
    ```
    */

    // Can be overwrittin by the user
  self.taskHandler = function(data, next, failures) {
    // This default task handler expects invocation to be a function to run
    if (typeof data !== 'function') {
      throw new Error('Default task handler expects a function');
    }
    try {
      // Have the function call next
      data(next, failures);
    } catch(err) {
      // Throw to fail this task
      next('Default task handler could not run task, Error: ' + err.message);
    }
  };

  /** @callback PowerQueue.errorHandler
    * @param {any} data This can be data or functions
    * @param {function} addTask Use this function to insert the data into the queue again
    * @param {number} failures Number of failures on this task
    *
    * The default callback:
    ```js
      var foo = new PowerQueue();

      // Overwrite the default action
      foo.errorHandler = function(data, addTask, failures) {
        // This could be overwritten the data contains the task data and addTask
        // is a helper for adding the task to the queue
        // try again: addTask(data);
        // console.log('Terminate at ' + failures + ' failures');
      };
    ```
    */
  self.errorHandler = function(data, addTask, failures) {
    // This could be overwritten the data contains the task data and addTask
    // is a helper for adding the task to the queue
    // try again: addTask(data);
    console.log('Terminate at ' + failures + ' failures');
  };

  /** @method PowerQueue.pause Pause the queue
    * @todo We should have it pause all processing tasks
    */
  self.pause = function() {
    _paused.set(true);
    // Loop through the processing tasks and pause these
    _processList.forEach(function(data) {
      if (data.queue instanceof PowerQueue) {
        // Set the flag that we have paused sub queues
        _pausedSubQueues = true;
        // Pause the sub queue
        data.queue.pause();
      }
    }, true);
  };

  /** @method PowerQueue.resume Start a paused queue
    * @todo We should have it resume all processing tasks
    *
    * > This will not start a stopped queue
    */
  self.resume = function() {
    // Loop through the processing tasks and resume these
    if (_pausedSubQueues) {
      _processList.forEach(function(data) {
        if (data.queue instanceof PowerQueue) data.queue.resume();
      }, true);
    }
    // Reset the marker
    _pausedSubQueues = false;
    // Un pause the queue
    _paused.set(false);
    // Make sure we are up and running
    self.next(null);
  };

  /** @method PowerQueue.run Starts the queue
    * > Using this command will resume a paused queue and will
    * > start a stopped queue.
    */
  self.run = function() {
    //not paused and already running or queue empty or paused subqueues
    if (!_paused.value && _running.value || !invocations.length() && !_pausedSubQueues) {
      return;
    }

    if (_pausedSubQueues) {
      self.resume();
    } else {
      _paused.set(false);
      _running.set(true);
      self.next(null);
    }
  };

  // // Throttle subqueues
  // Deps.autorun(function() {
  //   var len = _isProcessing.get();
  //   var max = _maxProcessing.get();
  //   var diff = len-max;
  //   if (len < max) {
  //     // Room for more
  //     self.next();
  //   } else {
  //     // Too many tasks are processing, try to scan for sub queues to pause
  //     _processList.forEach(function(data) {
  //       if (diff > 0 && data.queue instanceof PowerQueue) {
  //         diff--;
  //         data.queue.pause();
  //       }
  //     });
  //   }
  // });
};

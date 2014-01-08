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
  * @param {number} [options.jumpOnFailure = true] Jump to next task and retry failed task later
  */
PowerQueue = function(options) {
  var self = this; var test = 5;

  // // Allow user to use another micro-queue #3
  // var ActiveQueue = options && options.queue || MicroQueue;

  // Default is fifo lilo
  var queueOrder = (options && options.filo || options && options.lifo)?
          { sort: function(a, b) { return a > b; } }: { /* Default is fifo */ };
  // var invocations = new ActiveQueue(options && options.filo || options && options.lifo);
  var invocations = new ReactiveList(queueOrder);

  // Max number of simultanious tasks being processed
  var _maxProcessing = new ReactiveProperty(options && options.maxProcessing || 1);

  // Reactive number of tasks being processed
  var _isProcessing = new ReactiveProperty(0);

  // Boolean indicating if queue is paused or not
  var _paused = new ReactiveProperty(options && options.isPaused || false);

  // Boolean indicator for queue status active / running (can still be paused)
  var _running = new ReactiveProperty(false);

  // Counter for errors, errors are triggered if maxFailures is exeeded
  var _errors = new ReactiveProperty(0);

  // Counter for task failures, contains error count
  var _failures = new ReactiveProperty(0);

  // On failure jump to new task - if false the current task is rerun until error
  var _jumpOnFailure = (options && options.jumpOnFailure === false)?false : true;

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
  self.length = function() {
    return invocations.length();
  };

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
    * ```js
    *   foo.maxProcessing();    // Works as a getter and returns the current value
    *   foo.maxProcessing(20);  // This sets the value to 20
    * ```
    */
  self.maxProcessing = _maxProcessing.getset;

  _maxProcessing.onChange = function() {
    // The user can change the max allowed processing tasks up or down here...
    // Update the throttle up
    self.updateThrottleUp();
    // Update the throttle down
    self.updateThrottleDown();
  };

  /** @method PowerQueue.autostart Get setter for autostart
    * @param {boolean} [autorun] If not used this function works as a getter
    * @reactive
    * @returns {boolean} If adding a task may trigger the queue to start
    *
    * Example:
    * ```js
    *   foo.autostart();    // Works as a getter and returns the current value
    *   foo.autostart(true);  // This sets the value to true
    * ```
    */
  self.autostart = _autostart.getset;

  /** @method PowerQueue.maxFailures Get setter for maxFailures
    * @param {number} [max] If not used this function works as a getter
    * @reactive
    * @returns {number} The maximum for failures pr. task before triggering an error
    *
    * Example:
    * ```js
    *   foo.maxFailures();    // Works as a getter and returns the current value
    *   foo.maxFailures(10);  // This sets the value to 10
    * ```
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
    invocations.reset();
    _processList.reset();

    // // Loop through the processing tasks and reset these
    // _processList.forEach(function(data) {
    //   if (data.queue instanceof PowerQueue) {
    //     data.queue.reset();
    //   }
    // }, true);
    _maxLength.set(0);
    _failures.set(0);
    _errors.set(0);
  };

  /** @method PowerQueue._autoStartTasks
    * @private
    *
    * This method defines the autostart algorithm that allows add task to trigger
    * a start of the queue if queue is not paused.
    */
  self._autoStartTasks = function() {
    var self = this;

    // We dont start anything by ourselfs if queue is paused
    if (!_paused.value) {

      // Queue is not running and we are set to autostart so we start the queue
      if (!_running.value && _autostart.value) {
        // Trigger callback / event
        self.onAutostart();
        // Set queue as running
        _running.set(true);
      }

      // Make sure that we use all available ressources
      if (_running.value) {
        // Call next to start up the queue
        self.next(null);
      }

    }
  };

  /** @method PowerQueue.add
    * @param {any} data The task to be handled
    * @param {number} [failures] Internally used to Pass on number of failures.
    */
  self.add = function(data, failures, id) {
    var self = this;

    // Assign new id to task
    var assignNewId = _jumpOnFailure || typeof id === 'undefined';

    // Set the task id
    var taskId = (assignNewId)? _maxLength.value+1 : id;

    // invocations.add({ _id: currentId, data: data, failures: failures || 0 }, reversed);
    invocations.insert(taskId, { _id: taskId, data: data, failures: failures || 0 });

    // If we assigned new id then increase length
    if (assignNewId) _maxLength.inc();

    self._autoStartTasks();
  };

  /** @method PowerQueue.updateThrottleUp
    * @private
    *
    * Calling this method will update the throttle on the queue adding tasks.
    *
    * > Note: Currently we only support the PowerQueue - but we could support
    * > a more general interface for pauseable tasks or other usecases.
    */
  self.updateThrottleUp = function() {
    // Calculate the differece between acutuall processing tasks and target
    var diff = _isProcessing.value - _maxProcessing.value;
    // If the difference is negative then process more tasks
    if (!_paused.value && _running.value && diff < 0) {
      // If room for more current in process
      for (var i = 0; (_maxProcessing.value > _isProcessing.value) && (invocations._length > 0); i++) {
        // Increase counter of current number of tasks being processed
        _isProcessing.inc();
        // Spawn task
        self.spawnTask(invocations.getFirstItem());
      }
    }

  };

  /** @method PowerQueue.updateThrottleDown
    * @private
    *
    * Calling this method will update the throttle on the queue pause tasks.
    *
    * > Note: Currently we only support the PowerQueue - but we could support
    * > a more general interface for pauseable tasks or other usecases.
    */
  self.updateThrottleDown = function() {
    // Calculate the differece between acutuall processing tasks and target
    var diff = _isProcessing.value - _maxProcessing.value;

    // If the diff is more than 0 then we have many tasks processing.
    if (diff > 0) {
      // We pause the latest added tasks
      _processList.forEachReverse(function(data) {
        if (diff > 0 && data.queue instanceof PowerQueue) {
          diff--;
          // We dont mind calling pause on multiple times on each task
          // theres a simple check going on preventing any duplicate actions
          data.queue.pause();
        }
      }, true);
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

    // Primary concern is to throttle up because we are either:
    // 1. Starting the queue
    // 2. Starting next task
    //
    // This function does not shut down running tasks
    self.updateThrottleUp();

    // We are running, no tasks are being processed even we just updated the
    // throttle up and we got no errors.
    // 1. We are paused and releasing tasks
    // 2. We are done
    if (_running.value && _isProcessing.value === 0 && err !== null) {

      // We have no tasks processing so this queue is now releasing resources
      // this could be that the queue is paused or stopped, in that case the
      // invocations._length would be > 0
      // If on the other hand the invocations._length is 0 then we have no more
      // tasks in the queue so the queue has ended
      self.onRelease(invocations._length);

      if (!invocations._length) { // !_paused.value &&
        // Check if queue is done working
        // Stop the queue
        _running.set(false);
        // invocations.reset(); // This should be implicit
        self.onEnded();
      }

    }
  };

  /** @method PowerQueue.spawnTask
    * @private
    *
    * This method spawns new task, this is an __internal__ method
    */
  self.spawnTask = function(data) {
    var self = this;
    Meteor.setTimeout(function() {
      // Run function
      self.runTask(data);
    }, 0);
  };

  /** @method PowerQueue.runTask
    * @private // This is not part of the open api
    * @param {object} invocation The object stored in the micro-queue
    */
  self.runTask = function(invocation) {
    var self = this;

    // Rig the callback function
    function callback(error) {
      // Remove the invocation from the processing list

      if (typeof error !== 'undefined' && error !== null) {
        // If the task handler throws an error then add it to the queue again
        // we allow this for a max of _maxFailures
        // If the error is null then we add the task silently back into the
        // microQueue in reverse... This could be due to pause or throttling
        invocation.failures++;
        _failures.inc();

        if (invocation.failures < _maxFailures.value) {
          // Add the task again with the increased failures
          self.add(invocation.data, invocation.failures, invocation._id);
        } else {
          _errors.inc();
          self.errorHandler(invocation.data, self.add, invocation.failures);
        }

      }

      // We use null to throttle pauseable tasks
      if (error === null) {
        // We add this task into the queue, no questions asked
        invocations.insert(invocation._id, invocation);
      }

      // Task has ended we remove the task from the process list
      _processList.remove(invocation._id);

      // Next task
      self.next();
    }

    // We start the fitting task handler
    // Currently we only support the PowerQueue but we could have a more general
    // interface for tasks that allow throttling
    try {
      if (invocation.data instanceof PowerQueue) {

        // Insert PowerQueue into process list
        _processList.insert(invocation._id, { id: invocation._id, queue: invocation.data });
        // Handle task
        self.queueTaskHandler(invocation.data, callback, invocation.failures);

      } else {

        // Insert task into process list
        _processList.insert(invocation._id, invocation.data);
        // Handle task
        self.taskHandler(invocation.data, callback, invocation.failures);

      }
    } catch(err) {
      throw new Error('Error while running taskHandler for queue, Error: ' + err.message);
    }
  };

  /** @method PowerQueue.queueTaskHandler
    * This method handles tasks that are sub queues
    */
  self.queueTaskHandler = function(subQueue, next, failures) {
    // Monitor sub queue task releases
    subQueue.onRelease = function(remaining) {
      // Ok, we were paused - this could be throttling so we respect this
      // So when the queue is halted we add it back into the main queue
      if (remaining > 0) {
        // We get out of the queue but dont repport error and add to run later
        next(null);
      } else {
        // Queue has ended
        // We simply trigger next task when the sub queue is complete
        next();
        // When running subqueues it doesnt make sense to track failures and retry
        // the sub queue - this is sub queue domain
      }
    };

    // Start the queue
    subQueue.run();
  };

  /** @callback PowerQueue.taskHandler
    * @param {any} data This can be data or functions
    * @param {function} next Function `next` call this to end task
    * @param {number} failures Number of failures on this task
    *
    * Default task handler expects functions as data:
    * ```js
    *   self.taskHandler = function(data, next, failures) {
    *     // This default task handler expects invocation to be a function to run
    *     if (typeof data !== 'function') {
    *       throw new Error('Default task handler expects a function');
    *     }
    *     try {
    *       // Have the function call next
    *       data(next, failures);
    *     } catch(err) {
    *       // Throw to fail this task
    *       next('Default task handler could not run task, Error: ' + err.message);
    *     }
    *   };
    * ```
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
    * ```js
    *   var foo = new PowerQueue();
    *
    *   // Overwrite the default action
    *   foo.errorHandler = function(data, addTask, failures) {
    *     // This could be overwritten the data contains the task data and addTask
    *     // is a helper for adding the task to the queue
    *     // try again: addTask(data);
    *     // console.log('Terminate at ' + failures + ' failures');
    *   };
    * ```
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
    if (!_paused.value) {

      _paused.set(true);
      // Loop through the processing tasks and pause these
      _processList.forEach(function(data) {
        if (data.queue instanceof PowerQueue) {
          // Pause the sub queue
          data.queue.pause();
        }
      }, true);
    }
  };

  /** @method PowerQueue.resume Start a paused queue
    * @todo We should have it resume all processing tasks
    *
    * > This will not start a stopped queue
    */
  self.resume = function() {
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
    if (!_paused.value && _running.value || !invocations._length) {
      return;
    }

    _paused.set(false);
    _running.set(true);
    self.next(null);
  };

};

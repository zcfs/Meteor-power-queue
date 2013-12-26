/**
  * Creates an instance of a power queue
  * [Check out demo]{@link http://power-queue-test.meteor.com/}
  * @constructor
  * @this {PowerQueue}
  * @param {object} [options] Settings
  * @param {boolean} [options.filo=false] Make it a first in last out queue
  * @param {boolean} [options.isPaused=false] Set queue paused
  * @param {boolean} [options.autostart=true] May adding a task start the queue
  * @param {string} [options.name="Queue"] Name of the queue
  * @param {number} [options.maxProcessing=1] Limit of simultanous running tasks
  * @param {number} [options.maxFailures=5] Limit retries of failed tasks
  */
PowerQueue = function(options) {
  var self = this;

  /** private */ var activeQueue = options && options.queue || microQueue; // Allow user to use another micro-queue #3

  /** private */ var invocations = new activeQueue(options && options.filo || options && options.lifo); // Default is fifo lilo

  /** private */ var _maxProcessing = new reactiveProperty(options && options.maxProcessing || 1);

  /** private */ var _isProcessing = new reactiveProperty(0);

  /** private */ var _paused = new reactiveProperty(options && options.isPaused || false);

  /** private */ var _running = new reactiveProperty(false);

  /** private */ var _errors = new reactiveProperty(0);

  /** private */ var _failures = new reactiveProperty(0);

  /** private */ var _maxLength = new reactiveProperty(0);

  /** private */ var _autostart = new reactiveProperty((options && options.autostart === false)?false : true);

  /** private */ var _maxFailures = new reactiveProperty(options && options.maxFailures || 5);

  /** private */ var title = options && options.name || 'Queue';

  self.onEnded = options && options.onEnded || function() { console.log(title + ' ENDED'); };

  self.onAutostart = options && options.onAutostart || function() { console.log(title + ' Autostart'); };

  self.length = invocations.length;

  self.progress = function() {
    var progress = _maxLength.get()-invocations.length();
    if (_maxLength.get() > 0) {
      return Math.round( progress / _maxLength.get() * 100);
    }
    return 0;
  };

  self.usage = function() {
    return Math.round(_isProcessing.get() / _maxProcessing.get() * 100);
  };

  self.total = _maxLength.get;

  self.isPaused = _paused.get;

  self.processing = _isProcessing.get;

  self.errors = _errors.get;

  self.failures = _failures.get;

  self.isRunning = _running.get;

  // Get setter for max parallel
  self.maxProcessing = _maxProcessing.getset;

  // Get setter for max autostart
  self.autostart = _autostart.getset;

  // Get setter for maxFailures
  self.maxFailures = _maxFailures.getset;

  self.reset = function() {
    console.log(title + ' RESET');
    _running.set(false);
    _paused.set(false);
    _maxLength.set(0);
    _failures.set(0);
    _errors.set(0);
    invocations.reset();
  };

  self.add = function(data, failures) {
    var self = this;
    //console.log(title + ' ADD');
    invocations.add({ data: data, failures: failures || 0 });
    _maxLength.inc();
    // If we should start running the queue when tasks are added:
    if (!_paused.get() && !_running.get() && _autostart.get()) {
      self.onAutostart();
      _running.set(true);
      self.next(null);
    }
  };

  self.next = function(err) {
    // If started with null then we are initialized by run
    if (err !== null && _isProcessing.get() > 0) {
      _isProcessing.dec();
    }

    // If not paused and running then
    if (!_paused.get() && _running.get()) {
      // If room for more current in process
      for (var i = 0; (_maxProcessing.get() > _isProcessing.get()) && (invocations.length() > 0); i++) {
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

    // Check if queue is done working
    if (_running.get() && _isProcessing.get() === 0 && err !== null && !_paused.get()) {
      // Stop the queue
      _running.set(false);
      invocations.reset();
      self.onEnded();
    }
  };

  self.runTask = function(invocation) {
    var self = this;

    function callback(error) {
      if (typeof error !== 'undefined') {
        // If the task handler throws an error then add it to the queue again
        // we allow this for a max of _maxFailures
        invocation.failures++;
        _failures.inc();
        if (invocation.failures < _maxFailures.get()) {
          // Add the task again with the increased failures
          self.add(invocation.data, invocation.failures);
        } else {
          _errors.inc();
          self.errorHandler(invocation.data, self.add, invocation.failures);
        }
      }

      self.next();
    }

    try {
      self.taskHandler(invocation.data, callback, invocation.failures);
    } catch(err) {
      throw new Error('Error while running taskHandler for queue, Error: ' + err.message);
    }
  };

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

  self.errorHandler = function(data, addTask, failures) {
    // This could be overwritten the data contains the task data and addTask
    // is a helper for adding the task to the queue
    // try again: addTask(data);
    console.log('Terminate at ' + failures + ' failures');
  };

  self.pause = function() {
    _paused.set(true);
  };

  self.run = function() {
    //not paused and already running or queue empty
    if (!_paused.get() && _running.get() || !invocations.length()) {
      return;
    }
    console.log(title + ' RUN');
    _paused.set(false);
    _running.set(true);
    self.next(null);
  };
};

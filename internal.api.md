> File: ["power-queue.js"](power-queue.js)
> Where: {client|server}

-

#### <a name="PowerQueue"></a>new PowerQueue([options])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
```
Creates an instance of a power queue 
[Check out demo](http://power-queue-test.meteor.com/)
```
-

__Arguments__

* __options__ *{object}*    (Optional)
Settings
    - __filo__ *{boolean}*    (Default = false)
Make it a first in last out queue
    - __isPaused__ *{boolean}*    (Default = false)
Set queue paused
    - __autostart__ *{boolean}*    (Default = true)
May adding a task start the queue
    - __name__ *{string}*    (Default = "Queue")
Name of the queue
    - __maxProcessing__ *{number}*    (Default = 1)
Limit of simultanous running tasks
    - __maxFailures__ *{number}*    (Default = 5)
Limit retries of failed tasks
    - __jumpOnFailure__ *{number}*    (Default = true)
Jump to next task and retry failed task later
    - __debug__ *{boolean}*    (Default = false)
Verbose messages in the console.log
    - __reactive__ *{boolean}*    (Default = true)
Set whether or not this queue should be reactive
    - __spinalQueue__ *{[SpinalQueue](spinal-queue.spec.md)}*    (Optional)
Set spinal queue uses pr. default `MicroQueue` or `ReactiveList` if added to the project

-


> ```PowerQueue = function(options) { ...``` [power-queue.js:26](power-queue.js#L26)

-

#### <a name="PowerQueue.onEnded"></a>*powerqueue*.onEnded&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __onEnded__ is defined in `PowerQueue`*
Is called when queue is ended

> ```self.onEnded = options && options.onEnded || function() { ...``` [power-queue.js:102](power-queue.js#L102)

-

#### <a name="PowerQueue.onRelease"></a>*powerqueue*.onRelease&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __onRelease__ is defined in `PowerQueue`*
Is called when queue is released

> ```self.onRelease = options && options.onRelease || function() { ...``` [power-queue.js:109](power-queue.js#L109)

-

#### <a name="PowerQueue.onAutostart"></a>*powerqueue*.onAutostart&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __onAutostart__ is defined in `PowerQueue`*
Is called when queue is auto started

> ```self.onAutostart = options && options.onAutostart || function() { ...``` [power-queue.js:114](power-queue.js#L114)

-

#### <a name="PowerQueue.total"></a>*powerqueue*.total()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __total__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
The total number of tasks added to this queue

> ```self.total = self._maxLength.get;``` [power-queue.js:122](power-queue.js#L122)

-

#### <a name="PowerQueue.isPaused"></a>*powerqueue*.isPaused()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __isPaused__ is defined in `PowerQueue`*

__Returns__  *{boolean}*  __(is reactive)__
Status of the paused state of the queue

> ```self.isPaused = self._paused.get;``` [power-queue.js:128](power-queue.js#L128)

-

#### <a name="PowerQueue.processing"></a>*powerqueue*.processing()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __processing__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
Number of tasks currently being processed

> ```self.processing = self._isProcessing.get;``` [power-queue.js:134](power-queue.js#L134)

-

#### <a name="PowerQueue.errors"></a>*powerqueue*.errors()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __errors__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
The total number of errors
Errors are triggered when [maxFailures](PowerQueue.maxFailures) are exeeded

> ```self.errors = self._errors.get;``` [power-queue.js:141](power-queue.js#L141)

-

#### <a name="PowerQueue.failures"></a>*powerqueue*.failures()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __failures__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
The total number of failed tasks

> ```self.failures = self._failures.get;``` [power-queue.js:147](power-queue.js#L147)

-

#### <a name="PowerQueue.isRunning"></a>*powerqueue*.isRunning()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __isRunning__ is defined in `PowerQueue`*

__Returns__  *{boolean}*  __(is reactive)__
True if the queue is running
> NOTE: The task can be paused but marked as running

> ```self.isRunning = self._running.get;``` [power-queue.js:154](power-queue.js#L154)

-

#### <a name="PowerQueue.maxProcessing"></a>*powerqueue*.maxProcessing([max])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __maxProcessing__ is defined in `PowerQueue`*

__Arguments__

* __max__ *{number}*    (Optional)
If not used this function works as a getter

-

__Returns__  *{number}*  __(is reactive)__
Maximum number of simultaneous processing tasks

Example:
```js
  foo.maxProcessing();    // Works as a getter and returns the current value
  foo.maxProcessing(20);  // This sets the value to 20
```

> ```self.maxProcessing = self._maxProcessing.getset;``` [power-queue.js:167](power-queue.js#L167)

-

#### <a name="PowerQueue.autostart"></a>*powerqueue*.autostart([autorun])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __autostart__ is defined in `PowerQueue`*

__Arguments__

* __autorun__ *{boolean}*    (Optional)
If not used this function works as a getter

-

__Returns__  *{boolean}*  __(is reactive)__
If adding a task may trigger the queue to start

Example:
```js
  foo.autostart();    // Works as a getter and returns the current value
  foo.autostart(true);  // This sets the value to true
```

> ```self.autostart = self._autostart.getset;``` [power-queue.js:188](power-queue.js#L188)

-

#### <a name="PowerQueue.maxFailures"></a>*powerqueue*.maxFailures([max])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __maxFailures__ is defined in `PowerQueue`*

__Arguments__

* __max__ *{number}*    (Optional)
If not used this function works as a getter

-

__Returns__  *{number}*  __(is reactive)__
The maximum for failures pr. task before triggering an error

Example:
```js
  foo.maxFailures();    // Works as a getter and returns the current value
  foo.maxFailures(10);  // This sets the value to 10
```

> ```self.maxFailures = self._maxFailures.getset;``` [power-queue.js:201](power-queue.js#L201)

-

#### <a name="PowerQueue.prototype.processList"></a>*powerqueue*.processList()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __processList__ is defined in `prototype` of `PowerQueue`*

__Returns__  *{array}*  __(is reactive)__
List of tasks currently being processed

> ```PowerQueue.prototype.processingList = function() { ...``` [power-queue.js:208](power-queue.js#L208)

-

#### <a name="PowerQueue.prototype.isHalted"></a>*powerqueue*.isHalted()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __isHalted__ is defined in `prototype` of `PowerQueue`*

__Returns__  *{boolean}*  __(is reactive)__
True if the queue is not running or paused

> ```PowerQueue.prototype.isHalted = function() { ...``` [power-queue.js:217](power-queue.js#L217)

-

#### <a name="PowerQueue.prototype.length"></a>*powerqueue*.length()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __length__ is defined in `prototype` of `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
Number of tasks left in queue to be processed

> ```PowerQueue.prototype.length = function() { ...``` [power-queue.js:226](power-queue.js#L226)

-

#### <a name="PowerQueue.prototype.progress"></a>*powerqueue*.progress()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __progress__ is defined in `prototype` of `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
0 .. 100 % Indicates the status of the queue

> ```PowerQueue.prototype.progress = function() { ...``` [power-queue.js:235](power-queue.js#L235)

-

#### <a name="PowerQueue.prototype.usage"></a>*powerqueue*.usage()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __usage__ is defined in `prototype` of `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
0 .. 100 % Indicates ressource usage of the queue

> ```PowerQueue.prototype.usage = function() { ...``` [power-queue.js:248](power-queue.js#L248)

-

#### <a name="PowerQueue.prototype.reset"></a>*powerqueue*.reset()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __reset__ is defined in `prototype` of `PowerQueue`*
Calling this will:
* stop the queue
* paused to false
* Discart all queue data

> NOTE: At the moment if the queue has processing tasks they can change
> the `errors` and `failures` counters. This could change in the future or
> be prevented by creating a whole new instance of the `PowerQueue`

> ```PowerQueue.prototype.reset = function() { ...``` [power-queue.js:263](power-queue.js#L263)

-

#### <a name="PowerQueue._autoStartTasks"></a>*powerqueue*._autoStartTasks()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method is private*
*This method ___autoStartTasks__ is defined in `PowerQueue`*

This method defines the autostart algorithm that allows add task to trigger
a start of the queue if queue is not paused.

> ```PowerQueue.prototype._autoStartTasks = function() { ...``` [power-queue.js:288](power-queue.js#L288)

-

#### <a name="PowerQueue.prototype.add"></a>*powerqueue*.add(data, [failures])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __add__ is defined in `prototype` of `PowerQueue`*

__Arguments__

* __data__ *{any}*  
The task to be handled
* __failures__ *{number}*    (Optional)
Internally used to Pass on number of failures.

-

> ```PowerQueue.prototype.add = function(data, failures, id) { ...``` [power-queue.js:315](power-queue.js#L315)

-

#### <a name="PowerQueue.prototype.updateThrottleUp"></a>*powerqueue*.updateThrottleUp()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method is private*
*This method __updateThrottleUp__ is defined in `prototype` of `PowerQueue`*

Calling this method will update the throttle on the queue adding tasks.

> Note: Currently we only support the PowerQueue - but we could support
> a more general interface for pauseable tasks or other usecases.

> ```PowerQueue.prototype.updateThrottleUp = function() { ...``` [power-queue.js:341](power-queue.js#L341)

-

#### <a name="PowerQueue.prototype.updateThrottleDown"></a>*powerqueue*.updateThrottleDown()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method is private*
*This method __updateThrottleDown__ is defined in `prototype` of `PowerQueue`*

Calling this method will update the throttle on the queue pause tasks.

> Note: Currently we only support the PowerQueue - but we could support
> a more general interface for pauseable tasks or other usecases.

> ```PowerQueue.prototype.updateThrottleDown = function() { ...``` [power-queue.js:366](power-queue.js#L366)

-

#### <a name="PowerQueue.prototype.next"></a>*powerqueue*.next([err])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __next__ is defined in `prototype` of `PowerQueue`*

__Arguments__

* __err__ *{string}*    (Optional)
Error message if task failed

-
> * Can pass in `null` to start the queue
> * Passing in a string to `next` will trigger a failure
> * Passing nothing will simply let the next task run
`next` is handed into the [taskHandler](PowerQueue.taskHandler) as a
callback to mark an error or end of current task

> ```PowerQueue.prototype.next = function(err) { ...``` [power-queue.js:393](power-queue.js#L393)

-

#### <a name="done"></a>done&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-

__Arguments__

* __feedback__ *{[Meteor.Error ](#Meteor.Error )|[ Error ](# Error )|[ String ](# String )|[ null](# null)}*    (Optional)
This allows the task to communicate with the queue

-

Explaination of `feedback`
* `Meteor.Error` This means that the task failed in a controlled manner and is allowed to rerun
* `Error` This will throw the passed error - as its an unitended error
* `null` The task is not done yet, rerun later
* `String` The task can perform certain commands on the queue
   * "pause" - pause the queue
   * "stop" - stop the queue
   * "reset" - reset the queue
   * "cancel" - cancel the queue


> ```PowerQueue.prototype.runTaskDone = function(feedback, invocation) { ...``` [power-queue.js:451](power-queue.js#L451)

-

#### <a name="PowerQueue.prototype.runTaskDone"></a>*powerqueue*.runTaskDone([feedback], invocation)&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method is private*
*This method __runTaskDone__ is defined in `prototype` of `PowerQueue`*

__Arguments__

* __feedback__ *{[Meteor.Error ](#Meteor.Error )|[ Error ](# Error )|[ String ](# String )|[ null](# null)}*    (Optional)
This allows the task to communicate with the queue
* __invocation__ *{object}*  

-

> Note: `feedback` is explained in [Done callback](#done)


> ```PowerQueue.prototype.runTaskDone = function(feedback, invocation) { ...``` [power-queue.js:451](power-queue.js#L451)

-

#### <a name="PowerQueue.prototype.runTask"></a>*powerqueue*.runTask(invocation)&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method is private*
*This method __runTask__ is defined in `prototype` of `PowerQueue`*

__Arguments__

* __invocation__ *{object}*  
The object stored in the micro-queue

-

> ```PowerQueue.prototype.runTask = function(invocation) { ...``` [power-queue.js:519](power-queue.js#L519)

-

#### <a name="PowerQueue.prototype.queueTaskHandler"></a>*powerqueue*.queueTaskHandler()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __queueTaskHandler__ is defined in `prototype` of `PowerQueue`*
This method handles tasks that are sub queues

> ```PowerQueue.prototype.queueTaskHandler = function(subQueue, next, failures) { ...``` [power-queue.js:553](power-queue.js#L553)

-

#### <a name="PowerQueue.prototype.taskHandler"></a>*powerqueue*.taskHandler&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __taskHandler__ is defined in `prototype` of `PowerQueue`*

__Arguments__

* __data__ *{any}*  
This can be data or functions
* __next__ *{function}*  
Function `next` call this to end task
* __failures__ *{number}*  
Number of failures on this task

-

Default task handler expects functions as data:
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
      next(err);
    }
  };
```

> ```PowerQueue.prototype.taskHandler = function(data, next, failures) { ...``` [power-queue.js:599](power-queue.js#L599)

-

#### <a name="PowerQueue.prototype.errorHandler"></a>*powerqueue*.errorHandler&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __errorHandler__ is defined in `prototype` of `PowerQueue`*

__Arguments__

* __data__ *{any}*  
This can be data or functions
* __addTask__ *{function}*  
Use this function to insert the data into the queue again
* __failures__ *{number}*  
Number of failures on this task

-

The default callback:
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

> ```PowerQueue.prototype.errorHandler = function(data, addTask, failures) { ...``` [power-queue.js:632](power-queue.js#L632)

-

#### <a name="PowerQueue.prototype.pause"></a>*powerqueue*.pause()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __pause__ is defined in `prototype` of `PowerQueue`*

__TODO__
```
* We should have it pause all processing tasks
```

> ```PowerQueue.prototype.pause = function() { ...``` [power-queue.js:643](power-queue.js#L643)

-

#### <a name="PowerQueue.prototype.resume"></a>*powerqueue*.resume()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __resume__ is defined in `prototype` of `PowerQueue`*

__TODO__
```
* We should have it resume all processing tasks
```

> This will not start a stopped queue

> ```PowerQueue.prototype.resume = function() { ...``` [power-queue.js:663](power-queue.js#L663)

-

#### <a name="PowerQueue.prototype.run"></a>*powerqueue*.run()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __run__ is defined in `prototype` of `PowerQueue`*
> Using this command will resume a paused queue and will
> start a stopped queue.

> ```PowerQueue.prototype.run = function() { ...``` [power-queue.js:675](power-queue.js#L675)

-

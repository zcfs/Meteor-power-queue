
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
    - __spinalQueue__ *{[SpinalQueue](spinal-queue.spec.md)}*    (Optional)
Set spinal queue uses pr. default `MicroQueue` or `ReactiveList` if added to the project

-


> ```PowerQueue = function(options) { ...``` [power-queue.js:25](power-queue.js#L25)

-

#### <a name="PowerQueue.onEnded"></a>*powerqueue*.onEnded&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __onEnded__ is defined in `PowerQueue`*
Is called when queue is ended

> ```self.onEnded = options && options.onEnded || function() { ...``` [power-queue.js:93](power-queue.js#L93)

-

#### <a name="PowerQueue.onRelease"></a>*powerqueue*.onRelease&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __onRelease__ is defined in `PowerQueue`*
Is called when queue is released

> ```self.onRelease = options && options.onRelease || function() { ...``` [power-queue.js:100](power-queue.js#L100)

-

#### <a name="PowerQueue.onAutostart"></a>*powerqueue*.onAutostart&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __onAutostart__ is defined in `PowerQueue`*
Is called when queue is auto started

> ```self.onAutostart = options && options.onAutostart || function() { ...``` [power-queue.js:105](power-queue.js#L105)

-

#### <a name="PowerQueue.length"></a>*powerqueue*.length()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __length__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
Number of tasks left in queue to be processed

> ```self.length = function() { ...``` [power-queue.js:113](power-queue.js#L113)

-

#### <a name="PowerQueue.progress"></a>*powerqueue*.progress()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __progress__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
0 .. 100 % Indicates the status of the queue

> ```self.progress = function() { ...``` [power-queue.js:121](power-queue.js#L121)

-

#### <a name="PowerQueue.usage"></a>*powerqueue*.usage()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __usage__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
0 .. 100 % Indicates ressource usage of the queue

> ```self.usage = function() { ...``` [power-queue.js:133](power-queue.js#L133)

-

#### <a name="PowerQueue.total"></a>*powerqueue*.total()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __total__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
The total number of tasks added to this queue

> ```self.total = _maxLength.get;``` [power-queue.js:141](power-queue.js#L141)

-

#### <a name="PowerQueue.isPaused"></a>*powerqueue*.isPaused()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __isPaused__ is defined in `PowerQueue`*

__Returns__  *{boolean}*  __(is reactive)__
Status of the paused state of the queue

> ```self.isPaused = _paused.get;``` [power-queue.js:147](power-queue.js#L147)

-

#### <a name="PowerQueue.processing"></a>*powerqueue*.processing()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __processing__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
Number of tasks currently being processed

> ```self.processing = _isProcessing.get;``` [power-queue.js:153](power-queue.js#L153)

-

#### <a name="PowerQueue.processList"></a>*powerqueue*.processList()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __processList__ is defined in `PowerQueue`*

__Returns__  *{array}*  __(is reactive)__
List of tasks currently being processed

> ```self.processingList = function() { ...``` [power-queue.js:159](power-queue.js#L159)

-

#### <a name="PowerQueue.errors"></a>*powerqueue*.errors()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __errors__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
The total number of errors
Errors are triggered when [maxFailures](PowerQueue.maxFailures) are exeeded

> ```self.errors = _errors.get;``` [power-queue.js:168](power-queue.js#L168)

-

#### <a name="PowerQueue.failures"></a>*powerqueue*.failures()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __failures__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
The total number of failed tasks

> ```self.failures = _failures.get;``` [power-queue.js:174](power-queue.js#L174)

-

#### <a name="PowerQueue.isRunning"></a>*powerqueue*.isRunning()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __isRunning__ is defined in `PowerQueue`*

__Returns__  *{boolean}*  __(is reactive)__
True if the queue is running
> NOTE: The task can be paused but marked as running

> ```self.isRunning = _running.get;``` [power-queue.js:181](power-queue.js#L181)

-

#### <a name="PowerQueue.isHalted"></a>*powerqueue*.isHalted()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __isHalted__ is defined in `PowerQueue`*

__Returns__  *{boolean}*  __(is reactive)__
True if the queue is not running or paused

> ```self.isHalted = function() { ...``` [power-queue.js:187](power-queue.js#L187)

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

> ```self.maxProcessing = _maxProcessing.getset;``` [power-queue.js:202](power-queue.js#L202)

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

> ```self.autostart = _autostart.getset;``` [power-queue.js:223](power-queue.js#L223)

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

> ```self.maxFailures = _maxFailures.getset;``` [power-queue.js:236](power-queue.js#L236)

-

#### <a name="PowerQueue.reset"></a>*powerqueue*.reset()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __reset__ is defined in `PowerQueue`*
Calling this will:
* stop the queue
* paused to false
* Discart all queue data

> NOTE: At the moment if the queue has processing tasks they can change
> the `errors` and `failures` counters. This could change in the future or
> be prevented by creating a whole new instance of the `PowerQueue`

> ```self.reset = function() { ...``` [power-queue.js:248](power-queue.js#L248)

-

#### <a name="PowerQueue.add"></a>*powerqueue*.add(data, [failures])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __add__ is defined in `PowerQueue`*

__Arguments__

* __data__ *{any}*  
The task to be handled
* __failures__ *{number}*    (Optional)
Internally used to Pass on number of failures.

-

> ```self.add = function(data, failures, id) { ...``` [power-queue.js:299](power-queue.js#L299)

-

#### <a name="PowerQueue.next"></a>*powerqueue*.next([err])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __next__ is defined in `PowerQueue`*

__Arguments__

* __err__ *{string}*    (Optional)
Error message if task failed

-
> * Can pass in `null` to start the queue
> * Passing in a string to `next` will trigger a failure
> * Passing nothing will simply let the next task run
`next` is handed into the [taskHandler](PowerQueue.taskHandler) as a
callback to mark an error or end of current task

> ```self.next = function(err) { ...``` [power-queue.js:379](power-queue.js#L379)

-

#### <a name="PowerQueue.queueTaskHandler"></a>*powerqueue*.queueTaskHandler()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __queueTaskHandler__ is defined in `PowerQueue`*
This method handles tasks that are sub queues

> ```self.queueTaskHandler = function(subQueue, next, failures) { ...``` [power-queue.js:520](power-queue.js#L520)

-

#### <a name="PowerQueue.taskHandler"></a>*powerqueue*.taskHandler&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __taskHandler__ is defined in `PowerQueue`*

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
      next('Default task handler could not run task, Error: ' + err.message);
    }
  };
```

> ```self.taskHandler = function(data, next, failures) { ...``` [power-queue.js:565](power-queue.js#L565)

-

#### <a name="PowerQueue.errorHandler"></a>*powerqueue*.errorHandler&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __errorHandler__ is defined in `PowerQueue`*

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

> ```self.errorHandler = function(data, addTask, failures) { ...``` [power-queue.js:597](power-queue.js#L597)

-

#### <a name="PowerQueue.pause"></a>*powerqueue*.pause()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __pause__ is defined in `PowerQueue`*

> ```self.pause = function() { ...``` [power-queue.js:607](power-queue.js#L607)

-

#### <a name="PowerQueue.resume"></a>*powerqueue*.resume()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __resume__ is defined in `PowerQueue`*

> This will not start a stopped queue

> ```self.resume = function() { ...``` [power-queue.js:626](power-queue.js#L626)

-

#### <a name="PowerQueue.run"></a>*powerqueue*.run()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __run__ is defined in `PowerQueue`*
> Using this command will resume a paused queue and will
> start a stopped queue.

> ```self.run = function() { ...``` [power-queue.js:637](power-queue.js#L637)

-

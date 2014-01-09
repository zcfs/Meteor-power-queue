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
    - __spinalQueue__ *{[SpinalQueue](spinal-queue.spec.md)}*    (Optional)
Set spinal queue uses pr. default `MicroQueue` or `ReactiveList` if added to the project

-

> ```PowerQueue = function(options) { ...``` [power-queue.js:24](power-queue.js#L24)

-

#### <a name="PowerQueue.onEnded"></a>*powerqueue*.onEnded&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __onEnded__ is defined in `PowerQueue`*
Is called when queue is ended

> ```self.onEnded = options && options.onEnded || function() { ...``` [power-queue.js:88](power-queue.js#L88)

-

#### <a name="PowerQueue.onEnded"></a>*powerqueue*.onEnded&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __onEnded__ is defined in `PowerQueue`*
Is called when queue is ended

> ```self.onRelease = options && options.onRelease || function() { ...``` [power-queue.js:93](power-queue.js#L93)

-

#### <a name="PowerQueue.onAutostart"></a>*powerqueue*.onAutostart&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __onAutostart__ is defined in `PowerQueue`*
Is called when queue is auto started

> ```self.onAutostart = options && options.onAutostart || function() { ...``` [power-queue.js:98](power-queue.js#L98)

-

#### <a name="PowerQueue.length"></a>*powerqueue*.length()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __length__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
Number of tasks left in queue to be processed

> ```self.length = function() { ...``` [power-queue.js:104](power-queue.js#L104)

-

#### <a name="PowerQueue.progress"></a>*powerqueue*.progress()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __progress__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
0 .. 100 % Indicates the status of the queue

> ```self.progress = function() { ...``` [power-queue.js:112](power-queue.js#L112)

-

#### <a name="PowerQueue.usage"></a>*powerqueue*.usage()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __usage__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
0 .. 100 % Indicates ressource usage of the queue

> ```self.usage = function() { ...``` [power-queue.js:124](power-queue.js#L124)

-

#### <a name="PowerQueue.total"></a>*powerqueue*.total()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __total__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
The total number of tasks added to this queue

> ```self.total = _maxLength.get;``` [power-queue.js:132](power-queue.js#L132)

-

#### <a name="PowerQueue.isPaused"></a>*powerqueue*.isPaused()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __isPaused__ is defined in `PowerQueue`*

__Returns__  *{boolean}*  __(is reactive)__
Status of the paused state of the queue

> ```self.isPaused = _paused.get;``` [power-queue.js:138](power-queue.js#L138)

-

#### <a name="PowerQueue.processing"></a>*powerqueue*.processing()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __processing__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
Number of tasks currently being processed

> ```self.processing = _isProcessing.get;``` [power-queue.js:144](power-queue.js#L144)

-

#### <a name="PowerQueue.processList"></a>*powerqueue*.processList()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __processList__ is defined in `PowerQueue`*

__Returns__  *{array}*  __(is reactive)__
List of tasks currently being processed

> ```self.processingList = function() { ...``` [power-queue.js:150](power-queue.js#L150)

-

#### <a name="PowerQueue.errors"></a>*powerqueue*.errors()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __errors__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
The total number of errors
Errors are triggered when [maxFailures](PowerQueue.maxFailures) are exeeded

> ```self.errors = _errors.get;``` [power-queue.js:159](power-queue.js#L159)

-

#### <a name="PowerQueue.failures"></a>*powerqueue*.failures()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __failures__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
The total number of failed tasks

> ```self.failures = _failures.get;``` [power-queue.js:165](power-queue.js#L165)

-

#### <a name="PowerQueue.isRunning"></a>*powerqueue*.isRunning()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __isRunning__ is defined in `PowerQueue`*

__Returns__  *{boolean}*  __(is reactive)__
True if the queue is running
> NOTE: The task can be paused but marked as running

> ```self.isRunning = _running.get;``` [power-queue.js:172](power-queue.js#L172)

-

#### <a name="PowerQueue.isHalted"></a>*powerqueue*.isHalted()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __isHalted__ is defined in `PowerQueue`*

__Returns__  *{boolean}*  __(is reactive)__
True if the queue is not running or paused

> ```self.isHalted = function() { ...``` [power-queue.js:178](power-queue.js#L178)

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

> ```self.maxProcessing = _maxProcessing.getset;``` [power-queue.js:193](power-queue.js#L193)

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

> ```self.autostart = _autostart.getset;``` [power-queue.js:214](power-queue.js#L214)

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

> ```self.maxFailures = _maxFailures.getset;``` [power-queue.js:227](power-queue.js#L227)

-

#### <a name="PowerQueue.reset"></a>*powerqueue*.reset()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __reset__ is defined in `PowerQueue`*
Calling this will:
stop the queue
paused to false
Discart all queue data
> NOTE: At the moment if the queue has processing tasks they can change
> the `errors` and `failures` counters. This could change in the future or
> be prevented by creating a whole new instance of the `PowerQueue`

> ```self.reset = function() { ...``` [power-queue.js:239](power-queue.js#L239)

-

#### <a name="PowerQueue._autoStartTasks"></a>*powerqueue*._autoStartTasks()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method is private*
*This method ___autoStartTasks__ is defined in `PowerQueue`*
This method defines the autostart algorithm that allows add task to trigger
a start of the queue if queue is not paused.

> ```self._autoStartTasks = function() { ...``` [power-queue.js:263](power-queue.js#L263)

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

> ```self.add = function(data, failures, id) { ...``` [power-queue.js:290](power-queue.js#L290)

-

#### <a name="PowerQueue.updateThrottleUp"></a>*powerqueue*.updateThrottleUp()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method is private*
*This method __updateThrottleUp__ is defined in `PowerQueue`*
Calling this method will update the throttle on the queue adding tasks.
> Note: Currently we only support the PowerQueue - but we could support
> a more general interface for pauseable tasks or other usecases.

> ```self.updateThrottleUp = function() { ...``` [power-queue.js:316](power-queue.js#L316)

-

#### <a name="PowerQueue.updateThrottleDown"></a>*powerqueue*.updateThrottleDown()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method is private*
*This method __updateThrottleDown__ is defined in `PowerQueue`*
Calling this method will update the throttle on the queue pause tasks.
> Note: Currently we only support the PowerQueue - but we could support
> a more general interface for pauseable tasks or other usecases.

> ```self.updateThrottleDown = function() { ...``` [power-queue.js:340](power-queue.js#L340)

-

#### <a name="PowerQueue.next"></a>*powerqueue*.next([err])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __next__ is defined in `PowerQueue`*

__Arguments__

* __err__ *{string}*    (Optional)
Error message if task failed

-
Can pass in `null` to start the queue
Passing in a string to `next` will trigger a failure
Passing nothing will simply let the next task run
`next` is handed into the [taskHandler](PowerQueue.taskHandler) as a
callback to mark an error or end of current task

> ```self.next = function(err) { ...``` [power-queue.js:366](power-queue.js#L366)

-

#### <a name="PowerQueue.spawnTask"></a>*powerqueue*.spawnTask()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method is private*
*This method __spawnTask__ is defined in `PowerQueue`*
This method spawns new task, this is an __internal__ method

> ```self.spawnTask = function(data) { ...``` [power-queue.js:408](power-queue.js#L408)

-

#### <a name="PowerQueue.runTask"></a>*powerqueue*.runTask(invocation)&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method is private*
*This method __runTask__ is defined in `PowerQueue`*

__Arguments__

* __invocation__ *{object}*  
The object stored in the micro-queue

-

> ```self.runTask = function(invocation) { ...``` [power-queue.js:420](power-queue.js#L420)

-

#### <a name="PowerQueue.queueTaskHandler"></a>*powerqueue*.queueTaskHandler()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __queueTaskHandler__ is defined in `PowerQueue`*
This method handles tasks that are sub queues

> ```self.queueTaskHandler = function(subQueue, next, failures) { ...``` [power-queue.js:484](power-queue.js#L484)

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

> ```self.taskHandler = function(data, next, failures) { ...``` [power-queue.js:529](power-queue.js#L529)

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

> ```self.errorHandler = function(data, addTask, failures) { ...``` [power-queue.js:561](power-queue.js#L561)

-

#### <a name="PowerQueue.pause"></a>*powerqueue*.pause()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __pause__ is defined in `PowerQueue`*
__TODO__
```
* We should have it pause all processing tasks
```

> ```self.pause = function() { ...``` [power-queue.js:571](power-queue.js#L571)

-

#### <a name="PowerQueue.resume"></a>*powerqueue*.resume()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __resume__ is defined in `PowerQueue`*
__TODO__
```
* We should have it resume all processing tasks
```
> This will not start a stopped queue

> ```self.resume = function() { ...``` [power-queue.js:590](power-queue.js#L590)

-

#### <a name="PowerQueue.run"></a>*powerqueue*.run()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __run__ is defined in `PowerQueue`*
> Using this command will resume a paused queue and will
> start a stopped queue.

> ```self.run = function() { ...``` [power-queue.js:601](power-queue.js#L601)

-

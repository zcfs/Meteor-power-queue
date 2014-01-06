> File: ["micro-queue.js"](micro-queue.js)
> Where: {client|server}

-

#### <a name="MicroQueue"></a>new MicroQueue([lifo])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
```
A basic lifo or fifo queue
This is better than a simple array with pop/shift because shift is O(n)
and can become slow with a large array.
```
-

__Arguments__

* __lifo__ *{boolean}*    (Optional = false)
Set true for `lifo`, default is `fifo`

-
This queue was build as the spinal basis for the [`PowerQueue`](#PowerQueue)
The interface is very basic and consists of:
`add`, `get`, `reset` Making it possible to write a custom micro-queue for
the `PowerQueue` eg.: a queue that is persisted into a database etc.
Usage:
```js
var foo = new MicroQueue(); // Basic fifo queue
foo.add(1);
foo.add(2);
foo.add(3);
for (var i = 0; i < foo.length(); i++) {
  console.log(foo.get());
}
```
The result should be: "1, 2, 3"

> ```MicroQueue = function(lifo) { ...``` [micro-queue.js:24](micro-queue.js#L24)

-

#### <a name="MicroQueue.length"></a>*microqueue*.length()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __length__ is defined in `MicroQueue`*

__Returns__  *{number}*  __(is reactive)__
Length / number of items in queue

> ```self.length = _length.get;``` [micro-queue.js:34](micro-queue.js#L34)

-

#### <a name="MicroQueue.add"></a>*microqueue*.add(value)&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __add__ is defined in `MicroQueue`*

__Arguments__

* __value__ *{any}*  
The item to add to the queue

-

> ```self.add = function(value) { ...``` [micro-queue.js:39](micro-queue.js#L39)

-

#### <a name="MicroQueue.get"></a>*microqueue*.get()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __get__ is defined in `MicroQueue`*

__Returns__  *{any}*
The item that was next in line

> ```self.get = function() { ...``` [micro-queue.js:47](micro-queue.js#L47)

-

#### <a name="MicroQueue.reset"></a>*microqueue*.reset()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __reset__ is defined in `MicroQueue`*
This method will empty all data in the queue.

> ```self.reset = function() { ...``` [micro-queue.js:67](micro-queue.js#L67)

-


---
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

-

> ```PowerQueue = function(options) { ...``` [power-queue.js:14](power-queue.js#L14)

-

#### <a name="PowerQueue.onEnded"></a>*powerqueue*.onEnded&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __onEnded__ is defined in `PowerQueue`*
Is called when queue is ended

> ```self.onEnded = options && options.onEnded || function() { ...``` [power-queue.js:59](power-queue.js#L59)

-

#### <a name="PowerQueue.onAutostart"></a>*powerqueue*.onAutostart&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This callback __onAutostart__ is defined in `PowerQueue`*
Is called when queue is auto started

> ```self.onAutostart = options && options.onAutostart || function() { ...``` [power-queue.js:64](power-queue.js#L64)

-

#### <a name="PowerQueue.length"></a>*powerqueue*.length()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __length__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
Number of tasks left in queue to be processed

> ```self.length = invocations.length;``` [power-queue.js:70](power-queue.js#L70)

-

#### <a name="PowerQueue.progress"></a>*powerqueue*.progress()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __progress__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
0 .. 100 % Indicates the status of the queue

> ```self.progress = function() { ...``` [power-queue.js:76](power-queue.js#L76)

-

#### <a name="PowerQueue.usage"></a>*powerqueue*.usage()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __usage__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
0 .. 100 % Indicates ressource usage of the queue

> ```self.usage = function() { ...``` [power-queue.js:88](power-queue.js#L88)

-

#### <a name="PowerQueue.total"></a>*powerqueue*.total()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __total__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
The total number of tasks added to this queue

> ```self.total = _maxLength.get;``` [power-queue.js:96](power-queue.js#L96)

-

#### <a name="PowerQueue.isPaused"></a>*powerqueue*.isPaused()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __isPaused__ is defined in `PowerQueue`*

__Returns__  *{boolean}*  __(is reactive)__
Status of the paused state of the queue

> ```self.isPaused = _paused.get;``` [power-queue.js:102](power-queue.js#L102)

-

#### <a name="PowerQueue.processing"></a>*powerqueue*.processing()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __processing__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
Number of tasks currently being processed

> ```self.processing = _isProcessing.get;``` [power-queue.js:108](power-queue.js#L108)

-

#### <a name="PowerQueue.processList"></a>*powerqueue*.processList()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __processList__ is defined in `PowerQueue`*

__Returns__  *{array}*  __(is reactive)__
List of tasks currently being processed

> ```self.processingList = function() { ...``` [power-queue.js:114](power-queue.js#L114)

-

#### <a name="PowerQueue.errors"></a>*powerqueue*.errors()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __errors__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
The total number of errors
Errors are triggered when [maxFailures](PowerQueue.maxFailures) are exeeded

> ```self.errors = _errors.get;``` [power-queue.js:123](power-queue.js#L123)

-

#### <a name="PowerQueue.failures"></a>*powerqueue*.failures()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __failures__ is defined in `PowerQueue`*

__Returns__  *{number}*  __(is reactive)__
The total number of failed tasks

> ```self.failures = _failures.get;``` [power-queue.js:129](power-queue.js#L129)

-

#### <a name="PowerQueue.isRunning"></a>*powerqueue*.isRunning()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __isRunning__ is defined in `PowerQueue`*

__Returns__  *{boolean}*  __(is reactive)__
True if the queue is running
> NOTE: The task can be paused but marked as running

> ```self.isRunning = _running.get;``` [power-queue.js:136](power-queue.js#L136)

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

> ```self.maxProcessing = _maxProcessing.getset;``` [power-queue.js:149](power-queue.js#L149)

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

> ```self.autostart = _autostart.getset;``` [power-queue.js:162](power-queue.js#L162)

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

> ```self.maxFailures = _maxFailures.getset;``` [power-queue.js:175](power-queue.js#L175)

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

> ```self.reset = function() { ...``` [power-queue.js:187](power-queue.js#L187)

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

> ```self.add = function(data, failures, id) { ...``` [power-queue.js:201](power-queue.js#L201)

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

> ```self.next = function(err) { ...``` [power-queue.js:222](power-queue.js#L222)

-

#### <a name="PowerQueue.runTask"></a>*powerqueue*.runTask(invocation)&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method is private*
*This method __runTask__ is defined in `PowerQueue`*

__Arguments__

* __invocation__ *{object}*  
The object stored in the micro-queue

-

> ```self.runTask = function(invocation) { ...``` [power-queue.js:258](power-queue.js#L258)

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

> ```self.taskHandler = function(data, next, failures) { ...``` [power-queue.js:310](power-queue.js#L310)

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

> ```self.errorHandler = function(data, addTask, failures) { ...``` [power-queue.js:342](power-queue.js#L342)

-

#### <a name="PowerQueue.resume"></a>*powerqueue*.resume()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __resume__ is defined in `PowerQueue`*
> This will not start a stopped queue

> ```self.resume = function() { ...``` [power-queue.js:358](power-queue.js#L358)

-

#### <a name="PowerQueue.run"></a>*powerqueue*.run()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ####
-
*This method __run__ is defined in `PowerQueue`*
> Using this command will resume a paused queue and will
> start a stopped queue.

> ```self.run = function() { ...``` [power-queue.js:367](power-queue.js#L367)

-

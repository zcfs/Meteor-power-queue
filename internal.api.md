> File: ["reactive-property.js"](reactive-property.js)
> Where: {client|server}
-
#Reactive Property
Client-side reactive version
Testing internal docs...

## <a name="reactiveProperty"></a>new reactiveProperty(defaultValue)&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Arguments__

* __defaultValue__ *{any}*  
Set the default value for the reactive property

-
This api should only be in the internal.api.md

> ```reactiveProperty = function(defaultValue) { ...``` [reactive-property.js:13](reactive-property.js#L13)

## <a name="reactiveProperty.value"></a>reactiveProperty.value {any}&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
This contains the non reactive value, should only be used as a getter for
internal use

> ```self.value = defaultValue;``` [reactive-property.js:21](reactive-property.js#L21)

## <a name="reactiveProperty.get"></a>reactiveProperty.get()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
Usage:
```js
 var foo = new reactiveProperty('bar');
 foo.get(); // equals "bar"
```

> ```self.get = function() { ...``` [reactive-property.js:31](reactive-property.js#L31)


---
> File: ["micro-queue.js"](micro-queue.js)
> Where: {client|server}
-

## <a name="microQueue"></a>new microQueue([lifo])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
A basic lifo or fifo queue
This is better than a simple array with pop/shift because shift is O(n)
and can become slow with a large array.

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
var foo = new microQueue(); // Basic fifo queue
foo.add(1);
foo.add(2);
foo.add(3);
for (var i = 0; i < foo.length(); i++) {
  console.log(foo.get());
}
```
The result should be: "1, 2, 3"

> ```microQueue = function(lifo) { ...``` [micro-queue.js:24](micro-queue.js#L24)

## <a name="microQueue.length"></a>microQueue.length()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{number}*  __(is reactive)__
Length / number of items in queue

> ```self.length = _length.get;``` [micro-queue.js:34](micro-queue.js#L34)

## <a name="microQueue.add"></a>microQueue.add(value)&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Arguments__

* __value__ *{any}*  
The item to add to the queue

-

> ```self.add = function(value) { ...``` [micro-queue.js:39](micro-queue.js#L39)

## <a name="microQueue.get"></a>microQueue.get()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{any}*
The item that was next in line

> ```self.get = function() { ...``` [micro-queue.js:47](micro-queue.js#L47)

## <a name="microQueue.reset"></a>microQueue.reset()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
This method will empty all data in the queue.

> ```self.reset = function() { ...``` [micro-queue.js:67](micro-queue.js#L67)


---
> File: ["power-queue.js"](power-queue.js)
> Where: {client|server}
-

## <a name="PowerQueue"></a>new PowerQueue([options])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
Creates an instance of a power queue 
[Check out demo](http://power-queue-test.meteor.com/)

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

## <a name="PowerQueue.onEnded"></a>PowerQueue.onEnded&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
Is called when queue is ended

> ```self.onEnded = options && options.onEnded || function() { ...``` [power-queue.js:56](power-queue.js#L56)

## <a name="PowerQueue.onAutostart"></a>PowerQueue.onAutostart&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
Is called when queue is auto started

> ```self.onAutostart = options && options.onAutostart || function() { ...``` [power-queue.js:61](power-queue.js#L61)

## <a name="PowerQueue.length"></a>PowerQueue.length()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{number}*  __(is reactive)__
Number of tasks left in queue to be processed

> ```self.length = invocations.length;``` [power-queue.js:67](power-queue.js#L67)

## <a name="PowerQueue.progress"></a>PowerQueue.progress()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{number}*  __(is reactive)__
0 .. 100 % Indicates the status of the queue

> ```self.progress = function() { ...``` [power-queue.js:73](power-queue.js#L73)

## <a name="PowerQueue.usage"></a>PowerQueue.usage()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{number}*  __(is reactive)__
0 .. 100 % Indicates ressource usage of the queue

> ```self.usage = function() { ...``` [power-queue.js:85](power-queue.js#L85)

## <a name="PowerQueue.total"></a>PowerQueue.total()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{number}*  __(is reactive)__
The total number of tasks added to this queue

> ```self.total = _maxLength.get;``` [power-queue.js:93](power-queue.js#L93)

## <a name="PowerQueue.isPaused"></a>PowerQueue.isPaused()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{boolean}*  __(is reactive)__
Status of the paused state of the queue

> ```self.isPaused = _paused.get;``` [power-queue.js:99](power-queue.js#L99)

## <a name="PowerQueue.processing"></a>PowerQueue.processing()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{number}*  __(is reactive)__
Number of tasks currently being processed

> ```self.processing = _isProcessing.get;``` [power-queue.js:105](power-queue.js#L105)

## <a name="PowerQueue.errors"></a>PowerQueue.errors()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{number}*  __(is reactive)__
The total number of errors
Errors are triggered when [maxFailures](PowerQueue.maxFailures) are exeeded

> ```self.errors = _errors.get;``` [power-queue.js:112](power-queue.js#L112)

## <a name="PowerQueue.failures"></a>PowerQueue.failures()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{number}*  __(is reactive)__
The total number of failed tasks

> ```self.failures = _failures.get;``` [power-queue.js:118](power-queue.js#L118)

## <a name="PowerQueue.isRunning"></a>PowerQueue.isRunning()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{boolean}*  __(is reactive)__
True if the queue is running
> NOTE: The task can be paused but marked as running

> ```self.isRunning = _running.get;``` [power-queue.js:125](power-queue.js#L125)

## <a name="PowerQueue.maxProcessing"></a>PowerQueue.maxProcessing([max])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

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

> ```self.maxProcessing = _maxProcessing.getset;``` [power-queue.js:138](power-queue.js#L138)

## <a name="PowerQueue.autostart"></a>PowerQueue.autostart([autorun])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

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

> ```self.autostart = _autostart.getset;``` [power-queue.js:151](power-queue.js#L151)

## <a name="PowerQueue.maxFailures"></a>PowerQueue.maxFailures([max])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

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

> ```self.maxFailures = _maxFailures.getset;``` [power-queue.js:164](power-queue.js#L164)

## <a name="PowerQueue.reset"></a>PowerQueue.reset()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
Calling this will:
stop the queue
paused to false
Discart all queue data
> NOTE: At the moment if the queue has processing tasks they can change
> the `errors` and `failures` counters. This could change in the future or
> be prevented by creating a whole new instance of the `PowerQueue`

> ```self.reset = function() { ...``` [power-queue.js:175](power-queue.js#L175)

## <a name="PowerQueue.add"></a>PowerQueue.add(data, [failures])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Arguments__

* __data__ *{any}*  
The task to be handled
* __failures__ *{number}*    (Optional)
Internally used to Pass on number of failures.

-

> ```self.add = function(data, failures) { ...``` [power-queue.js:189](power-queue.js#L189)

## <a name="PowerQueue.next"></a>PowerQueue.next([err])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Arguments__

* __err__ *{string}*    (Optional)
Error message if task failed

-
> * Can pass in `null` to start the queue
> * Passing in a string to `next` will trigger a failure
> * Passing nothing will simply let the next task run
`next` is handed into the [taskHandler](PowerQueue.taskHandler) as a
callback to mark an error or end of current task

> ```self.next = function(err) { ...``` [power-queue.js:210](power-queue.js#L210)

## <a name="PowerQueue.runTask"></a>PowerQueue.runTask(invocation)&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
*This method is private*

__Arguments__

* __invocation__ *{object}*  
The object stored in the micro-queue

-

> ```self.runTask = function(invocation) { ...``` [power-queue.js:246](power-queue.js#L246)

-
If the task handler throws an error then add it to the queue again
we allow this for a max of _maxFailures

## <a name="PowerQueue.taskHandler"></a>PowerQueue.taskHandler&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

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
```

> ```self.taskHandler = function(data, next, failures) { ...``` [power-queue.js:298](power-queue.js#L298)

## <a name="PowerQueue.errorHandler"></a>PowerQueue.errorHandler&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

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
  *     // This could be overwritten the data contains the task data and addTask
  *     // is a helper for adding the task to the queue
  *     // try again: addTask(data);
  *     // console.log('Terminate at ' + failures + ' failures');
  *   };
```

> ```self.errorHandler = function(data, addTask, failures) { ...``` [power-queue.js:330](power-queue.js#L330)

-
This could be overwritten the data contains the task data and addTask
is a helper for adding the task to the queue
try again: addTask(data);

## <a name="PowerQueue.pause"></a>PowerQueue.pause()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

> ```self.pause = function() { ...``` [power-queue.js:339](power-queue.js#L339)

## <a name="PowerQueue.resume"></a>PowerQueue.resume()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
> This will not start a stopped queue

> ```self.resume = function() { ...``` [power-queue.js:346](power-queue.js#L346)

## <a name="PowerQueue.run"></a>PowerQueue.run()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
> Using this command will resume a paused queue and will
> start a stopped queue.

> ```self.run = function() { ...``` [power-queue.js:355](power-queue.js#L355)

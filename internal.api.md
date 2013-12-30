#Reactive Property
Client-side reactive version
Testing internal docs...

## <a name="reactiveProperty"></a>new reactiveProperty(defaultValue)&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

<u><b>Arguments</b></u>

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

## <a name="microQueue"></a>new microQueue([lifo=false])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
A basic lifo or fifo queue
This is better than a simple array with pop/shift because shift is O(n)
and can become slow with a large array.

<u><b>Arguments</b></u>

* __lifo__ *{boolean}*
  Set true for `lifo`, default is `fifo`

-
This queue was build as the spinal basis for the [`PowerQueue`](#PowerQueue)
The interface is very basic and consists of:
`add`, `get`, `reset` Making it possible to write a custom micro-queue for
the `PowerQueue` eg.: a queue that is persisted into a database etc.

> ```microQueue = function(lifo) { ...``` [micro-queue.js:12](micro-queue.js#L12)

## <a name="_length"></a>_length {reactiveProperty} &nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
*This property is private*

> ```var _length = new reactiveProperty(0);``` [micro-queue.js:15](micro-queue.js#L15)

## <a name="microQueue.length"></a>microQueue.length()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

> ```self.length = _length.get;``` [micro-queue.js:21](micro-queue.js#L21)

## <a name="microQueue.add"></a>microQueue.add(value)&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

<u><b>Arguments</b></u>

* __value__ *{any}*
  The value to add to the queue

-

> ```self.add = function(value) { ...``` [micro-queue.js:26](micro-queue.js#L26)

## <a name="microQueue.get"></a>microQueue.get()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{any}*
The value that was next in line

> ```self.get = function() { ...``` [micro-queue.js:34](micro-queue.js#L34)

## <a name="microQueue.reset"></a>microQueue.reset()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
This method will empty all data in the queue.

> ```self.reset = function() { ...``` [micro-queue.js:54](micro-queue.js#L54)


---
#PowerQueue
This package contains a small api
Does `markdown` __work__ here?
* Okay
* Yep

## <a name="PowerQueue"></a>new PowerQueue([options])&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
Creates an instance of a power queue 
[Check out demo](http://power-queue-test.meteor.com/)

<u><b>Arguments</b></u>

* __options__ *{object}*
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
    - __text__ *{ number | string }*    (Default = ' ')
Hmm, comment

-
After text

> ```PowerQueue = function(options) { ...``` [power-queue.js:22](power-queue.js#L22)

## <a name="PowerQueue.onEnded"></a>PowerQueue.onEnded&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
Is called when queue is ended

> ```self.onEnded = options && options.onEnded || function() { ...``` [power-queue.js:64](power-queue.js#L64)

## <a name="PowerQueue.onAutostart"></a>PowerQueue.onAutostart&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##
Is called when queue is auto started

> ```self.onAutostart = options && options.onAutostart || function() { ...``` [power-queue.js:69](power-queue.js#L69)

## <a name="PowerQueue.length"></a>PowerQueue.length()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{number}*  <u>is reactive</u>
Number of tasks left in queue to be processed

> ```self.length = invocations.length;``` [power-queue.js:75](power-queue.js#L75)

## <a name="PowerQueue.progress"></a>PowerQueue.progress()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{number}*
0 .. 100 % Indicates the status of the queue

> ```self.progress = function() { ...``` [power-queue.js:80](power-queue.js#L80)

## <a name="PowerQueue.usage"></a>PowerQueue.usage()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{number}*
0 .. 100 % Indicates ressource usage of the queue

> ```self.usage = function() { ...``` [power-queue.js:91](power-queue.js#L91)

## <a name="PowerQueue.total"></a>PowerQueue.total()&nbsp;&nbsp;<sub><i>Anywhere</i></sub> ##

__Returns__  *{number}*
The total number of tasks added to this queue

> ```self.total = _maxLength.get;``` [power-queue.js:98](power-queue.js#L98)

-
If the task handler throws an error then add it to the queue again
we allow this for a max of _maxFailures

-
This could be overwritten the data contains the task data and addTask
is a helper for adding the task to the queue
try again: addTask(data);

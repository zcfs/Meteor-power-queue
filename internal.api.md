#Reactive Property
Client-side reactive version
Testing internal docs...

##new reactiveProperty(defaultValue)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub><i>Anywhere</i></sub>

<u><b>Arguments</b></u>

* __defaultValue__ *{any}*
  
Set the default value for the reactive property

-
This api should only be in the internal.api.md

> ```reactiveProperty = function(defaultValue) { ...``` [reactive-property.js:13](reactive-property.js#L13)

##reactiveProperty.value&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub><i>Anywhere</i></sub>
This contains the non reactive value, should only be used as a getter for
internal use

> ```self.value = defaultValue;``` [reactive-property.js:21](reactive-property.js#L21)

##reactiveProperty.get()&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub><i>Anywhere</i></sub>
Usage:
```js
 var foo = new reactiveProperty('bar');
 foo.get(); // equals "bar"
```

> ```self.get = function() { ...``` [reactive-property.js:31](reactive-property.js#L31)


---
#PowerQueue
This package contains a small api
Does `markdown` __work__ here?
* Okay
* Yep

##new PowerQueue([options])&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub><i>Anywhere</i></sub>
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

##PowerQueue.onEnded&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub><i>Anywhere</i></sub>
Is called when queue is ended

> ```self.onEnded = options && options.onEnded || function() { ...``` [power-queue.js:64](power-queue.js#L64)

##PowerQueue.onAutostart&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub><i>Anywhere</i></sub>
Is called when queue is auto started

> ```self.onAutostart = options && options.onAutostart || function() { ...``` [power-queue.js:69](power-queue.js#L69)

##PowerQueue.length()&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub><i>Anywhere</i></sub>

__Returns__  *{number}*  <u>is reactive</u>
Number of tasks left in queue to be processed

> ```self.length = invocations.length;``` [power-queue.js:75](power-queue.js#L75)

##PowerQueue.progress()&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub><i>Anywhere</i></sub>

__Returns__  *{number}*
0 .. 100 % Indicates the status of the queue

> ```self.progress = function() { ...``` [power-queue.js:80](power-queue.js#L80)

##PowerQueue.usage()&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub><i>Anywhere</i></sub>

__Returns__  *{number}*
0 .. 100 % Indicates ressource usage of the queue

> ```self.usage = function() { ...``` [power-queue.js:91](power-queue.js#L91)

##PowerQueue.total()&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub><i>Anywhere</i></sub>

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

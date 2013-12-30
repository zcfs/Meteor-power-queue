#PowerQueue
This package contains a small api
Does `markdown` __work__ here?
* Okay
* Yep

##new PowerQueue(options)    *Anywhere*
Creates an instance of a power queue 
[Check out demo](http://power-queue-test.meteor.com/)

__Arguments__

* __options__  (Optional)  *{object}*
Settings
  * __filo__  (Default = false)  *{boolean}*
Make it a first in last out queue
  * __isPaused__  (Default = false)  *{boolean}*
Set queue paused
  * __autostart__  (Default = true)  *{boolean}*
May adding a task start the queue
  * __name__  (Default = "Queue")  *{string}*
Name of the queue
  * __maxProcessing__  (Default = 1)  *{number}*
Limit of simultanous running tasks
  * __maxFailures__  (Default = 5)  *{number}*
Limit retries of failed tasks
  * __text__  (Default = ' ')  *{ number | string }*
Hmm, comment
After text

> PowerQueue = function(options) { ...
> [Source: power-queue.js:22](power-queue.js#L22)

##PowerQueue.onEnded    *Anywhere*
Is called when queue is ended

> self.onEnded = options && options.onEnded || function() { ...
> [Source: power-queue.js:64](power-queue.js#L64)

##PowerQueue.onAutostart    *Anywhere*
Is called when queue is auto started

> self.onAutostart = options && options.onAutostart || function() { ...
> [Source: power-queue.js:69](power-queue.js#L69)

##PowerQueue.length()    *Anywhere*

__Returns__  *{number}*  *(is reactive)*

Number of tasks left in queue to be processed

> self.length = invocations.length;
> [Source: power-queue.js:75](power-queue.js#L75)

##PowerQueue.progress()    *Anywhere*

__Returns__  *{number}*

0 .. 100 % Indicates the status of the queue

> self.progress = function() { ...
> [Source: power-queue.js:80](power-queue.js#L80)

##PowerQueue.usage()    *Anywhere*

__Returns__  *{number}*

0 .. 100 % Indicates ressource usage of the queue

> self.usage = function() { ...
> [Source: power-queue.js:91](power-queue.js#L91)

##PowerQueue.total()    *Anywhere*

__Returns__  *{number}*

The total number of tasks added to this queue

> self.total = _maxLength.get;
> [Source: power-queue.js:98](power-queue.js#L98)

---
If the task handler throws an error then add it to the queue again
we allow this for a max of _maxFailures

---
This could be overwritten the data contains the task data and addTask
is a helper for adding the task to the queue
try again: addTask(data);

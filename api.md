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
[Source: api.md:22](api.mdL22)
```prettyprint js linenumber 22
PowerQueue = function(options) {
```
After text

##PowerQueue.onEnded    *Anywhere*
[Source: api.md:64](api.mdL64)
```prettyprint js linenumber 64
self.onEnded = options && options.onEnded || function() { console.log(title + 
```
Is called when queue is ended

##PowerQueue.onAutostart    *Anywhere*
[Source: api.md:69](api.mdL69)
```prettyprint js linenumber 69
self.onAutostart = options && options.onAutostart || function() { console.log(title + 
```
Is called when queue is auto started

##PowerQueue.length()    *Anywhere*

__Returns__  *{number}*  *(is reactive)*

Number of tasks left in queue to be processed
[Source: api.md:75](api.mdL75)
```prettyprint js linenumber 75
self.length = invocations.length;
```

##PowerQueue.progress()    *Anywhere*

__Returns__  *{number}*

0 .. 100 % Indicates the status of the queue
[Source: api.md:80](api.mdL80)
```prettyprint js linenumber 80
self.progress = function() {
```

##PowerQueue.usage()    *Anywhere*

__Returns__  *{number}*

0 .. 100 % Indicates ressource usage of the queue
[Source: api.md:91](api.mdL91)
```prettyprint js linenumber 91
self.usage = function() {
```

##PowerQueue.total()    *Anywhere*

__Returns__  *{number}*

The total number of tasks added to this queue
[Source: api.md:98](api.mdL98)
```prettyprint js linenumber 98
self.total = _maxLength.get;
```

---
If the task handler throws an error then add it to the queue again
we allow this for a max of _maxFailures

---
This could be overwritten the data contains the task data and addTask
is a helper for adding the task to the queue
try again: addTask(data);

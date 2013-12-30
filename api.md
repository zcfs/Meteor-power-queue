#PowerQueue
This package contains a small api
Does `markdown` __work__ here?
* Okay
* Yep
---

---
###new PowerQueue(options)    *Anywhere*
Creates an instance of a power queue 
[Check out demo](http://power-queue-test.meteor.com/)

__Arguments__

* __options__  (Optional)  *{object}*
Settings
  * __filo__  (Optional = false)  *{boolean}*
Make it a first in last out queue
  * __isPaused__  (Optional = false)  *{boolean}*
Set queue paused
  * __autostart__  (Optional = true)  *{boolean}*
May adding a task start the queue
  * __name__  (Optional = "Queue")  *{string}*
Name of the queue
  * __maxProcessing__  (Optional = 1)  *{number}*
Limit of simultanous running tasks
  * __maxFailures__  (Optional = 5)  *{number}*
Limit retries of failed tasks
  * __text__  (Optional = ' ')  *{ number | string }*
Hmm, comment

---
After text

---
###powerqueue.onEnded    *Anywhere*
Is called when queue is ended

---
###powerqueue.onAutostart    *Anywhere*
Is called when queue is auto started

---
###PowerQueue.length()    *Anywhere*

__Returns__  *{number}*  *(is reactive)*
Number of tasks left in queue to be processed

---

---
###PowerQueue.progress()    *Anywhere*

__Returns__  *{number}*
0 .. 100 % Indicates the status of the queue

---

---
###PowerQueue.usage()    *Anywhere*

__Returns__  *{number}*
0 .. 100 % Indicates ressource usage of the queue

---

---
###PowerQueue.total()    *Anywhere*

__Returns__  *{number}*
The total number of tasks added to this queue

---
If the task handler throws an error then add it to the queue again
we allow this for a max of _maxFailures
---
This could be overwritten the data contains the task data and addTask
is a helper for adding the task to the queue
try again: addTask(data);
---
